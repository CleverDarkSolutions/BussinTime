import {Text, SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios'
import {Elements} from '@stripe/react-stripe-js'

import tw from 'twrnc'

import LargeButtonArrow from '../../components/LargeButtonArrow'
import { useSession } from '../SessionContext'
import { PAYMENT_API_URL, PRICE } from '../../../utils/const'

export default function CreditCard({navigation}){
    const stripePromise = loadStripe('pk_test_51OM6cBH2vserwmCOcvH9XTV3XXE4D5JKzwuVQr7R1clQrrkkfVgz9XxR8RkxVHnhrjPmZQFzzvbZpwRU9KSjg1JW00C1zoqOcv');
    const {state} = useSession()
    const [clientSecret, setClientSecret] = useState('')
    useEffect(() => {
        const handlePaymentIntent = async () => {
            try {
              const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
              }
              const response = await axios.post(`${PAYMENT_API_URL}/create-payment-intent`, 
              {amount: PRICE, currency: 'usd' }, {headers});
        
              const data = await response.data;
              setClientSecret(data.client_secret);
              console.log(data.client_secret)
            } catch (error) {
              console.error('Error creating PaymentIntent:', error);
            }
        };
        handlePaymentIntent();
    },[])
    const handleCredit = () => {
        navigation.navigate('CreditCardConfirm', {clientSecret, stripePromise})
    }
    return(
        <SafeAreaView style={tw`flex-1 items-center justify-center `}>
            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{clientSecret: clientSecret}}>
                <View style={tw`w-100% bg-blue-300`} >
                    <Text style={tw`bg-yellow-400`} >PREMIUM {PRICE/100}$</Text>
                    <LargeButtonArrow active={true} text={"Mock"} nav={handleCredit} />
                </View>
              </Elements>
            )}
        </SafeAreaView>
    );
}