import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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

export default function AddPost({route, navigation}){
    const {state} = useSession();
    const goBack = () => {navigation.goBack()}
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const handlePost = async () => {
        if(title.length < 3){showAlert("Cant create Post", "Title is too short")}
        else if(description.length < 3){showAlert("Cant create Post", "Post must contain brief description")}
        else {
            const POSTdata = {
                title: title,
                content: description,
                accountId: state.user.id,
                eventId: route.params.id,
                photoPath: "janusz"
            }
            console.log(POSTdata)
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            await axios.post(`${API_URL}/post`, POSTdata, {headers})
            .then((res) => {
                showAlert("Post Created!", "Now everyone see your event", "OK", goBack)
            })
            .catch((error) => {
                console.log("Error od zmuły: ", error)
                showAlert("Server error", "It appears are some issue with server or network.\nPlease try another time!")
            })
        }
    }
    return (
        <SafeAreaView style={tw`h-100%`}>
            <View>
                <View style={tw`bg-black mt-8`}>
                    <View style={tw`flex-row ml-3 p-5 items-center`}>
                        <TouchableOpacity onPress={goBack} >
                            <MaterialIcons name="arrow-back-ios" size={27} color="white" />
                        </TouchableOpacity>
                        <Text style={tw`text-8 text-white`}>{route.params.title}</Text>
                    </View>
                </View>
                <View style={tw`flex-row justify-center items-center mt-6`} >
                    <Text style={tw`text-7`} >Add Post</Text>
                </View>
                <InputField placeholder={"Title"} onChangeHandle={setTitle} />
                <InputField placeholder={"Description"} onChangeHandle={setDescription} />
                <LargeButtonArrow active={true} text={"Post"} nav={handlePost} />
            </View>
        </SafeAreaView>
    );
}