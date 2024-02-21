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

export default function PostDetails({route, navigation}){
    const [comments, setComments] = useState({})
    const [loading, setLoadning] = useState(true)
    const [tempMessage, setTempMessage] = useState("")
    const {state} = useSession()

    const scrollViewRef = useRef()
    const scrollToBottom = () => {
        if(scrollViewRef.current){
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }
    const fetchData = async () => {
        try{
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            const result = await axios.get(`${API_URL}/comment/getCommentsByPost/${route.params.id}`, {headers})
            setComments(result.data)
            console.log(result.data)
        } catch(error){
            console.log(error)
        } finally {
            setLoadning(false)
        }
    }
    useEffect(() => {
        fetchData()
        scrollToBottom()
    },[])

    const handleSend = async () => {
        scrollToBottom()
        setTempMessage("")
        if(tempMessage === ""){showAlert("Can't send", "Message cant be empty")}
        const POSTdata = {
            content: tempMessage,
            accountId: state.user.id,
            postId: route.params.id
        }
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.post(`${API_URL}/comment`, POSTdata, {headers})
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
        fetchData()
    }

    const goBack = () => {navigation.goBack()}
    return (
        <SafeAreaView style={tw`h-100%`}>
            {loading ? 
                <View style={tw`flex-1 justify-center items-center`}>
                    <LoadingComponent />
                </View> : 
            <View>
                <View style={tw`bg-black mt-8 mb-3`}>
                    <View style={tw`flex-row ml-3 mt-5 items-center`}>
                        <TouchableOpacity onPress={goBack} >
                            <MaterialIcons name="arrow-back-ios" size={27} color="white" />
                        </TouchableOpacity>
                        <Text style={tw`text-8 text-white`}>{route.params.title}</Text>
                    </View>
                    <View style={tw`ml-4 flex-row items-center mb-5`} >
                        <Text style={tw`text-5 text-white`} >Description: {route.params.content}</Text>
                    </View>
                </View>
                    <LargeButtonArrow active={true} text={"Comment"} nav={handleSend} />
                <ScrollView style={tw`h-57%`} ref={scrollViewRef}>
                    <View>
                        {comments.length == 0 ? 
                        <View style={tw`flex-row justify-center items-center mt-6 mb-6`} >
                            <Text style={tw`text-5 text-gray-400`} >This thread has no comments jet</Text>
                        </View> 
                        :
                            <View style={tw`items-start`} >
                                {comments.map((value, key) => (
                                    <Message 
                                    key={key}
                                    jsonMessage={value}
                                    />
                                ))}
                            </View> 
                        }
                    </View>
                </ScrollView>
                <View style={tw``} >
                    <InputField 
                    value={tempMessage}
                    placeholder={"Enter your comment"} 
                    onChangeHandle={setTempMessage}
                    multiline={true}
                    />
                </View>
            </View>
            }
        </SafeAreaView>
    );
}

// Section for message component
function Message({jsonMessage}){
    const {state} = useSession()
    const [commenter, setCommenter] = useState()
    const getCommenter = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.get(`${API_URL}/account/${jsonMessage.commenterId.id}`, {headers})
        .then((res) => {
            setCommenter(res.data.username)
        }).catch((error) => console.log(error))
    }
    useEffect(() => {
        getCommenter()
    }, [])
    return(
        <View style={tw`ml-3 mb-2`}>
            <View style={tw`flex-col ml-3 p-3 rounded-xl shadow-md bg-white`} >
                <View style={tw`flex-row`} >
                    <Text>{commenter}</Text>
                </View>
                <Text style={tw`text-5`} >{jsonMessage.content}</Text>
            </View>
            <View style={tw`ml-8`}>
                <Text style={tw`text-gray-500`}>{jsonMessage.creationDate}</Text>
            </View>
        </View>
    )
}