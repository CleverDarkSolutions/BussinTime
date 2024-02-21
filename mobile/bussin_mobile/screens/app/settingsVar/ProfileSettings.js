import { SafeAreaView } from 'react-native'
import React from 'react'

import tw from 'twrnc'

import EditUserProfile from '../../components/EditUserProfile'

export default function ProfileSettings({navigation}){
    return (
        <SafeAreaView style={tw`flex-1 items-center`}>
            <EditUserProfile navigation={navigation} />
        </SafeAreaView>
    );
}