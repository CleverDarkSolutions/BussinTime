import { View, Text, SafeAreaView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

import tw from 'twrnc'

import LargeButtonCustom from '../../components/LargeButtonCustom'
import axios from 'axios'
import { API_URL } from '../../../utils/const'
import { useSession } from '../SessionContext'
import { showAlert } from '../../components/CustomAlert'
import { showConfirmation } from '../../components/CustomConfirmation'
import { EmailSend } from '../../components/EmailSender'

export default function DeleteAccount({navigation}){
    const {state} = useSession()
    const [message, setMessage] = useState("")
    const [counter, setCounter] = useState(0)
    const [activeButton, setActiveButton] = useState(false)
    const WORD_LIMIT = 255

    const deleteHandleGuard = () => {
        showConfirmation(
            "Delete account?",
            "Do you really want to leave Bussin Time? \n Your data will be lost forever!",
            "YES", handleSubmit, "NO", () => {navigation.goBack()}
        )
    }

    const handleSubmit =  async () => {
        EmailSend(message)
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        axios.delete(`${API_URL}/account/${state.user.id}`, {headers})
        .then((res) => {
            console.log("Delete successful!", res.data);
            navigation.navigate('Welcome')
        })
        .catch((error) => {
            console.error("Error fetching data: ", error)
            showAlert('Problem while delete', 'It appears to be a problem with deleting account.\nPlease contact Bussin Time devs')
        })
    }

    const handleType = (text) => {
        if(text == ""){
            setActiveButton(false)
        } else {
            setActiveButton(true)
        }
        setCounter(text.length)
        if(counter <= WORD_LIMIT){
            setMessage(text)
        }
    }
    return (
        <SafeAreaView style={tw`flex-1 items-center`}>
            <View style={tw`items-center`}>
                <Text style={tw`text-6 mt-6`}>Do you really want to leave us?</Text>
                <Text style={tw`text-5 mt-6`}>Leave a feedback</Text>
            </View>
            <View style={tw`mt-5`} >
                <Text style={tw`text-4`} >Character limit {counter}/{WORD_LIMIT} {counter <= WORD_LIMIT ? "" : "\nNew changes won't be submited"} </Text>
            </View>
            <TextInput multiline style={tw`p-5 w-90% mt-6 text-xl rounded-xl shadow-md bg-white`} 
            placeholder='Write feedback to help improve our application' onChangeText={(text) => handleType(text)}/>
            <View style={tw`mt-5 w-100%`}>
                <LargeButtonCustom text={"Delete"} active={activeButton} nav={deleteHandleGuard} color={"red"} />
            </View>
        </SafeAreaView>
    );
}