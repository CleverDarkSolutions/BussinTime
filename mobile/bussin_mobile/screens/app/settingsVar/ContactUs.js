import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'

import tw from 'twrnc'

import LargeButtonCustom from '../../components/LargeButtonCustom'
import { EmailSend } from '../../components/EmailSender';

export default function ContactUs({navigation}){
    const [message, setMessage] = useState("")
    const [counter, setCounter] = useState(0)
    const [activeButton, setActiveButton] = useState(false)
    const [sended, setSended] = useState(false);
    const WORD_LIMIT = 255
    const handleSubmit = async () => {
        setMessage("")
        setCounter(0)
        setActiveButton(false)
        setSended(true)
        EmailSend(message)
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
            <View style={tw`mt-5`} >
                <Text style={tw`text-4`} >Character limit {counter}/{WORD_LIMIT} {counter <= WORD_LIMIT ? "" : "\nNew changes won't be submited"} </Text>
            </View>
            <TextInput multiline style={tw`p-5 w-90% mt-6 text-xl rounded-xl shadow-md bg-white`} 
            placeholder='Write feedback to help improve our application' 
            value={message}
            onChangeText={(text) => handleType(text)}/>
            <View style={tw`mt-5 w-100%`}>
                <LargeButtonCustom text={"Submit"} active={activeButton} nav={handleSubmit} color={"green"}/>
            </View>
            <View >
                <Text style={tw`text-4`} >{sended ? "Thanks for Your contribution!" : ""}</Text>
            </View>
        </SafeAreaView>
    );
}