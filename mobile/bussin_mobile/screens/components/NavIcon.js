import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'

export default function NavIcon({image, action}){
    if(image == null){
        throw new Error('NavIcon must contain an imege image={(String name)}')
    }else if(action == null){
        throw new Error('NaVIcon must do something! action={() => {}} in action field')
    }
    const handleClidk = () => {
        action();
    }
    return (
        <TouchableOpacity style={tw`m-4 bg-white rounded-xl`} onPress={handleClidk}>
            <MaterialIcons name={image} size={50} color="black"/>
        </TouchableOpacity>
    )
}