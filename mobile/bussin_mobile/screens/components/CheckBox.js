import { useState } from "react"
import { TouchableOpacity, Text, SafeAreaView } from "react-native"

import tw from 'twrnc'
import { SLATE } from "../../utils/colors"

export default function CheckBox({isClicked, onPress, text}) {
    const handlePress = () => {
        onPress()
    }
    const unClicked = (
        <TouchableOpacity style={tw`py-3 bg-${SLATE} mx-7 rounded-xl`} onPress={handlePress}>
            <Text style={tw`text-white text-xl font-bold text-center`}>
                {text}
            </Text>
        </TouchableOpacity>
    )
    const Clicked = (
        <TouchableOpacity style={tw` py-3 bg-black mx-7 rounded-xl`} onPress={handlePress}>
            <Text style={tw`text-white text-xl font-bold text-center`}>
                {text}
            </Text>
        </TouchableOpacity>
    )
    return(
        isClicked ? Clicked : unClicked
    )
}