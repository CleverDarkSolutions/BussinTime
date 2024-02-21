import { View, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSession } from '../app/SessionContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

import MainTitle from '../components/Title'
import LargeButton from '../components/LargeButton'

import tw from 'twrnc'
import Popup from '../components/Popup'
import InputField from '../components/InputField'

import { API_URL } from '../../utils/const';
import { showAlert } from '../components/CustomAlert';
import ShowPassword from '../components/ShowPassword';

export default function Login({navigation}) {
  const {dispatch} = useSession()
  const {state} = useSession()

  const [userName, setUserName] = useState('');
  const [userPassword, setPassword] = useState('');
  const [buttonState, setButtonState] = useState(false)
  const [modal, setModal] = useState(false)

  const [showPassword, setShowPassword] = useState(true)

  const closeModal = () => {setModal(false)}
  const openModal = () => {setModal(true)}

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const handlePassowrdChange = (newPassword) => {
    setPassword(newPassword)
    setButtonState(emailRegex.test(userName) && userPassword.length > 5)
  }

  const handleUserChange = (newName) => {
    setUserName(newName)
    setButtonState(emailRegex.test(newName) && userPassword != userPassword.length > 5)
  }
  const handleSubmit = () => {
    const preperedData = {
      "userName": userName,
      "password": userPassword
      // "userName": "janusz",
      // "password": "123456"
    }
    axios.post(`${API_URL}/authenticate/signin`, preperedData)
    .then((res) => {
      console.log("200", res.data)
      dispatch({type: 'SET_USER', payload: res.data.account})
      dispatch({type: 'SET_TOKEN', payload: res.data.token})
      navigation.navigate('StartScreen')
    })
    .catch((error) => {
      showAlert("Cant login", error.response.data.message)
      setPassword('')
    })
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <MainTitle 
      content="Login" 
      description="Welcome back!"
      />
      <Popup visible={modal} onClose={closeModal} text={"Email or login is wrong!"}/>
      <View style={tw`mb-4`}>
        <InputField placeholder={"Email"} onChangeHandle={handleUserChange}/>
        <InputField 
        placeholder={"Password"} 
        onChangeHandle={handlePassowrdChange} 
        secure={showPassword}
        value={userPassword}
        />
        <View style={tw`justify-center items-center`} >
          <ShowPassword setShowPassword={setShowPassword} showPassword={showPassword} />
        </View>
        <LargeButton active={true} text="Next" nav={handleSubmit} />
      </View>
    </SafeAreaView>
  )
}