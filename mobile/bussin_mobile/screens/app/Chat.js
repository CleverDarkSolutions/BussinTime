import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'
import axios from 'axios';
import { API_URL } from '../../utils/const';
import LoadingComponent from '../components/LoadingComponent';
import NavBar from '../components/NavBar';
import InputField from '../components/InputField';
import LargeButtonArrow from '../components/LargeButtonArrow';
import { showAlert } from '../components/CustomAlert';
import { useSession } from './SessionContext';
import TopHeader from '../components/TopHeader';
import { WebSocket } from 'react-native-gesture-handler';

export default function Chat({route, navigation}){
    const {state} = useSession()
    const [messages, setMessages] = useState([])
    const [loading, setLoadning] = useState(true)
    const [socket, setSocket] = useState(null);
    const [tempMessage, setTempMessage] = useState("")
    const scrollViewRef = useRef()

    // Requesty fetch messages request 
    // axios.get(`${API_URL}/messages/${props.senderId}/${props.recipientId}`)
    // .then((res) => {
    //      setMessages(res.data)
    // })
    // const sendMessage = (recipientId: string | number, senderId: string | number, content: string) => {
    //     console.log('Message sent')
    //     client.publish({
    //       destination: '/app/chat',
    //       body: JSON.stringify({
    //         recipientId: recipientId,
    //         senderId: senderId,
    //         content: content}),
    //     });
    //   }

    const fetchData = async () => {
        try{
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            const result = await axios.get(`${API_URL}/messages/${state.user.id}/${route.params.id}`, {headers})
            setMessages(result.data)
            console.log(result.data)
        }catch(error){console.log(error)} 
        finally {setLoadning(false)}
    }

    const scrollToBottom = () => {
        if(scrollViewRef.current){
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }
    useEffect(() => {
        // var socket = new WebSocket(`ws://172.16.41.13:8443/ws`);
        // socket.onopen = () => {
        //   console.log('WebSocket connection opened');
        // };
        // socket.onmessage = (event) => {
        //   console.log('WebSocket message received:', event.data);
        // };
        // socket.onerror = (error) => {
        //   console.error('WebSocket error:', error);
        // };
        // socket.onclose = (event) => {
        //   console.log('WebSocket connection closed:', event);
        // };

        scrollToBottom();
        fetchData();
        console.log(messages);

        // return () => {
        //   socket.close(); // Corrected to use the same variable name 'socket'
        // };
    },[])

    const handleSend = async () => {
        scrollToBottom()
        setTempMessage("")
        if(tempMessage === ""){showAlert("Can't send", "Message cant be empty"); return 1}
        console.log("Sending message to " + route.params.id)
        socket.send('Hello, WebSocket server!');
        // await axios.post(`${API_URL}/`)
    }
    return(
        <SafeAreaView style={tw`flex-1`}>
            <TopHeader title={"Chat: " + route.params.username} navigation={navigation}/>
            <SafeAreaView style={tw`flex-col`}>
                {/* <LargeButtonArrow nav={handleSend} active={true} /> */}
                <ScrollView ref={scrollViewRef}  style={tw`h-70%`}>
                    <Message jsonMessage={tempMeasage} />
                </ScrollView>
            <InputField 
                value={tempMessage}
                placeholder={"Enter your message"} 
                onChangeHandle={setTempMessage}
                multiline={true}
                />
            </SafeAreaView>
        </SafeAreaView>
    )
}

const tempMeasage = {
    "id": 1,
    "content": "Przykładowa wiadomosc",
    "messageTime": "2024-02-03 19:42:41",
    "messageType": "USER",
    "chatName": "Zbigniew123_Krzychu998",
    "sender": {
        "id": 3
    },
    "recipient": {
        "id": 2
    }
}
function Message({jsonMessage}){
    const {state} = useSession()
    const [commenter, setCommenter] = useState()
    const getCommenter = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.get(`${API_URL}/account/${jsonMessage.sender.id}`, {headers})
        .then((res) => {
            setCommenter(res.data.username)
        }).catch((error) => console.log(error))
    }
    useEffect(() => {
        getCommenter()
    }, [])
    return(
        <View style={tw`ml-3 mb-2 mt-2 items-start`}>
            <View style={tw`flex-col ml-3 p-3 rounded-xl shadow-md bg-white`} >
                <View style={tw`flex-row`} >
                    <Text>{commenter}</Text>
                </View>
                <Text style={tw`text-5`} >{jsonMessage.content}</Text>
            </View>
            <View style={tw`ml-8`}>
                <Text style={tw`text-gray-500`}>{jsonMessage.messageTime}</Text>
            </View>
        </View>
    )
}