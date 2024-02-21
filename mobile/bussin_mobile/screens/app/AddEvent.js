import { View, Text, SafeAreaView, TextInput, ScrollView, Button, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import tw from 'twrnc'

import LargeButtonArrow from '../components/LargeButtonArrow'
import { useSession } from './SessionContext'
import NavBar from '../components/NavBar'
import InputField, { InputFieldDate } from '../components/InputField'
import { showAlert } from '../components/CustomAlert'
import axios from 'axios'
import { API_URL } from '../../utils/const'
import { MaterialIcons } from '@expo/vector-icons'
import { GREEN, RED } from '../../utils/colors'

const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

export default function AddEvent({navigation}){
    const {state} = useSession()
    const [forms, setForms] = useState({})
    const [isPrivate, setPrivate] = useState(false)
    const [button, setButton] = useState()

    const currentDate = new Date()
    const [date, setDate] = useState({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        hour: currentDate.getHours(),
        minutes: currentDate.getMinutes()
    })

    const ruleForButton = () => {
        if(Object.keys(forms).length == 3){
            setButton(true)
        }
    }
    const locationHandle = (text) =>{
        setForms({...forms,
            localization: {
                city: text
            }})
        ruleForButton()
    }  
    const titleHandle = (text) => {
        setForms({...forms,name: text})
        ruleForButton()
    }
    const descriptionHansle = (text) => {
        setForms({...forms,description: text})
        ruleForButton()
    }
    const handleButton = async () => {
        const response = await geocoder.search( { q: forms.localization.city } )
        const targetDate = new Date(date.year, date.month - 1, date.day, date.hour, date.minutes)
        console.log(" TG -> " + targetDate)
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
            showAlert("Wrong address", "Name of city is unreachable in database")
        } else {
            const POSTdata = {
                ...forms,
                endDate: targetDate.toISOString(),
                localization: {
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
            showAlert("Evet created!", 
            "Title: " + POSTdata.title + 
            "\nAt time: " + date.year + " " + date.month + " " + date.day + " - " + date.hour + ":" + date.minutes,
            "OK", () => {navigation.goBack()})
            console.log("Raw date -> ", date)
            console.log("ID -> ", state.user.id)
            console.log("POST DATA ->", POSTdata)
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            axios.post(`${API_URL}/event?accountId=${state.user.id}`, POSTdata, {headers})
            .then((res) => {
                console.log("Event created!")
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
    return(
        <SafeAreaView style={tw`flex-1`}>
            <SafeAreaView style={tw`flex-col h-full`}>
                <View style={tw`flex-5 items-center mt-8`} >
                    <ScrollView style={tw`w-100%`} >
                        <Text style={tw`p-5 text-7`} >Create Event</Text>
                        <View style={tw`w-100% mt-3 items-center`} >
                            <View style={tw`w-100%`} >
                                <InputField placeholder={"Title"} onChangeHandle={titleHandle} />
                            </View>
                            <View style={tw`flex-row w-100% mt-3 ml-3 items-center justify-center`} >
                                <InputFieldDate placeholder={"YYYY"} onChangeHandle={yearHandle} />
                                <View style={tw`w-30%`} >
                                    <InputFieldDate placeholder={"MM"} onChangeHandle={monthHandle}/>
                                </View>
                                <View style={tw`w-30%`} >
                                    <InputFieldDate placeholder={"DD"} onChangeHandle={dayHandle}/>
                                </View>
                            </View>
                            <View style={tw`flex-row w-100% mt-3 ml-3 items-center justify-center `} >
                                <View style={tw`w-30%`} >
                                    <InputFieldDate placeholder={"HH"} onChangeHandle={hourHandle}/>
                                </View>
                                <Text style={tw`text-8`} >:</Text>
                                <View style={tw`w-30%`} >
                                    <InputFieldDate placeholder={"MIN"} onChangeHandle={minuteHandle}/>
                                </View>
                            </View>
                            <TextInput 
                            multiline style={tw`p-5 w-90% mt-4 text-xl rounded-xl shadow-md bg-white`} 
                            placeholder='City Address Place' 
                            onChangeText={(text) => locationHandle(text)}/>
                            <TextInput 
                            multiline style={tw`p-5 w-90% mt-4 text-xl rounded-xl shadow-md bg-white`} 
                            placeholder='Description' 
                            onChangeText={(text) => descriptionHansle(text)}/>
                            <View style={tw`mt-5 w-100%`} >
                                <PrivateParty isPrivate={isPrivate} setPrivate={setPrivate} />
                            </View>
                            <View style={tw`mt-5 w-100%`} >
                                <LargeButtonArrow text={"Post Event"} nav={handleButton} active={button}/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            <NavBar navigation={navigation}/>
            </SafeAreaView>
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