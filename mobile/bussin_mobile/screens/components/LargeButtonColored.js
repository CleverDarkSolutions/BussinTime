import { useState } from "react"
import { TouchableOpacity, Text, SafeAreaView } from "react-native"

import tw from 'twrnc'
import { GREEN, SLATE } from "../../utils/colors"

export default function LargeButtonColored({nav, text, active, color}){
    if(color == null){
        throw new Error("LargeButtonCollored reqire color")
    }
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
    }
    const bgColor = active ? bcolor : tw`bg-${SLATE}`
    return(
        <TouchableOpacity disabled={!active} style={[tw`flex-row py-3 mx-7 rounded-xl mb-4`, bgColor]} onPress={handleClick}>
            <Text style={tw`text-white text-xl font-bold text-center flex-1`}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}