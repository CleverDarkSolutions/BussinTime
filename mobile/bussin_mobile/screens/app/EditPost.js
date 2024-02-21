import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'
import axios from 'axios';
import { API_URL } from '../../utils/const';
import InputField from '../components/InputField';
import LargeButtonArrow from '../components/LargeButtonArrow';
import { showAlert } from '../components/CustomAlert';
import LargeButtonCustom from '../components/LargeButtonCustom';
import { showConfirmation } from '../components/CustomConfirmation';
import { useSession } from './SessionContext';

export default function EditPost({route, navigation}){
    const goBack = () => {navigation.goBack()}
    const {state} = useSession()
    const [title, setTitle] = useState(route.params.post.title)
    const [description, setDescription] = useState(route.params.post.content)
    const handleDeleteTrhread = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.delete(`${API_URL}/post/${route.params.post.id}`, {headers})
        .then((res) => {navigation.goBack()})
        .catch((error) => {console.log(error.data); showAlert("Cant delete", "It may be some problems with data base!")})
    }
    const handlePost = async () => {
        if(title.length < 3){showAlert("Cant update Post", "Title is too short")}
        else if(description.length < 3){showAlert("Cant update Post", "Post must contain brief description")}
        else {
            const POSTdata = {
                title: title,
                content: description,
            }
            console.log(POSTdata)
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            await axios.put(`${API_URL}/post/${route.params.post.id}`, POSTdata, {headers})
            .then((res) => {
                showAlert("Post Updated!", "Now everyone see your updated event", "OK", goBack)
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
                        <Text style={tw`text-8 text-white`}>{route.params.post.title}</Text>
                    </View>
                </View>
                <View style={tw`flex-row justify-center items-center mt-6`} >
                    <Text style={tw`text-7`} >Edit Post</Text>
                </View>
                <InputField value={title} placeholder={"Title"} onChangeHandle={setTitle} />
                <InputField value={description} placeholder={"Description"} onChangeHandle={setDescription} />
                <LargeButtonArrow active={true} text={"Update"} nav={handlePost} />
                <LargeButtonCustom active={true} text={"Delete"} color={"red"} nav={
                    () => showConfirmation(
                        "Delete post?", 
                        "Do you want to delete this thread?",
                        "YES", handleDeleteTrhread)} />
            </View>
        </SafeAreaView>
    );
}