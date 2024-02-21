import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import tw from 'twrnc'

import NavBar from '../components/NavBar'
import axios from 'axios'
import { API_URL } from '../../utils/const'
import LoadingComponent from '../components/LoadingComponent'
import { useFocusEffect } from '@react-navigation/native'
import { showConfirmation } from '../components/CustomConfirmation';
import { showAlert } from '../components/CustomAlert';
import { useSession } from './SessionContext';
import { GREEN } from '../../utils/colors';

export default function UserDetails({route, navigation}){
    const {state} = useSession()
    const [data, setData] = useState([])
    const [loading, setLoadning] = useState(true)
    const [isFriend, setFriend] = useState(false)
    const isFriendFunc = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.get(`${API_URL}/friendship/checkIfFriend?accountId=${state.user.id}&userToCheckId=${route.params.id}`, {headers})
        .then((res) => {
            console.log(res.data)
            setFriend(res.data)
        }).catch((err) => console.log(err))
    }
    const fetchData = async () => {
        try{
            const result = await axios.get(`${API_URL}/account/${route.params.id}`)
            setData(result.data)
            console.log(result.data)
        } catch(error){
            console.log(error)
        } finally {setLoadning(false)}
    }
    useFocusEffect(
        React.useCallback(() => {
            isFriendFunc()
            fetchData()
            return () => {}
        }, [])
    )
    useEffect(() => {
        isFriendFunc()
        fetchData()
    },[])
    return(
        <SafeAreaView style={tw`flex-1`}>
            <SafeAreaView style={tw`flex-col h-full`}>
                <View style={tw`flex-5 items-center`}>
                    {loading ? 
                    <LoadingComponent text={'Can not show profile RN :('} /> 
                    : 
                    <SafeAreaView>
                        <Detail title={data.username} icon={"person"} />
                        <Detail title={"About me: " + data.description} icon={"description"} />
                        <Detail title={"Location: " + data.country +", "+ data.city} icon={"location-on"} />
                        {/* unreleasedFeature */}
                        {/* <Detail title={"Premium: " + ((data.premium === null) ? "No" : "Yes")} icon={"star"} /> */}
                        {isFriend ? 
                            <View style={tw`flex-row mt-5 items-start justify-center`}>
                                <TouchableOpacity 
                                style={tw`flex-row bg-white rounded-xl shadow-md items-center p-2 mr-3 w-90%`}
                                onPress={() => {navigation.navigate('Chat', {
                                    id: data.id,
                                    username: data.username
                                })}}
                                >
                                    <MaterialIcons name={"chat"} size={50} color="black" />
                                    <Text style={tw`ml-3 mr-11 text-5`}>Chat with {data.username}</Text>
                                </TouchableOpacity>
                            </View> : <View/>
                        }
                        <SendFriendRequest isFriendRes={isFriend} friendId={route.params.id} navigation={navigation}/>
                    </SafeAreaView>
                    }
                </View>
            <NavBar navigation={navigation}/>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const SendFriendRequest = ({isFriendRes, friendId, navigation}) => {
    const {state} = useSession()
    const [isFriend, setFriend] = useState("waiting")
    const [text, setText] = useState("Send friend request")
    const [icon, setIcon] = useState("send")
    const fetchData = async () => {
        isFriendRes ? setFriend("yes") : setFriend("no")
        isFriendRes ? setText("This user is your friend!") : setText("Send friend request")
        isFriendRes ? setIcon("check") : setIcon("send")
    }
    useEffect(() => {
        fetchData()
    },[])
    const handlePress = async () => {
        if(isFriend === "no"){
            await axios.post(`${API_URL}/friendship?receiver_id=${friendId}&initiator_id=${state.user.id}`)
            .then(res => console.log(res))
            .catch(error => console.log(error))
            showAlert("Friend request", "You send the friend request!")
            setIcon("access-time")
            setFriend("waiting")
            setText("Waiting for accept")
        } else if(isFriend === "yes"){
            showConfirmation(
                "Delete from friends?",
                "Do you want to delete this user from your friends list?",
                "YES", deleteFriend
            )
        }
    }
    const deleteFriend = async () => {
        // Data base
        await axios.delete(`${API_URL}/friendship?user1Id=${state.user.id}&user2Id=${friendId}`)
        .then((res) => {showAlert("Deleted friend", "This user has been deleted from your friendlist")})
        .catch(error => console.log(error))
        fetchData()
        navigation.goBack()
    }
    return(
        <TouchableOpacity 
        style={tw`flex-row bg-white mt-5 items-start justify-center mb-10`}
        onPress={handlePress}
        >
            <View style={tw`flex-row ${isFriend === "yes" ? `bg-` + GREEN : `bg-white`} rounded-xl shadow-md items-center p-2 mr-3 w-90%`}>
                <MaterialIcons name={icon} size={50} color={isFriend === "yes" ? "white" : "black"} />
                <Text style={tw`ml-3 mr-11 text-5 ${isFriend === "yes" ? `text-white` : `text-black`}`} >{text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

function Detail({title, icon}){
    return (
        <View style={tw`flex-row mt-5 items-start justify-center`} >
            <View style={tw`flex-row bg-white rounded-xl shadow-md items-center p-2 mr-3 w-90%`}>
                <MaterialIcons name={icon} size={50} color="black" />
                <Text style={tw`ml-3 mr-11 text-5`} >{title}</Text>
            </View>
        </View>
    )
}