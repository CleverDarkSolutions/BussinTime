import { useState } from "react"
import { TouchableOpacity, Text, SafeAreaView } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'
import { GREEN, RED, SLATE } from "../../utils/colors";

export default function LargeButtonCustom({nav, text, active, color, image}){
    if(text == ''){
        throw new Error('LargeButton must conteina text value')
    }else if(nav == null){
        throw new Error('LargeButton must do something! nav={() => {}} required in nav field')
    }
    const handleClick = () => {
        nav()
    }
    let bcolor;
    switch(color){
        case "black": bcolor = tw`bg-black`; break;
        case "green": bcolor = tw`bg-${GREEN}`; break;
        case "red": bcolor = tw`bg-${RED}`; break;
    }
    const bgColor = active ? bcolor : tw`bg-${SLATE}`
    return(
        <TouchableOpacity 
        disabled={!active} 
        style={[tw`flex-row h-16 py-3 mx-7 rounded-xl mb-4 shadow-md bg-white items-center`, bgColor]} 
        onPress={handleClick}>
            <Text style={[tw`text-xl font-bold text-center flex-1 text-white`]}>
                {text}
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color={"white"} style={tw`mr-5`}/>
        </TouchableOpacity>
    );
}