import { View, Text} from 'react-native'
import React from 'react'

import tw from 'twrnc'

export default function MainTitle({content, description}){
    return(
        <View style={tw`flex-1 justify-center`}>
            <Text style={tw`text-black text-center font-bold text-4xl`}>
            {content}
            </Text>
            <Text style={tw`text-sm text-center`}>
                {description}
            </Text>
        </View>
    )
}