import { View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useSession } from '../../app/SessionContext'

import tw from 'twrnc'
import MainTitle from '../../components/Title'
import InputField from '../../components/InputField'
import Popup from '../../components/Popup'
import LargeButton from '../../components/LargeButton'
import CheckBox from '../../components/CheckBox'
import { showAlert } from '../../components/CustomAlert'

const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

export default function TwoSignUp({navigation}){
    const {dispatch} = useSession();
    const {state} = useSession();

    const [modal, setModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("Default problem")
    
    const closeModal = () => {setModal(false)}
    const openModal = () => {setModal(true)}

    const [name, setName] = useState(state.user.name === undefined ? "" : state.user.name)
    const [age, setAge] = useState(state.user.age)
    const [city, setCity] = useState(state.user.city)
    const [activeButton, setActiveButton] = useState(state.user.gender == "MALE" ? true : false)

    const handleNameChange = (text) => {
        const selectedSex = isMale || isFemale
        setName(text)
        if(name.length >= 2 && (age != 0) && selectedSex) setActiveButton(true)
    }
    const handleCityChange = (text) => {
        const selectedSex = isMale || isFemale
        setCity(text)
        if(name.length >= 2 &&
            (age != 0) &&
            selectedSex) setActiveButton(true)
    }
    const handleAgeChange = (text) => {
        const selectedSex = isMale || isFemale
        const numericInput = text.replace(/[^0-9]/g, '')
        setAge(numericInput)
        if(name.length >= 2 && (age != 0) && selectedSex) setActiveButton(true)
    }
    const handleButton = async () => {
        const result = await geocoder.search( { q: city } )
        if(city === ''){
            showAlert("Can not continue", "City form can not be empty")
        }
        else if (result.length === 0){
            showAlert("Can not continue", "Name of the city is unknown")
        }else if(age < 16){
            showAlert("Can not continue", "Your age should be greater than 16")
        } else if(age > 150){
            showAlert("Can not continue", "You should provide resonable age (below 150)")
        } else{
            console.log(result[0].name)
            const tempUser = {
                ...state.user,
                city: result[0].name,
                name: name,
                age: age,
                gender: gender
            }
            dispatch({type: 'SET_USER', payload: tempUser})
            navigation.navigate('ThreeSignUp')
        }
    }

    const [isMale, setMale] = useState(state.user.gender == "MALE");
    const [isFemale, setFemale] = useState(state.user.gender == "FEMALE");
    const [gender, setGender] = useState('MALE');

    const handleMale = () => {
        setMale(true);
        setFemale(false);
        setGender('MALE')
        if(name.length >= 2 && (age != 0)) setActiveButton(true)
    }
    const handleFemale = () => {
        setFemale(true);
        setMale(false);
        setGender('FEMALE')
        if(name.length >= 2 && (age != 0)) setActiveButton(true)
    }

    return(
        <SafeAreaView style={tw`flex-1`}>
            <MainTitle 
            content="Step TWO" 
            description="Good! Now we need some details..."
            />
            <Popup visible={modal} onClose={closeModal} text={modalMessage}/>
            <View style={tw`mb-4`}>
              <InputField placeholder={"Name"} onChangeHandle={handleNameChange} value={name}/>
              <InputField placeholder={"City"} onChangeHandle={handleCityChange} value={city}/>
              <InputField placeholder={"Age"} onChangeHandle={handleAgeChange} numeric={true} value={age} />
              <View style={tw`flex-row justify-center mb-10`} >
                <View style={tw`w-50% justify-center`} >
                    <CheckBox text="Male" isClicked={isMale} onPress={handleMale}/>
                </View>
                <View style={tw`w-50% justify-center `} >
                    <CheckBox text="Female" isClicked={isFemale} onPress={handleFemale}/>
                </View>
              </View>
              <LargeButton active={activeButton} text="Continue" nav={handleButton}/>
            </View>
        </SafeAreaView>
    )
}