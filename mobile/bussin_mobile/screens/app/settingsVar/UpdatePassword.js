import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'
import InputField from '../../components/InputField'
import LargeButtonArrow from '../../components/LargeButtonArrow'
import { showAlert } from '../../components/CustomAlert'
import axios from 'axios'
import { API_URL } from '../../../utils/const'
import { useSession } from '../SessionContext'
import ShowPassword from '../../components/ShowPassword';



export default function UpdatePassword({navigator}){
    const {state} = useSession()
    const {dispatch} = useSession()
    const [showPassword, setShowPassword] = useState(true)
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState()
    const handleSave = () => {
        if(password.length <= 5){
            showAlert("Can't update", "New password nees to be longer than 5 characters")
        } else if(password != password2){
            showAlert("Can't update", "Both passwords have to match")
        } else {
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            axios.put(`${API_URL}/account/updatePassword/${state.user.id}`,password,{headers})
            .then((res) => {
                console.log("200: ", res.data)
                showAlert("Success", "Your password has been set")
            })
            .catch((error) => {
                console.log("Error: ", error)
                showAlert("Server error", "It appears are some issue with server or network.\nPlease try another time!")
            })
        }
    }
    return(
        <SafeAreaView style={tw`flex-1 items-center justify-center`}>
            <View style={tw`w-100% items-center justify-center`} >
                <View style={tw`w-100%`}>
                    <InputField 
                    secure={showPassword}
                    placeholder={"New Password"} 
                    onChangeHandle={(text) => {setPassword(text)}} />
                </View>
                <View style={tw`w-100%`}>
                    <InputField 
                    secure={showPassword}
                    placeholder={"Repeat Password"} 
                    onChangeHandle={(text) => {setPassword2(text)}}/>
                </View>
                <ShowPassword setShowPassword={setShowPassword} showPassword={showPassword} />
            </View>
            <LargeButtonArrow active={true} text={"Update Password"} nav={handleSave}/>
        </SafeAreaView>
    )
}