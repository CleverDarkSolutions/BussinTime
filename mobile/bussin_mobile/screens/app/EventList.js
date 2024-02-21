import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useSession } from './SessionContext'

import tw from 'twrnc'

import NavBar from '../components/NavBar'
import EventTile from '../components/EventTile'
import axios from 'axios'
import { API_URL } from '../../utils/const'
import LoadingComponent from '../components/LoadingComponent'
import { useFocusEffect } from '@react-navigation/native'

export default function EventList({navigation}){
    const {state} = useSession()
    const [data, setData] = useState([])
    const [loading, setLoadning] = useState(true)
    useFocusEffect(
        React.useCallback(() => {
            fetchData()
            return () => {}
        }, [])
    )
    const fetchData = async () => {
        try{
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            const result = await axios.get(`${API_URL}/event/all`, {headers})
            setData(result.data)
        } catch(error){
            console.log(error)
        } finally {
            setLoadning(false)
        }
    }
    useEffect(() => {
        fetchData()
    },[])
    return(
        <SafeAreaView style={tw`flex-1`}>
            <SafeAreaView style={tw`flex-col h-full`}>
                <View style={tw`flex-5 items-center justify-center mt-8`}>
                    {loading ? 
                    <LoadingComponent text={'List of events is empty'} /> 
                    : 
                    <ScrollView>
                        {data.map((value, key) => (
                            <EventTile
                            isPrivate={value.eventVisibility === "PRIVATE"}
                            id={value.id}
                            key={key}
                            starts={value.endDate}
                            active={value.isActive}
                            name={value.name}
                            city={value.localization.city}
                            navigation={navigation} />
                        ))}
                    </ScrollView>
                    }
                </View>
            <NavBar navigation={navigation}/>
            </SafeAreaView>
        </SafeAreaView>
    )
}