import { View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useSession } from '../../app/SessionContext'

import tw from 'twrnc'
import MainTitle from '../../components/Title'
import InputField from '../../components/InputField'
import Popup from '../../components/Popup'
import LargeButton from '../../components/LargeButton'

export default function OneSignUp({navigation}){
    const {dispatch} = useSession()
    const {state} = useSession()
    const [modal, setModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("Default problem")
    const closeModal = () => {setModal(false)}
    const openModal = () => {setModal(true)}

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    // Forms controllers
    const handleEmailChange = (text) =>{setEmail(text)}
    const handlePasswordChange = (text) =>{setPassword(text)}
    const handleRepeatPasswordChange = (text) =>{setRepeatPassword(text)}

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    const handleButton = () => {
        if(!emailRegex.test(email)){
            setModalMessage("Wrong Email! \nExample: bussintime@gmail.com")
            openModal()
        } else if(password.length < 6){
            setModalMessage("Passwords must have at least 5 characters!")
            openModal()
        } else if(password != repeatPassword){
            setModalMessage("Passwords must match!")
            openModal()
        }
        else {
            const tempuser = {
                ...state.user,
                email: email,
                password: password
            }
            dispatch({type: 'SET_USER', payload: tempuser})
            navigation.navigate('TwoSignUp')
        }
    }

    return(
        <SafeAreaView style={tw`flex-1`}>
            <MainTitle 
            content="Step ONE" 
            description="Enter your email address and new password"
            />
            <Popup visible={modal} onClose={closeModal} text={modalMessage}/>
            <View style={tw`mb-4`}>
              <InputField placeholder={"Email"} onChangeHandle={handleEmailChange}/>
              <InputField placeholder={"Password"} secure={true} onChangeHandle={handlePasswordChange}/>
              <InputField placeholder={"Repeat Password"} secure={true} onChangeHandle={handleRepeatPasswordChange}/>
              <LargeButton active={true} text="Continue" nav={handleButton}/>
            </View>
        </SafeAreaView>
    )
}