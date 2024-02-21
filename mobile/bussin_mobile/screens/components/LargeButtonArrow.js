import { useState } from "react"
import { TouchableOpacity, Text, SafeAreaView } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'

export default function LargeButtonArrow({nav, text, active}){
    if(text == ''){
        throw new Error('LargeButton must conteina text value')
    }else if(nav == null){
        throw new Error('LargeButton must do something! nav={() => {}} required in nav field')
    }
    const handleClick = () => {
        nav()
    }
    const textColor = active ? tw`text-black` : tw`text-slate-300`
    const arrowColor = active? "black" : "gray"
    return(
        <TouchableOpacity 
        disabled={!active} 
        style={tw`flex-row h-16 py-3 mx-7 rounded-xl mb-4 shadow-md bg-white items-center`} 
        onPress={handleClick}>
            <Text style={[tw`text-xl font-bold text-center flex-1`, textColor]}>
                {text}
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color={arrowColor} style={tw`mr-5`}/>
        </TouchableOpacity>
    );
}