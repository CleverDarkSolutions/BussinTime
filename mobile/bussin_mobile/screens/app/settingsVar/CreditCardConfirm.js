import {Text, SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios'
import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'

import tw from 'twrnc'

import LargeButtonArrow from '../../components/LargeButtonArrow'
import { useSession } from '../SessionContext'
import { PAYMENT_API_URL, PRICE } from '../../../utils/const'

export default function CreditCardConfirm({route, navigation}){
    const {state} = useSession()

    return(
        <SafeAreaView style={tw`flex-1 items-center justify-center `}>
            <ElementsComponent 
            route={route}  
            stripePromise={route.params.stripePromise}
            clientSecret={route.params.clientSecret}/>
        </SafeAreaView>
    );
}

const ElementsComponent = ({ stripePromise, clientSecret, route }) => {
    return (
        <Elements 
        stripe={stripePromise} 
        options={{ clientSecret: clientSecret }}>
            <LogicComponent />
        </Elements>
    );
};

const LogicComponent = () => {
    const stripe = useStripe()
    const elements = useElements()
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const paymentElement = elements?.getElement(PaymentElement);
    
          if (paymentElement) {
            const result = await stripe?.confirmPayment({
              elements: elements,
              confirmParams: {
                return_url: 'http://localhost:3000',
            }
            })
            if (result?.error) {
              console.error(result.error.message);
            } else {
              console.log("ESSA kasiora")
            }
          }
        } catch (error) {
          console.error('Error confirming payment:', error);
          console.log(route.params.clientSecret)
        }
    };
    return(
        <View style={tw`w-100% bg-blue-300`}>
            {/* <PaymentElement /> */}
            <LargeButtonArrow active={true} nav={() => console.log("Essa")} />
            <Text>fuuuuuck</Text>
        </View>
    )
}