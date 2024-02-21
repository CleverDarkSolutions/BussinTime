import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'

export default function ShowPassword({showPassword, setShowPassword}){
    return (
        <TouchableOpacity style={tw`flex-row mb-3`} onPress={() => setShowPassword(!showPassword)} >
            <Text style={tw`mr-4 text-5`} >Show password</Text>
            <MaterialIcons 
            name={showPassword ? "visibility-off" : "visibility"} 
            size={30} color={showPassword ? "grey" : "black"} style={tw`mr-8`} />
        </TouchableOpacity>
    )
}