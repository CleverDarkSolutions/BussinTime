import { View, Text, SafeAreaView, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import tw from 'twrnc'

import LargeButtonArrow from '../components/LargeButtonArrow'
import { useSession } from './SessionContext'
import NavBar from '../components/NavBar'
import InputField, { InputFieldDate } from '../components/InputField'
import { showAlert } from '../components/CustomAlert'
import axios from 'axios'
import { API_URL } from '../../utils/const'
import LoadingComponent from '../components/LoadingComponent'
import LargeButtonCustom from '../components/LargeButtonCustom'
import { showConfirmation } from '../components/CustomConfirmation'
import { MaterialIcons } from '@expo/vector-icons'
import { GREEN, RED } from '../../utils/colors'

const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

export default function EditEvent({route, navigation}){
    const {state} = useSession()
    const [forms, setForms] = useState({})
    const [loading, setLoading] = useState(true)
    const [eventDate, setEventDate] = useState()
    const [date, setDate] = useState()
    const [mock, setMock] = useState()
    const [isPrivate, setPrivate] = useState(false)

    const currentDate = new Date()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const headers = {
                    'Authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/json',
                }
                const result = await axios.get(`${API_URL}/event/${route.params.id}`, {headers})
                setForms(result.data)
                setMock(result.data)
                setPrivate(result.data.eventVisibility==="PRIVATE")
                setDate({
                    year: new Date(result.data.endDate).getFullYear(),
                    day: new Date(result.data.endDate).getDay(),
                    month: new Date(result.data.endDate).getMonth(),
                    hour: new Date(result.data.endDate).getHours(),
                    minutes: new Date(result.data.endDate).getMinutes(),
                })
                setEventDate(new Date(result.data.endDate))
            } catch(error){
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    },[])


    const locationHandle = (text) =>{
        setForms({...forms,
            localization: {
                city: text
            }})
    }  
    const titleHandle = (text) => {
        setForms({...forms,name: text})
    }
    const descriptionHansle = (text) => {
        setForms({...forms,description: text})
    }
    const handleButton = async () => {
        const response = await geocoder.search( { q: forms.localization.city } )
        console.log("DATEEE ", date)
        const targetDate = new Date(date.year, date.month - 1, date.day, date.hour, date.minutes, 0);
        console.log("Target -> ", targetDate)
        console.log("forms -> ",forms)
        if(
            date.year > 2050 || 
            date.month < 1 || date.month > 12 ||
            date.day < 1 || date.day > 31 ||
            date.hour < 0 || date.hour > 24 ||
            date.minutes < 0 || date.minutes > 60
        ){
            showAlert("Wrong date!", "Provide correct date format!")
        } else if(targetDate <= currentDate){
            showAlert("Wrong date!", "Provide future date!")
        } else if (response.length === 0){
            showAlert("Wrong city", "Name of city is unreachable in database")
        } else {
            const POSTdata = {
                ...forms,
                endDate: targetDate.toISOString(),
                localization: {
                    id: 3,
                    city: response[0].name,
                    latitude: Number(response[0].lat),
                    longitude: Number(response[0].lon),
                    postalCode: "00-000",
                    address: "string"
                },
                startDate: currentDate.toISOString(),
                photoPath: "janusz",
                isActive: true,
                eventVisibility: isPrivate ? "PRIVATE" : "PUBLIC"
            }
            showAlert("Evet updated!")
            console.log("POST DATA after button ->", POSTdata)
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            axios.put(`${API_URL}/event/${route.params.id}`, POSTdata, {headers})
            .then((res) => {
                navigation.navigate('EventDetails', {id: route.params.id})
            })
            .catch((error) => {
                console.log("Error od zmuły: ", error.response.data)
                console.log("Error: ", error)
                showAlert("Server error", "It appears are some issue with server or network.\nPlease try another time!")
            })
        }
    }
    const yearHandle    = (text) => {setDate({...date, year: Number(text)})}
    const monthHandle   = (text) => {setDate({...date, month: Number(text)})}
    const dayHandle     = (text) => {setDate({...date, day: Number(text)})}
    const hourHandle    = (text) => {setDate({...date, hour: Number(text)})}
    const minuteHandle  = (text) => {setDate({...date, minutes: Number(text)})}

    const deleteHandleGuard = () => {
        showConfirmation(
            "Delete event?",
            "Do you really want to delete event?",
            "YES", handleDelete
        )
    }

    const handleDelete = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.delete(`${API_URL}/event/${route.params.id}`, {headers})
        .then((res) => {
            showAlert("Deleted!", "Your event has been deleted!", "OK", () => {navigation.goBack()})
        })
        .catch((error) => {
            console.error("Error fetching data: ", error)
            showAlert('Problem while delete', 'It appears to be a problem with deleting account.\nPlease contact Bussin Time devs')
        })
    }
    const handleGoTo = () => {navigation.navigate('EventDetails', {id: route.params.id})}
    return(
        <SafeAreaView style={tw`flex-1`}>
            {loading ? 
                <LoadingComponent/> : 
                <SafeAreaView style={tw`flex-col h-full`}>
                <View style={tw`flex-5 items-center mt-8`} >
                    <ScrollView style={tw`w-100%`} >
                        <Text style={tw`p-5 text-7`} >Edit Event</Text>
                        <View style={tw`w-100% mt-3 items-center`} >
                            <View style={tw`w-100%`} >
                                <InputField 
                                placeholder={mock.name} 
                                onChangeHandle={titleHandle} />
                            </View>
                            <View style={tw`flex-row w-100% mt-3 ml-3 items-center justify-center`} >
                                <InputFieldDate placeholder={eventDate.getFullYear().toString()} onChangeHandle={yearHandle} />
                                <View style={tw`w-30%`} >
                                    <InputFieldDate placeholder={(eventDate.getMonth() + 1).toString()} onChangeHandle={monthHandle}/>
                                </View>
                                <View style={tw`w-30%`} >
                                    <InputFieldDate placeholder={eventDate.getDay().toString()} onChangeHandle={dayHandle}/>
                                </View>
                            </View>
                            <View style={tw`flex-row w-100% mt-3 ml-3 items-center justify-center `} >
                                <View style={tw`w-30%`} >
                                    <InputFieldDate placeholder={eventDate.getHours().toString()} onChangeHandle={hourHandle}/>
                                </View>
                                <Text style={tw`text-8`} >:</Text>
                                <View style={tw`w-30%`} >
                                    <InputFieldDate placeholder={eventDate.getMinutes().toString()} onChangeHandle={minuteHandle}/>
                                </View>
                            </View>
                            <TextInput 
                            multiline style={tw`p-5 w-90% mt-4 text-xl rounded-xl shadow-md bg-white`} 
                            placeholder={mock.localization.city} 
                            onChangeText={(text) => locationHandle(text)}/>
                            <TextInput 
                            multiline style={tw`p-5 w-90% mt-4 text-xl rounded-xl shadow-md bg-white`} 
                            placeholder={mock.description} 
                            onChangeText={(text) => descriptionHansle(text)}/>
                            <View style={tw`mt-5 w-100%`} >
                                <PrivateParty isPrivate={isPrivate} setPrivate={setPrivate} />
                            </View>
                            <View style={tw`mt-5 w-100%`} >
                                <LargeButtonArrow text={"Update Event"} nav={handleButton} active={true}/>
                                <LargeButtonArrow text={"Go to event"} nav={handleGoTo} active={true}/>
                                <LargeButtonCustom text={"Delete"} active={true} nav={deleteHandleGuard} color={"red"}/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <NavBar navigation={navigation}/>
                </SafeAreaView>
            }
        </SafeAreaView>
    )
}

const PrivateParty = ({isPrivate, setPrivate}) => {
    return(
        <View style={tw`items-center justify-center`} >
            <TouchableOpacity 
            style={tw`flex-row w-85% h-16 py-3 mx-7 rounded-xl mt-2 mb-4 shadow-md ${isPrivate ? `bg-` + RED : `bg-` + GREEN} items-center justify-center`}
            onPress={() => setPrivate(!isPrivate)}
            >
                <Text style={tw`text-5 font-bold text-white mr-2`}>Visibility: {isPrivate ? "Private" : "Public"}</Text>
                <MaterialIcons name={isPrivate ? "visibility-off" : "visibility"} size={24} color="white" />
            </TouchableOpacity>
            {isPrivate ? 
                <Text>You will have to invite perticipants manually</Text> : 
                <View/>
            }
        </View>
    )
}