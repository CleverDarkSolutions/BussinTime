import { View, Text, SafeAreaView, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import { useSession } from './SessionContext'

import tw from 'twrnc'

import NavBar from '../components/NavBar'
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import { API_URL} from '../../utils/const';
import EventTile from '../components/EventTile';
import { useFocusEffect } from '@react-navigation/native';

export default function MyEvents({navigation}){
    const [loading, setLoading] = useState(true)
    const {state} = useSession()
    const [data, setData] = useState([])
    useFocusEffect(
        React.useCallback(() => {
            fetchData()
            return () => {console.log("Closing my events")}
        }, [])
    )
    const fetchData = async () => {
        try{
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            const result = await axios.get(`${API_URL}/event/getEventsWhereAccountIsHost/${state.user.id}?accountEventStatus=HOST`, {headers})
            setData(result.data)
        } catch(error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return(
        <SafeAreaView style={tw`flex-1`}>
            <SafeAreaView style={tw`flex-col h-full`}>
                <View style={tw`flex-5 items-center justify-center mt-8`}>
                    {loading ? 
                    <LoadingComponent /> : 
                    data.length == 0 ? 
                    <LoadingComponent 
                    text="You dont have any Events" 
                    textSize={6} 
                    showImage={false} /> :
                    <ScrollView>
                        {data.map((value, key) =>(
                            <EventTile 
                            navigation={navigation}
                            id={value.id}
                            owner={true}
                            key={key}
                            starts={value.endDate}
                            active={value.isActive}
                            name={value.name}
                            city={value.localization.city} />
                        ))}
                    </ScrollView>
                    }
                </View>
            <NavBar navigation={navigation}/>
            </SafeAreaView>
        </SafeAreaView>
    )
}