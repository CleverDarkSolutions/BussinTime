import {Text, SafeAreaView, View } from 'react-native'
import React, { useState } from 'react'

import tw from 'twrnc'

import LargeButtonArrow from '../../components/LargeButtonArrow'
import { useSession } from '../SessionContext'

export default function Payment({navigation}){
    const {state} = useSession()

    const handleSubscription = () => {
        console.log("handleSubscription!")
    }
    return(
        <SafeAreaView style={tw`flex-1 items-center justify-center `}>
            <LargeButtonArrow active={true} text={"Credit Card"} nav={() => navigation.navigate('CreditCard')} />
            <LargeButtonArrow active={true} text={"Subscription"} nav={handleSubscription} />
        </SafeAreaView>
    );
}