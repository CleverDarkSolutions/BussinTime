import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

import tw from 'twrnc'

export default function LoadingComponent({textSize=8, imageSize=45, text="Loading...", showImage=true}){
    return (
        <View style={tw`flex-row`} >
            {showImage ? 
            <MaterialIcons style={tw`mr-4`} name="cloud-download" size={imageSize} color="black" />
            : <Text></Text>}
            <Text style={tw`text-${textSize}`} >{text}</Text>
        </View>
    )
}