import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import tw from 'twrnc'

export default function TopHeader({title, navigation}){
    const goBack = () => {navigation.goBack()}
    return(
        <View style={tw`bg-black mt-8`}>
            <View style={tw`flex-row ml-3 p-5 items-center`}>
                <TouchableOpacity onPress={goBack} >
                    <MaterialIcons name="arrow-back-ios" size={27} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-8 text-white`}>{title}</Text>
            </View>
        </View>
    )
}