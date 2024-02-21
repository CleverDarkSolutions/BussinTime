import { View, Alert, Modal, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'

export default function EventTile({name = "Kiep", isPrivate=false, city = "kiepowo",owner = false , starts, active = false, navigation, id}){
    const icon = owner ? "edit" : "event"
    const pressed = () => {
        navigation.navigate('EventDetails', {id})
    }
    return(
        <View>
            {isPrivate ? 
                <View/> : 
                <View style={tw` 
            w-95p 
            bg-white 
            m-3
            shadow-md
            p-5
            rounded-xl`}
        >
            <TouchableOpacity
              onPress={pressed}
              style={tw`flex-row items-center justify-between`}
            >
                <Text style={tw`text-4`}>
                    <Text style={tw`text-2xl`}>{name}</Text>{"\n"}
                    Location: {city}{"\n"}
                    Start: {starts}
                </Text>
                <MaterialIcons style={tw``} name={icon} size={40} color={active ? "green" : "grey"} />
            </TouchableOpacity>
        </View>
            }
        </View>
    )
}