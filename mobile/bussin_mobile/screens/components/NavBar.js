import { View } from 'react-native'
import React, { useEffect, useState } from 'react'

import tw from 'twrnc'

import NavIcon from './NavIcon'
import axios from 'axios'
import { useSession } from '../app/SessionContext'
import { API_URL } from '../../utils/const'
import { useFocusEffect } from '@react-navigation/native'

export default function NavBar({navigation}){
    const {state} = useSession()
    const [data, setData] = useState(0)
    const headers = {
        'Authorization': `Bearer ${state.token}`,
        'Content-Type': 'application/json',
    }
    const fetchData = async () => {
        await axios.get(`${API_URL}/notification/${state.user.id}`, {headers})
        .then((res) => setData(res.data.length))
        .catch(error => console.error(error))
    }
    useFocusEffect(
        React.useCallback(() => {
            fetchData()
            return () => {console.log("Closing my events")}
        }, [])
    )
    
    useEffect(() => {
        fetchData()
    },[])
    const homeHandle = () =>{navigation.navigate('StartScreen')}
    const eventHandle = () =>{navigation.navigate('EventScreen')}
    const searchHandle = () =>{navigation.navigate('Notification')}
    const addEventHandle = () =>{navigation.navigate('AddEvent')}
    const settingsHanlde = () => {navigation.navigate('Settings')}
    return (
        <View style={tw`flex-row bg-white items-start justify-center`}>
            <NavIcon image={"home"} action={homeHandle}/>
            <NavIcon image={"event"} action={eventHandle}/>
            <NavIcon image={"add-circle-outline"} action={addEventHandle}/>
            <NavIcon image={data === 0 ? "notifications" : "notification-important" } action={searchHandle}/>
            <NavIcon image={"settings"} action={settingsHanlde}/>
        </View>
    )
}