import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import MainTitle from '../components/Title'

import tw from 'twrnc'
import LargeButton from '../components/LargeButton'

export default function SignUp({navigation}) {
  const handleGoogle = () => {
    console.log("Google")
  }
  const handleEmail = () => {
    navigation.navigate('OneSignUp')
  }
  return (
    <SafeAreaView style={tw`flex-1`}>
      <MainTitle 
      content="Create a new account" 
      description="We are happy you want to join us!"
      />
      {/* <LargeButton active={true} text="Continue with Google" nav={handleGoogle}/> */}
      <LargeButton active={true} text="Continue with Email" nav={handleEmail}/>
    </SafeAreaView>
  )
}