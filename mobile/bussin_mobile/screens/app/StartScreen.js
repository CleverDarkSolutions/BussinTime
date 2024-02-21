import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import MapViev, {Callout, Marker} from 'react-native-maps' 

import tw from 'twrnc'

import NavBar from '../components/NavBar'
import { useSession } from './SessionContext'
import LoadingComponent from '../components/LoadingComponent';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { API_URL} from '../../utils/const';

const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

export default function StartScreen({navigation}) {
    const {state} = useSession()
    const [location, setLocation] = useState({
        latitude: 50,
        longitude: 0,
        latitudeDelta: 2,
        longitudeDelta: 2
    })
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                fetchData()
                console.log("Exited map")
            }
        },[])
    )
    const fetchData = async () => {
        try{
            const result = await geocoder.search( { q: state.user.city } )
            console.log("Res: ", result[0].lat)
            console.log("Res: ", result[0].lon)
            setLocation({
                latitude: Number(result[0].lat),
                longitude: Number(result[0].lon),
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            })
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            const myApiRes = await axios.get(`${API_URL}/event/all`, {headers})
            setData(myApiRes.data)
            console.log(myApiRes.data)
        } catch(error){
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

    return(
    <SafeAreaView style={tw`flex-1`}>
        <SafeAreaView style={tw`flex-col h-full`}>
            <View style={tw`flex-5 items-center justify-center`}>
                {loading ?
                <LoadingComponent textSize={8} imageSize={45} />
                 : 
                    <MapViev 
                    style={tw`w-100% h-100%`}
                    initialRegion={location}
                    maxDelta={1}
                    moveOnMarkerPress={true}
                    showsUserLocation
                    showsMyLocationButton
                    >
                        {data.map((marker, key) => (
                            marker.visibility !== "PUBLIC" ?  
                            <Marker 
                            key={key} 
                            coordinate={{
                                id: marker.id,
                                latitudeDelta: 2,
                                longitudeDelta: 2,
                                name: marker.name,
                                latitude: marker.localization.latitude,
                                longitude: marker.localization.longitude,
                            }}
                            >
                                <InCallout 
                                marker={marker}
                                id={marker.id}  
                                navigation={navigation}
                                />
                            </Marker> :
                            <View key={key} />
                        ))}
                    </MapViev>
                }
            </View>
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    </SafeAreaView>
    )
}

function InCallout({id, navigation, marker}){
    const handlePress = () => {
        navigation.navigate('EventDetails', {id})
    }
    return(
        <Callout onPress={handlePress}>
            <View style={tw``} >
                <Text style={tw`text-4`} >
                    {marker.name +  "\n" + marker.localization.city}
                </Text>
            </View>
        </Callout>
    )
}