import { View, SafeAreaView, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import React, { useState } from 'react'

import tw from 'twrnc'
import MainTitle from '../../components/Title'
import InputField from '../../components/InputField'
import Popup from '../../components/Popup'
import LargeButton from '../../components/LargeButton'

// TO REPAIR

export default function ThreeSignUp({navigation}) {
    const [buttonContent, setButtonContent] = useState("Skip")
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImagePicker = () => {
        const options = {
            title: "Avatar",
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        }
        // Tu sie psuje
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
      
              setSelectedImage(source);
            }
        });
        if(selectedImage != null) setButtonContent("Continue")
    }

    const handleButton = () => {
        navigation.navigate('FourSignUp')
    }

    return(
        <SafeAreaView style={tw`flex-1`}>
            <MainTitle content="Step THREE" description="Upload your photo. NOT REQUIRED"/>
            <LargeButton text="Upload Photo" nav={handleImagePicker} />
            <Image source={selectedImage} style={tw`w-48 h-48 mt-4`}/>
            <LargeButton active={true} text={buttonContent} nav={handleButton}/>
        </SafeAreaView>
    )
}