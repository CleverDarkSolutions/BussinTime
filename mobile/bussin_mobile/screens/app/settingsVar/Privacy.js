import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'

import { useSession } from '../SessionContext';
import LargeButtonArrow from '../../components/LargeButtonArrow';

export default function Privacy({navigation}){
    const {dispatch} = useSession()
    const {state} = useSession()
    const [details, setDetails] = useState({})
//     "gps": true,
//   "privateProfile": false,
//   "shareUsageData": true,

    useEffect(() => {

    },[])

    const onSave = () => {
        dispatch({type: 'SET_USER', payload: tempuser})
        navigation.goBack()
    }
    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center`}>
            <SettingsRow 
            text={"My GPS location: "} 
            icon={"my-location"}
            />
            <SettingsRow 
            text={"Visibility: "}
            icon={"visibility"}
            />
            <SettingsRow 
            text={"Share data: "} 
            icon={"signal-wifi-0-bar"}
            />
            <View style={tw`w-100% mt-5`} >
                <LargeButtonArrow text={"Save"} active={true} nav={onSave}/>
            </View>
        </SafeAreaView>
    );
}

const SettingsRow = ({text="default", icon ,isPressed = false}) => {
    const [pressed, setPressed] = useState(isPressed);
    return(
        <TouchableOpacity 
        onPress={() => {setPressed(!pressed)}}
        style={tw`
        flex-row w-90% h-20 
        justify-between bg-white 
        rounded-xl shadow-md items-center
        mt-5`} >
            <View style={tw`ml-5`} >
                <Text style={tw`text-5`} >{text} {pressed ? "On" : "Off"}</Text>
            </View>
            <MaterialIcons name={icon} size={24} color={pressed ? "green" : "gray"} style={tw`mr-8`} />
        </TouchableOpacity>
    )
}