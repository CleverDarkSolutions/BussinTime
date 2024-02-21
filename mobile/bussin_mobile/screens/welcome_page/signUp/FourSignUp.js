import { View, SafeAreaView, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'

import tw from 'twrnc'
import MainTitle from '../../components/Title'
import LargeButton from '../../components/LargeButton'
import { useSession } from '../../app/SessionContext'
import axios from 'axios'
import { API_URL } from '../../../utils/const'
import { showAlert } from '../../components/CustomAlert'

const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

export default function FourSignUp({navigation}) {
    const {dispatch} = useSession()
    const {state} = useSession()
    const [description ,setDescription] = useState(state.user.description)
    const handleDescription = (text) => {setDescription(text)}
    const [country, setCountry] = useState()

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const result = await geocoder.search( { q: state.user.city } )
                const outputArray = result[0].display_name.split(', ');
                setCountry(outputArray[outputArray.length - 1])
            } catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])

    const getTempUser = () => {
        return {
            "userName": state.user.name,
            "email": state.user.email,
            "password": state.user.password,
            "gender": state.user.gender,
            "photoPath": "janusz",
            "description": description,
            "country": country,
            "city": state.user.city,
            "address": "unreleased_featasdure",
            "age": state.user.age
        }
    }
    const handleButton = () =>{
        const tempuser = getTempUser()
        console.log(tempuser)
        axios.post(`${API_URL}/authenticate/signup`, tempuser)
        .then((res) => {
            console.log("200: ", res.data)
            dispatch({type: 'SET_USER', payload: res.data.account})
            dispatch({type: 'SET_TOKEN', payload: res.data.token})
            navigation.navigate('StartScreen')
        })
        .catch((error) => {
            showAlert(
                "Account not created",
                error.response.data.message,
                "change details",
                () => {
                    const tempUser = getTempUser()
                    dispatch({type: 'SET_USER', payload: tempUser})
                    console.log(state.user)
                    navigation.navigate('OneSignUp')
                })
            console.log("Error while connecting to server: " , error)
        })
    }
    return(
        <SafeAreaView style={tw`flex-1 items-center`}>
            <MainTitle content="Step Four" description="Write down your description"/>
            <TextInput multiline style={tw`p-5 w-90% mt-6 text-xl rounded-xl shadow-md bg-white`} 
            placeholder='Description'
            value={description}
            onChangeText={(text) => handleDescription(text)}/>
            <View style={tw`flex-row w-90% justify-center mt-5`} >
                <View style={tw`flex-1`} >
                    <LargeButton text={"Join Bussin Time"} active={true} nav={handleButton}/>
                </View>
            </View>
        </SafeAreaView>
    )
}