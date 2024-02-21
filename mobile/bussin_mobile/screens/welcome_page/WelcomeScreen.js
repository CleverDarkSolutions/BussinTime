import { View , SafeAreaView, Text} from 'react-native';

import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

import tw from 'twrnc';

import MainTitle from '../components/Title'
import LargeButton from '../components/LargeButton'
import { useSession } from '../app/SessionContext';
import LoadingComponent from '../components/LoadingComponent';

// Main screen after opening the app

export default function WelcomeScreen({ navigation }) {
  const {dispatch} = useSession();
  const [isConnected, setConnected] = useState(null)
  useEffect(() => {
    const net = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected)
    })
    return () => {
      net()
    }
  })

  const loginHandle = () => {navigation.navigate('Login')}
  return (
      <SafeAreaView style={tw`flex-1`}>
        {isConnected == null ? (
          <View style={tw`flex-1`} >
            <LoadingComponent/>
          </View>
        ) : isConnected ? (
          <SafeAreaView style={tw`flex-1 items-center justify-center`}>
            <MainTitle 
            content="BussinApp" 
            description="Meet any people you want around the globe!"/>
              <LargeButton active={true} text="Sign Up" nav={() =>{
                dispatch({type: 'RESET_SESSION'})
                navigation.navigate('SignUp')}}/>
              <LargeButton active={true} text="Log In" nav={loginHandle}/>
          </SafeAreaView>
        ) : (
          <View style={tw`flex-1 items-center justify-center`} >
            <LoadingComponent text='No internet connection' />
          </View>
        )}
      </SafeAreaView>
  );
}