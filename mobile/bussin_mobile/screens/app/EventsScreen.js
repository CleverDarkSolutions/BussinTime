import { View, Text, SafeAreaView, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import { useSession } from './SessionContext'

import tw from 'twrnc'

import NavBar from '../components/NavBar'

export default function EventScreen({navigation}){
    const handleYourEvents      = () =>{navigation.navigate('MyEvents')}
    const handleEventsYouAreIn  = () =>{navigation.navigate("EventsParticipating")}
    const handleFindEvents      = () =>{navigation.navigate('EventList')}
    const handleFriends         = () =>{navigation.navigate('UserFriends')}
    return(
        <SafeAreaView style={tw`flex-1`}>
            <SafeAreaView style={tw`flex-col h-full`}>
                <View style={tw`flex-5 items-center justify-center mt-8`}>
                    <View style={tw`flex-row items-center justify-center mt-8`}>
                        <LargeTile 
                        image={"event-available"}
                        title={"Your events"} navigation={handleYourEvents} />
                        <LargeTile 
                        image={"person-add"}
                        title={"Events you are in"} navigation={handleEventsYouAreIn}/>
                    </View>
                    <View style={tw`flex-row items-center justify-center`}>
                        <LargeTile 
                        image={"search"}
                        title={"Find events"} navigation={handleFindEvents} />
                        <LargeTile 
                        image={"people-alt"}
                        title={"Friens"} navigation={handleFriends} />
                    </View>
                </View>
            <NavBar navigation={navigation}/>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const LargeTile = ({title, image, navigation}) => {
    const IMAGE_SIZE = 60;
    return(
        <TouchableOpacity style={tw`w-30% p-5 m-4 rounded-xl mb-4 shadow-md bg-white items-center`} 
        onPress={navigation} >
            <MaterialIcons name={image} size={IMAGE_SIZE} color="black" />
            <Text style={tw`text-4 text-center`} >{title}</Text>
        </TouchableOpacity>
    )
}