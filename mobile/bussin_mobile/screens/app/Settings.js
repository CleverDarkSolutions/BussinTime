import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'

import tw from 'twrnc'

import LargeButtonArrow from '../components/LargeButtonArrow'
import { useSession } from './SessionContext'
import NavBar from '../components/NavBar'

// items-center

export default function Settings({navigation}){
    const {dispatch} = useSession();
    const profileSettingsHandle = () =>{navigation.navigate('ProfileSettings')}
    const privacyHandle         = () =>{navigation.navigate('Privacy')}
    const paymentHandle         = () =>{navigation.navigate('Payment')}
    const termsOfUseHandle      = () => {navigation.navigate('TermsOfUse')}
    const cotactUsHandle        = () => {navigation.navigate('ContactUs')}
    const logOutHandle          = () => {
        dispatch({type: 'RESET_SESSION'})
        navigation.navigate('Welcome')
    }
    const deleteAccountHandle   = () => {navigation.navigate('DeleteAccount')}
    return(
        <SafeAreaView style={tw`flex-col h-full `}>
            <View style={tw`w-100% bg-white h-6`} />
            <SafeAreaView style={tw`flex-5  justify-center`}>
                <LargeButtonArrow text={"Profile Settings"} nav={profileSettingsHandle} active={true}/>
                <LargeButtonArrow text={"Privacy"} nav={privacyHandle} active={true}/>
                <LargeButtonArrow text={"Payment"} nav={paymentHandle} active={true}/>
                <LargeButtonArrow text={"Terms Of Use"} nav={termsOfUseHandle} active={true}/>
                <LargeButtonArrow text={"Contact Us"} nav={cotactUsHandle} active={true}/>
                <LargeButtonArrow text={"Log Out"} nav={logOutHandle} active={true}/>
                <LargeButtonArrow text={"Delete Account"} nav={deleteAccountHandle} active={true}/>
            </SafeAreaView>
            <NavBar navigation={navigation}/>
        </SafeAreaView>
    );
}