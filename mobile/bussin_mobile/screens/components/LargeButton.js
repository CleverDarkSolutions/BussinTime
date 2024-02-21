import { useState } from "react"
import { TouchableOpacity, Text, SafeAreaView } from "react-native"

import tw from 'twrnc'
import { SLATE } from "../../utils/colors"

export default function LargeButton({nav, text, active}){
    if(text == ''){
        throw new Error('LargeButton must conteina text value')
    }else if(nav == null){
        throw new Error('LargeButton must do something! nav={() => {}} required in nav field')
    }
    const handleClick = () => {
        nav()
    }
    const bgColor = active ? tw`bg-black` : tw`bg-${SLATE}`
    return(
        <TouchableOpacity disabled={!active} style={[tw`flex-row py-3 mx-7 rounded-xl mb-4`, bgColor]} onPress={handleClick}>
            <Text style={tw`text-white text-xl font-bold text-center flex-1`}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}