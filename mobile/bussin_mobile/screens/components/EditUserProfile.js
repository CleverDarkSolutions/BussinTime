import { View, Alert, Modal, Text, SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'

import tw from 'twrnc'
import LargeButton from './LargeButton'
import InputField from './InputField'
import { useSession } from '../app/SessionContext'
import { showAlert } from './CustomAlert'
import axios from 'axios'
import { API_URL } from '../../utils/const'


function EditPopup({ visible, onClose, text, changeState}){
    return(
      <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 items-center justify-center bg-opacity-50 bg-black`}>
        <View style={tw`w-3/4 bg-white p-4 rounded`}>
          <Text style={tw` text-5`}>{text}</Text>
          <InputField onChangeHandle={changeState} multiline={true}/>
          <TouchableOpacity style={tw`items-center`} onPress={onClose}>
            <Text style={tw`underline text-5`}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    )
}

const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

export default function EditUserProfile({navigation}){
    const {state} = useSession()
    const {dispatch} = useSession()
    const [isChanged, setChanged] = useState(false); // Save buton state
    const [tempUser, setTempUser] = useState(state.user); // Temporary user inside user profile
    const [textModal, setTextModal] = useState("Default");
    const [tempPromptInput, setTempPromptInput] = useState("")
    const [variant, setVariant] = useState("0")
    
    const [modalVisible, setModalVisible] = useState(false)
    const openModal = () => {setModalVisible(true)}
    const closeModal = () => {
        setModalVisible(false)
        if(tempPromptInput !== ""){
            switch(variant){
            case "username": setTempUser((previous)     => ({...previous, username: tempPromptInput})); break;
            case "email": setTempUser((previous)    => ({...previous, email: tempPromptInput})); break;
            case "city": setTempUser((previous)      => ({...previous, city: tempPromptInput})); break;
            case "description": setTempUser((previous) => ({...previous, description: tempPromptInput})); break;
            }
        }
        setTempPromptInput("")
    }

    const handlePromptValue = (text) => {setTempPromptInput(text)}
 
    const handleButton = (payload) => {
        setVariant(payload)
        switch(payload){
            case "username": {
                setTextModal("Edit username: " + tempUser.username)
                openModal()
                break
            }
            case "email":{
                setTextModal("Edit Email: " + tempUser.email)
                openModal()
                break
            }
            case "city":{
                setTextModal("Edit city: " + tempUser.city)
                openModal()
                break
            }
            case "description":{
                setTextModal("Edit description: ")
                openModal()
                break
            }
        }
        setChanged(true)
    }
    const handleSave = async () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const numberRegex = /^\d+$/
        const result = await geocoder.search( { q: tempUser.city } )
        let flag = true
        if(result.length === 0){showAlert("Can not update account", "City name is unknown.\n Its important to provide resonable city to improve app experience")}
        if(tempUser.username.length < 5){ Alert.alert("username too short\nMinimum 6 characters"); flag = false;}
        if(tempUser.username.length > 16) {Alert.alert("username too long"); flag = false;}
        if(!emailRegex.test(tempUser.email)) {Alert.alert("Email incorrect \nExample: example@bussintime.com"); flag = false;}
        if(!numberRegex.test(tempUser.age)) {Alert.alert("Age incorrect \nExample: 16 - 80"); flag = false;}
        if(tempUser.password.length < 5){Alert.alert("Password incorrect \nMore than 6 characters"); flag = false;}
        else if(flag) {
            console.log("State: ", state)
            setTempUser({...tempUser, city: result[0].name})
            console.log("Save")
            const outputArray = result[0].display_name.split(', ')
            const country = (outputArray[outputArray.length - 1])

            const putData = {
                userName: tempUser.username,
                email: tempUser.email,
                country: country,
                city: result[0].name,
                address: "SSSSSSSs",
                photoPath: "janusz",
                description: tempUser.description
            }
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            console.log("Token: ", state.token)
            console.log("Put data to database: ", putData)
            axios.put(`${API_URL}/account/updateAccountDetails/${state.user.id}`,putData, {headers})
            .then((res) => {
                console.log("200", res.data)
                dispatch({type: 'SET_USER', payload: res.data})
                showAlert("Success", "Your profile has been updated", "Yupee")
            })
            .catch((error) => {
                console.log("Error: ", error)
                if(error.response.data == []){
                    showAlert("Server error", "It appears are some issue with server or network.\nPlease try another time!")
                } else {
                    showAlert("Wrong input data", error.response.data)
                }
            })
            setChanged(false)
        }
    }
    return(
        <SafeAreaView style={tw`flex-1 mt-1`}>
            <View style={tw`flex-row justify-center`}>
                <Text style={tw`text-xl p-3`}>Click to edit</Text>
            </View>
            <ScrollView>
                <View style={tw`flex-row justify-center`}>
                    <TouchableOpacity onPress={() => handleButton("username")}>
                        <SmallBox text={"username: \n" + tempUser.username} />
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-row justify-center`}>
                    <TouchableOpacity onPress={() => handleButton("email")}>
                        <Text style={
                            tw`w-95p 
                            h-25 bg-white 
                            m-3 text-center
                            shadow-md
                            p-5
                            justify-center
                            text-xl
                            rounded-xl`}>
                            Email: {"\n"}{tempUser.email}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-row justify-center`}>
                    <TouchableOpacity onPress={() => handleButton("city")}>
                        <SmallBox text={"city:\n" + tempUser.city}/>
                    </TouchableOpacity>
                </View>
                
                <View style={tw`flex-row justify-center`}>
                    <TouchableOpacity onPress={() => {navigation.navigate('UpdatePassword')}}>
                        <HugeBox text={"Password"} />
                    </TouchableOpacity>
                </View>
                <View style={tw`shadow-md w-95p 
                        bg-white 
                        m-3 text-center
                        p-5
                        justify-center
                        text-xl
                        rounded-xl`}>
                    <TouchableOpacity onPress={() => handleButton("description")}>
                        <Text style={tw`text-xl`}>
                            Description: {"\n"}{tempUser.description}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`mt-6`} >
                    <LargeButton nav={handleSave} active={isChanged} text={"Save"}/>
                </View>
            </ScrollView>
            <EditPopup 
            visible={modalVisible} 
            onClose={closeModal} 
            text={textModal} 
            changeState={handlePromptValue}/>
        </SafeAreaView>
    )
}

const SmallBox = ({text}) => {
    return(
        <Text style={
            tw`w-95p 
            h-25 bg-white 
            m-3 text-center
            shadow-md
            p-5
            justify-center
            text-xl
            rounded-xl`}>
            {text}
        </Text>
    )
}
const HugeBox = ({text}) => {
    return(
        <Text style={
            tw`w-95p 
            h-25 bg-white 
            m-3 text-center
            shadow-md
            p-8
            justify-center
            text-xl
            rounded-xl`}>
            {text}
        </Text>
    )
}