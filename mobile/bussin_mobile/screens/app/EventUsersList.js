import { View, Text, SafeAreaView, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import { useSession } from './SessionContext'

import tw from 'twrnc'

import axios from 'axios'
import { API_URL } from '../../utils/const'
import LoadingComponent from '../components/LoadingComponent'
import { useFocusEffect } from '@react-navigation/native';
import { showConfirmation } from '../components/CustomConfirmation';

export default function EventUsersList({route, navigation}){
    const {state} = useSession()
    const [data, setData] = useState([])
    const [loading, setLoadning] = useState()
    useFocusEffect(
        React.useCallback(() => {
            fetchData()
            return () => {}
        }, [])
    )
    const fetchData = async () => {
        try{
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            const result = await axios.get(`${API_URL}/event/getEventParticipants/${route.params.id}`, {headers})
            setData(result.data)
            console.log(result.data[0])
        } catch(error){
            console.log(error)
        } finally {
            setLoadning(false)
        }
    }
    useEffect(() => {
        fetchData()
    },[])
    return(
        <SafeAreaView style={tw`items-center`}>
            {loading ? 
            <LoadingComponent /> : 
            <ScrollView>      
                {data.map((value, key) => (
                    state.user.username == value.username ? <View key={key} /> :
                    <TileComponent
                    owner={route.params.owner}
                    user={value}
                    key={key}
                    eventId={route.params.id}
                    refresh={fetchData}
                    navigation={navigation} />
                ))}
            </ScrollView>
            }
        </SafeAreaView>
    )
}

const TileComponent = ({user, navigation, owner=false, eventId, refresh}) => {
    const {state} = useSession()
    const handleNavigate = () => {
        navigation.navigate('UserDetails', {id: user.id})
    }
    const handleParticipantGuard = () => {
        showConfirmation(
            "Delete Participant",
            "Do you really want to kick " + user.username + " from the event?",
            "YES", handleDeleteParticipant
        )
    }
    const handleDeleteParticipant = async () => {
        console.log("Event id: ", eventId)
        console.log("User id: ",user.id)
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.delete(`${API_URL}/event/removeFromEvent/${eventId}/${user.id}`, {headers})
        .then((res) => {
            console.log(res)
            refresh()
        })
        .catch((error) => {console.log(error)})
    }
    return(
        <View style={tw`flex-row items-center h-25`} >
            {owner ? 
                <TouchableOpacity style={tw`mt-4 justify-center items-center`} onPress={handleParticipantGuard} >
                    <MaterialIcons name="close" size={50} color="red" />
                </TouchableOpacity>
                :<View/>
            }
            <TouchableOpacity style={tw`rounded-xl ${owner ? `w-80%` : `w-90%`} ml-3 flex-row mt-5 justify-center shadow-md h-17 bg-white`}
            onPress={handleNavigate}
            >
                <View style={tw`flex-row bg-white items-center p-2 w-90%`}>
                    <MaterialIcons name={"person"} size={50} color="black" />
                    <Text style={tw`ml-3 text-5`} >{user.username}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}