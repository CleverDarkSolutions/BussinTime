import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import WelcomeScreen from './screens/welcome_page/WelcomeScreen'
import SignUp from './screens/welcome_page/SignUp'
import Login from './screens/welcome_page/Login'

import OneSignUp from './screens/welcome_page/signUp/OneSignUp'
import TwoSignUp from './screens/welcome_page/signUp/TwoSignUp'
import ThreeSignUp from './screens/welcome_page/signUp/ThreeSignUp'
import FourSignUp from './screens/welcome_page/signUp/FourSignUp'

import StartScreen from './screens/app/StartScreen'

import Settings from './screens/app/Settings'
import TermsOfUse from './screens/app/settingsVar/TermsOfUse'
import DeleteAccount from './screens/app/settingsVar/DeleteAccount'
import ProfileSettings from './screens/app/settingsVar/ProfileSettings'
import Privacy from './screens/app/settingsVar/Privacy'
import Payment from './screens/app/settingsVar/Payment'
import ContactUs from './screens/app/settingsVar/ContactUs'
import EventDetails from './screens/app/EventDetails'

import EventScreen from './screens/app/EventsScreen'
import AddEvent from './screens/app/AddEvent'
import EventList from './screens/app/EventList'
import MyEvents from './screens/app/MyEvent'
import UpdatePassword from './screens/app/settingsVar/UpdatePassword'
import EditEvent from './screens/app/EditEvents'
import CreditCard from './screens/app/settingsVar/CreditCard'
import CreditCardConfirm from './screens/app/settingsVar/CreditCardConfirm'
import EventUsersList from './screens/app/EventUsersList'
import UserDetails from './screens/app/UserDetails'
import PostDetails from './screens/app/PostDetails'
import AddPost from './screens/app/AddPost'
import EventsParticipating from './screens/app/EventsParticipating'
import EditPost from './screens/app/EditPost'
import UserFriends from './screens/app/UserFriends'
import Notification from './screens/app/Notification'
import Chat from './screens/app/Chat'
import InviteFriends from './screens/app/InviteFriend'

const Stack = createStackNavigator()

export default function AppNavigator(){
    return(
        <Stack.Navigator 
        initialRouteName='Welcome'
        screenOptions={{
            title: '',
            headerStyle:{
                backgroundColor: '#ffffff'
            },
            headerTintColor: '#000000',
            headerShown: false,
            cardStyle: {backgroundColor: '#ffffff'}
        }}
        >
            {/* Welcome section */}
            <Stack.Screen name='Welcome' component={WelcomeScreen}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: true}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown: true}}/>
            <Stack.Screen name='OneSignUp' component={OneSignUp} options={{headerShown: true}}/>
            <Stack.Screen name='TwoSignUp' component={TwoSignUp} options={{headerShown: true}}/>
            <Stack.Screen name='ThreeSignUp' component={ThreeSignUp} options={{headerShown: true}}/>
            <Stack.Screen name='FourSignUp' component={FourSignUp} options={{headerShown: true}}/>


            <Stack.Screen name='StartScreen' component={StartScreen}/>
            <Stack.Screen name='Settings' component={Settings}/>

            <Stack.Screen name='TermsOfUse' component={TermsOfUse} options={{headerShown: true, title: "Terms Of Use"}}/>
            <Stack.Screen name='DeleteAccount' component={DeleteAccount} options={{headerShown: true, title: "Delete Account"}}/>
            <Stack.Screen name='ProfileSettings' component={ProfileSettings} options={{headerShown: true, title: "Profile Settings"}}/>
            <Stack.Screen name='Privacy' component={Privacy} options={{headerShown: true, title: "Privacy"}}/>
            <Stack.Screen name='Payment' component={Payment} options={{headerShown: true, title: "Payment"}}/>
            <Stack.Screen name='ContactUs' component={ContactUs} options={{headerShown: true, title: "ContactUs"}}/>
            <Stack.Screen name='UpdatePassword' component={UpdatePassword} options={{headerShown: true, title: "Change Password"}}/>
            <Stack.Screen name='CreditCard' component={CreditCard} options={{headerShown: true, title: "Credit Card"}}/>
            <Stack.Screen name='CreditCardConfirm' component={CreditCardConfirm} options={{headerShown: true, title: "Credit Card"}}/>

            {/* Section from task bar */}
            <Stack.Screen name='AddPost' component={AddPost} options={{headerShown: false}}/>
            <Stack.Screen name='EditPost' component={EditPost} options={{headerShown: false}}/>
            <Stack.Screen name='PostDetails' component={PostDetails} options={{headerShown: false}}/>
            <Stack.Screen name='EventUsersList' component={EventUsersList} options={{headerShown: true, title: "Participants"}}/>
            <Stack.Screen name='EventsParticipating' component={EventsParticipating} options={{headerShown: true, title: "Accepted on events"}}/>
            
            <Stack.Screen name='EventDetails' component={EventDetails}/>
            <Stack.Screen name='EditEvents' component={EditEvent}/>
            <Stack.Screen name='UserDetails' component={UserDetails} options={{headerShown: true, title: "User Details"}}/>
            <Stack.Screen name='UserFriends' component={UserFriends} options={{headerShown: true, title: "Your friendlist"}}/>

            <Stack.Screen name='EventScreen' component={EventScreen}/>
            <Stack.Screen name='MyEvents' component={MyEvents} options={{headerShown: true, title: "Your events"}}/>
            <Stack.Screen name='EventList' component={EventList} options={{headerShown: true, title: "Find event you like!"}}/>
            <Stack.Screen name='AddEvent' component={AddEvent}/>
            <Stack.Screen name='Notification' component={Notification} options={{headerShown: true, title: "Your notifications"}}/>
            <Stack.Screen name='Chat' component={Chat}/>
            <Stack.Screen name='InviteFriends' component={InviteFriends} options={{headerShown: true, title: "Invite fiends to event"}}/>
        </Stack.Navigator>
    )
}