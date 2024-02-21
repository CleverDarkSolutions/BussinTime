import React from "react";
import { View, TextInput } from "react-native";

import tw from 'twrnc'

export default function InputField({placeholder, onChangeHandle, secure, multiline, numeric=false, value=null}){
    const enableNumeric = numeric ? "numeric": "default";
    return(
        <TextInput
        style={tw`py-3 text-xl bg-white mb-7 ml-8 mr-8 px-6 py-3 border-b-2 border-black`}
        placeholder={placeholder}
        onChangeText={(text) => onChangeHandle(text)}
        secureTextEntry={secure}
        multiline={multiline}
        keyboardType={enableNumeric}
        value={value}
        />
    )
}
export function InputFieldDate({placeholder, onChangeHandle, value=null}){
    return(
        <TextInput
        style={tw`py-3 text-xl bg-white mb-7 ml-4 mr-4 px-6 py-3 border-b-2 border-black`}
        placeholder={placeholder}
        onChangeText={(text) => onChangeHandle(text)}
        secureTextEntry={false}
        multiline={false}
        keyboardType={"numeric"}
        value={value}
        />
    )
}