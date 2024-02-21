import { View, Text, SafeAreaView, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import { useSession } from './SessionContext'

import tw from 'twrnc'

import NavBar from '../components/NavBar'
import { useFocusEffect } from '@react-navigation/native';
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import { API_URL } from '../../utils/const';
import { showConfirmation } from '../components/CustomConfirmation';
import { showAlert } from '../components/CustomAlert';

export default function Notification({navigation}){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const {state} = useSession()
    useFocusEffect(
        React.useCallback(() => {
            fetchData()
            return () => {console.log("Closing my events")}
        }, [])
    )
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try{
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            const result = await axios.get(`${API_URL}/notification/${state.user.id}`, {headers})
            setData(result.data)
            console.log(result.data)
        } catch(error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
    return(
        <SafeAreaView style={tw`flex-1`}>
            <SafeAreaView style={tw`flex-col h-full`}>
                {loading ? 
                <LoadingComponent/> : 
                data.length === 0 ? 
                <View style={tw`flex-col h-87% items-center justify-center`}>
                    <LoadingComponent text={'No notifications'} showImage={false} /> 
                </View> :
                <ScrollView>
                    <View style={tw`items-center`}>
                        {data.map((value, key) => (
                        <NotificationComponent
                        value={value}
                        key={key}
                        refresh={fetchData}
                        navigation={navigation} />
                        ))}
                    </View>
                </ScrollView>
                }
            <NavBar navigation={navigation}/>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const NotificationComponent = ({value, refresh, navigation}) => {
    const {state} = useSession()
    const handleAcceptGuard = () => {
        showConfirmation(
            "Accept", "Dou you really want to accept this?",
            "YES", accept
        )
    }
    const accept = async () => {
        console.log(value.notificationType)
        console.log(value.id)
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        if(value.notificationType === "FRIEND_INVITE"){
            await axios.put(`${API_URL}/friendship/changeStatus/${value.friendship.id}?friendshipStatus=ACCEPTED`, {headers})
            .then((res) => {
                refresh()
            }).catch((error) => console.log(error))
        } else if(value.notificationType === "JOIN_REQUEST"){
            await axios.put(`${API_URL}/event/setEventInvitationRequestStatus?eventJoinRequestStatus=ACCEPTED&eventJoinRequestId=${value.request.id}`, {headers})
            .then((res) => {
                refresh()
            }).catch((error) => console.log(error))
        } else if(value.notificationType === "EVENT_INVITE"){
            await axios.post(`${API_URL}/event/joinEvent/${value.recipient.id}/${value.event.id}`, {headers})
            .then((res) => {
                refresh()
            }).catch((error) => console.log(error))
        }
    }
    const handleRejectGuard = () => {
        showConfirmation(
            "Reject", "Reject fiend request?",
            "YES", reject
        )
    }
    const reject = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        if(value.notificationType === "FRIEND_INVITE"){
            await axios.put(`${API_URL}/friendship/changeStatus/${value.friendship.id}?friendshipStatus=REJECTED`, {headers})
            .then((res) => {
                refresh()
            }).catch((error) => console.log(error))
        } else if(value.notificationType === "JOIN_REQUEST"){
            await axios.put(`${API_URL}/event/setEventInvitationRequestStatus?eventJoinRequestStatus=REJECTED&eventJoinRequestId=${value.request.id}`, {headers})
            .then((res) => {
                refresh()
            }).catch((error) => console.log(error))
        } else if(value.notificationType === "EVENT_INVITE"){
            await axios.delete(`${API_URL}/event/rejectInvitation?eventId=${value.event.id}&accountId=${value.recipient.id}`, {headers})
            .then((res) => {
                refresh()
            }).catch((error) => console.log(error))
        }
    }
    const onPressBox = () => {
        console.log(value.notificationType)
        if(value.notificationType === "FRIEND_INVITE"){
            navigation.navigate('UserDetails', {id: value.friendship.initiator.id})
        } else if(value.notificationType === "EVENT_INVITE"){
            navigation.navigate('EventDetails', {id: value.event.id})
        }
    }
    return(
        <View style={tw`items-center rounded-xl shadow-md w-90% bg-white mb-2 mt-2`} > 
            <TouchableOpacity style={tw`w-80% flex-row justify-center h-17`}
            onPress={onPressBox}
            >
                <View style={tw`flex-row bg-white items-center w-120%`}>
                    <Text style={tw`ml-3 text-5`} >{value.message}</Text>
                </View>
            </TouchableOpacity>
            <View>
                <Text style={tw`text-4 text-gray-500`} >Time: {value.timestamp}</Text>
            </View>
            <View  style={tw`flex-row`} >
                <TouchableOpacity style={tw`justify-center items-center`} onPress={handleRejectGuard} >
                    <MaterialIcons name="close" size={50} color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`justify-center items-center`} onPress={handleAcceptGuard} >
                    <MaterialIcons name="check" size={50} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    )
}