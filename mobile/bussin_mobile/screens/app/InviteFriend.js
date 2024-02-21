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
import NavBar from '../components/NavBar';

export default function InviteFriends({route, navigation}){
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
            const result = await axios.get(`${API_URL}/friendship/${state.user.id}`, {headers})
            setData(result.data)
        } catch(error){console.log(error)
        } finally {setLoadning(false)}
    }
    useEffect(() => {
        fetchData()
    },[])
    return(
        <SafeAreaView style={tw`flex-1 items-center`}>
            {loading ? 
            <LoadingComponent /> : 
            data.length == 0 ? 
            <View style={tw`flex-col h-87% items-center justify-center`}>
                <LoadingComponent text={'No friends'} showImage={false} /> 
            </View> :
            <ScrollView>      
                {data.map((value, key) => (
                    <TileComponent
                    eventId={route.params.id}
                    fetch={fetchData}
                    user={value}
                    key={key}
                    refresh={fetchData}
                    navigation={navigation} />
                ))}
            </ScrollView>
            }
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    )
}

const TileComponent = ({user, navigation, fetch, eventId}) => {
    const {state} = useSession()
    const handleInvite = async () => {
        console.log("Event id ", eventId)
        console.log("user id ", user.id)
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.post(`${API_URL}/event/inviteToEvent/${eventId}?invitedAccountId=${user.id}`, {headers})
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
        fetch()
    }
    return(
        <View style={tw`flex-row items-center h-25`} > 
            <TouchableOpacity style={tw`rounded-xl w-90% ml-3 flex-row mt-5 justify-center shadow-md h-17 bg-white`}
            onPress={() => showConfirmation("Invite", "Invite " + user.username + " to event?",
            "Yes", handleInvite)}
            >
                <View style={tw`flex-row bg-white items-center p-2 w-90%`}>
                    <MaterialIcons name={"person"} size={50} color="black" />
                    <Text style={tw`ml-3 text-5`} >{user.username}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}