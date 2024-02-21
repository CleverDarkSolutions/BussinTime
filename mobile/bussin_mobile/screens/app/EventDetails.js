import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 
import { useFocusEffect } from '@react-navigation/native';

import tw from 'twrnc'
import axios from 'axios';
import { API_URL, EMOTE } from '../../utils/const';
import LoadingComponent from '../components/LoadingComponent';
import NavBar from '../components/NavBar';
import { useSession } from './SessionContext';
import { showAlert } from '../components/CustomAlert';
import LargeButtonArrow from '../components/LargeButtonArrow';
import { showConfirmation } from '../components/CustomConfirmation';
import TopHeader from '../components/TopHeader';
import { GREEN, RED } from '../../utils/colors';

export default function EventDetails({route, navigation}){
    const {state} = useSession()
    const [eventDetails, setEventDetails] = useState({})
    const [participants, setParticipants] = useState()
    const [posts, setPosts] = useState([])
    const [loading, setLoadning] = useState(true)
    const [isOwner, setIsOwner] = useState(false)

    const [isPartycypant, setIsParticipant] = useState(true)
    
    useFocusEffect(
        React.useCallback(() => {
            refPost()
            refParticipants()
            checkIfParticipant()
            fetchData()
            return () => {console.log("Unfocuse")}
        }, [])
    )

    const refPost = () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        axios.get(`${API_URL}/post/getPostsByEvent/${route.params.id}`, {headers})
        .then((res) => {
            console.log(res.data)
            setPosts(res.data)
        })
        .catch((error) => {console.log(error)})
    }
    const fetchData = async () => {
        try{
            const headers = {
                'Authorization': `Bearer ${state.token}`,
                'Content-Type': 'application/json',
            }
            const result = await axios.get(`${API_URL}/event/host/${route.params.id}`, {headers})
            setEventDetails(result.data)
            console.log("Is owner? ", state.user.username === result.data.host.username)
            setIsOwner(state.user.username === result.data.host.username)
            console.log(result.data)
        } catch(error){
            console.log(error)
        } finally {
            setLoadning(false)
        }
    }
    useEffect(() => {
        refParticipants()
        refPost()
        checkIfParticipant()
        fetchData()
    },[])
    const checkIfParticipant = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.get(`${API_URL}/event/isParticipating/${state.user.id}/${route.params.id}`, {headers})
        .then((res) => {
            console.log("Is part?: ", res.data)
            setIsParticipant(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    const refParticipants = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.get(`${API_URL}/event/getEventParticipants/${route.params.id}`, {headers})
        .then((res) => {
            console.log("lenght ", res.data.length)
            setParticipants(res.data.length)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    const handleUserList = () => {navigation.navigate('EventUsersList', {
        id: route.params.id,
        owner: isOwner
    })}
    const handleQuitGuard = () => {
        showConfirmation(
            "Quit event?",
            "Do you really want to quit this event?",
            "YES", handleQuitEvent, "NO")
    }

    const handleQuitEvent = async () => {
        console.log("User Id: ", state.user.id)
        console.log("Event Id: ", route.params.id)
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.delete(`${API_URL}/event/removeFromEvent/${route.params.id}/${state.user.id}`, {headers})
        .then((res)=> {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
        refParticipants()
        checkIfParticipant()
    }
    const handleJoinEvent = async () => {
        console.log("User Id: ", state.user.id)
        console.log("Event Id: ", route.params.id)
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.post(`${API_URL}/event/requestToJoinEvent?eventId=${route.params.id}&requesterId=${state.user.id}`, {headers})
        .then((res) => {
            showAlert("Request sended", "Wait for the answer!")
        })
        .catch((error) => {console.log(error)})
        refParticipants()
        checkIfParticipant()
    }
    return (
        <SafeAreaView style={tw`h-100%`}>
            {loading ? 
                <View style={tw`flex-1 justify-center items-center`}>
                    <LoadingComponent />
                </View> : 
            <View>
                <TopHeader title={eventDetails.event.name} navigation={navigation} />
                <ScrollView style={tw`h-72%`}>
                    <Detail title={"Author: " + (isOwner ? "YOU" : eventDetails.host.username)} icon={"person"} />
                    <Detail title={"Time: " + eventDetails.event.endDate} icon={"access-time"} />
                    <Detail title={"Descr.: " + eventDetails.event.description} icon={"description"} />
                    <Detail title={"Place:  " + eventDetails.event.localization.city} icon={"location-on"} />
                    <TouchableOpacity style={tw`flex-row bg-white rounded-xl shadow-md ml-4 mt-5 items-start justify-center w-90%`} 
                    onPress={handleUserList}
                    >
                        <View style={tw`flex-row p-2 mr-3`} >
                            <MaterialIcons name={"people-alt"} size={50} color="black" />
                            <Text style={tw`ml-3 text-5`} >{"Accepted people: " + participants}</Text>
                        </View>
                    </TouchableOpacity>
                    <PrivateParty isPrivate={eventDetails.event.eventVisibility==="PRIVATE"} />
                    <View style={tw`flex-row justify-center items-center mt-6`} >
                        <Text style={tw`text-7`} >Posts</Text>
                    </View>
                    <View>
                        {posts.length == 0 ? 
                        <View style={tw`flex-row justify-center items-center mt-6 mb-6`} >
                            <Text style={tw`text-5 text-gray-400`} >This event has no posts</Text>
                        </View> 
                        :
                            <View>
                                {posts.map((value, key) => (
                                    <TouchableDetail 
                                    refresh={refPost}
                                    owner={isOwner}
                                    key={key} 
                                    navigation={navigation}
                                    jsonData={value} 
                                    icon={"bookmark-border"} />
                                ))}
                            </View> 
                        }
                    </View>
                    <View style={tw`flex-row h-30 mt-5 items-start justify-center`}>
                        <ImageIcon 
                        active={!isOwner}
                        name={isPartycypant ? "close" : "add"} 
                        subText={isPartycypant ? "Quit Event" : "Join Event"} 
                        onPress={isPartycypant ? handleQuitGuard : handleJoinEvent} />
                        {isOwner || isPartycypant ?
                        <ImageIcon 
                        onPress={() => navigation.navigate('InviteFriends', {id: route.params.id})}
                        name={"people-alt"} 
                        subText={"Invite"} /> : 
                        <View/>
                        }
                        <ImageIcon 
                        name={"post-add"} subText={"Add Post"} 
                        onPress={() => {isPartycypant ? navigation.navigate('AddPost',{id: eventDetails.event.id,title: eventDetails.event.name}) : showAlert("Cant insert Post", "You have to be part of the event")}} />
                    </View>
                    {isOwner ?  <LargeButtonArrow active={true} text={"Edit Event"} nav={() => navigation.navigate('EditEvents', {id: route.params.id})} /> :
                    <View/>}
                </ScrollView>
                <NavBar navigation={navigation}/>
            </View>
            }
        </SafeAreaView>
    );
}
const PrivateParty = ({isPrivate}) => {
    return(
        <View style={tw`items-center justify-center`} >
            <View 
            style={tw`flex-row w-92% h-16 py-3 mx-7 rounded-xl mt-4 mb-4 shadow-md ${isPrivate ? `bg-` + RED : `bg-` + GREEN} items-center justify-center`}
            >
                <Text style={tw`text-5 font-bold text-white mr-2`}>Visibility: {isPrivate ? "Private" : "Public"}</Text>
                <MaterialIcons name={isPrivate ? "visibility-off" : "visibility"} size={24} color="white" />
            </View>
            {isPrivate ? 
                <Text>You have to invite perticipants manually</Text> : 
                <View/>
            }
        </View>
    )
}
// -----------------------------------------------------------------------------------------------
function TouchableDetail({icon, jsonData, navigation, owner=false, refresh}){
    const {state} = useSession()
    const [postOwner, setPostOwner] = useState(null)
    const handleDeleteTrhread = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.delete(`${API_URL}/post/${jsonData.id}`, {headers})
        .then((res) => {console.log(res.data)})
        .catch((error) => {console.log(error.data); showAlert("Cant delete", "It may be some problems with data base!")})
        refresh()
    }
    const hanlePost = () => {
        navigation.navigate('PostDetails', {
            id: jsonData.id, 
            title: jsonData.title, 
            content: jsonData.content,
        })
    }
    const [reactions, setReactions] = useState([])
    const fetchReactions = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.get(`${API_URL}/reaction/getReactionCountsByEntity/${jsonData.id}?reactionEntityType=POST`, {headers})
        .then((res) => {setReactions(res.data)})
        .catch((error) => console.log(error))
    }
    useEffect (() => {
        const getOwner = async () => {
            try{
                const headers = {
                    'Authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/json',
                }
                const response = await axios.get(`${API_URL}/account/${jsonData.posterId.id}`, {headers})
                setPostOwner(response.data.username)
            } catch(error){console.log(error)}
        }
        fetchReactions()
        getOwner()
    }, [])
    const [showReaction, setShowReaction] = useState(false)
    const imagePacher = (emote) => {
        switch(emote){
            case EMOTE.shocked : return "favorite-border";
            case EMOTE.happy : return "thumb-up-off-alt";
            case EMOTE.sad : return "check";
            case EMOTE.angry : return "star-border";
            default: return "unknown"
        }
    }
    return (
        <View>
            <View style={tw`flex-row justify-between mt-5 ${(owner || jsonData.posterId.id === state.user.id) ? `w-76%` : `w-90%`}`}>
                {(owner || jsonData.posterId.id === state.user.id)? 
                <View style={tw`flex-col justify-center items-center ml-2 w-12`}>
                    <TouchableOpacity 
                    style={tw`justify-center items-center w-12`} 
                    onPress={
                        () => showConfirmation(
                        "Delete post?", 
                        "Do you want to delete this thread?",
                        "YES", handleDeleteTrhread)}
                    >
                        <MaterialIcons name={"close"} size={50} color="red" />
                    </TouchableOpacity> 
                    <TouchableOpacity 
                    style={tw`justify-center items-center w-12`} 
                    onPress={() => {navigation.navigate('EditPost', {post: jsonData})}}
                    >
                        <MaterialIcons name={"edit"} size={50} color="black" />
                    </TouchableOpacity> 
                </View>: 
                <View/>}
                <TouchableOpacity 
                onPress={hanlePost} 
                style={tw`bg-white rounded-xl shadow-md ml-4 w-100%`} >
                    <View style={tw`flex-col`}>
                        <View style={tw`flex-row p-2 mr-3 items-center`}>
                            <MaterialIcons name={icon} size={50} color="black" />
                            <Text style={tw`ml-3 text-6`} >{jsonData.title}</Text>
                        </View>
                        <View style={tw`ml-5`}>
                            <Text style={tw`text-4`} >{"Author: " + postOwner}</Text>
                        </View>
                        <View style={tw` p-2`} >
                            <Text style={tw`ml-3 text-4`} >Description: {jsonData.content}</Text>
                            <Text style={tw`ml-3 text-4 text-gray-500 `} >{jsonData.creationDate}</Text>
                            <View style={tw`flex-row`}>
                                {reactions.map((element, key) => (
                                    <View key={key} style={tw`items-start text-4 `}>
                                        <ReactionComponentView image={imagePacher(element.reactionType)} count={element.count} />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={tw`flex-row ml-17 mt-2 items-center`} onPress={() => setShowReaction(!showReaction)} >
                <MaterialIcons name={showReaction ? "remove-circle" : "add-circle"} size={30} color="black" />
                <Text style={tw`text-6`} >Reaction</Text>
            </TouchableOpacity>
            {showReaction ? 
            <View style={tw`flex-row ml-14 mt-2 items-center`} >
                <ReactionComponent image={"favorite-border"} payload={EMOTE.shocked} postId={jsonData.id} refresh={refresh} fetchReact={fetchReactions} />
                <ReactionComponent image={"check"} payload={EMOTE.sad} postId={jsonData.id} refresh={refresh} fetchReact={fetchReactions} />
                <ReactionComponent image={"thumb-up-off-alt"} payload={EMOTE.happy} postId={jsonData.id} refresh={refresh} fetchReact={fetchReactions} />
                <ReactionComponent image={"star-border"} payload={EMOTE.angry} postId={jsonData.id} refresh={refresh} fetchReact={fetchReactions} />
            </View>
            :<View/>}
        </View>
    )
}
const ReactionComponent = ({image, payload, postId, refresh, fetchReact}) => {
    const {state} = useSession()
    const handlePress = async () => {
        const headers = {
            'Authorization': `Bearer ${state.token}`,
            'Content-Type': 'application/json',
        }
        await axios.post(`${API_URL}/reaction?reactionEntityType=POST&reactionType=${payload}&accountId=${state.user.id}&entityId=${postId}`, {headers})
        .then((res) => {
            console.log(payload)
            console.log(res.data)
            fetchReact()
        }).catch((error) => {console.log(error)})
        refresh()
    }
    return(
        <View>
            <TouchableOpacity style={tw`ml-3 p-1 bg-white shadow-md rounded-3xl`} onPress={handlePress} >
                <MaterialIcons name={image} size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}
const ReactionComponentView = ({image, count}) => {
    return(
        <View>
            <View style={tw`flex-row ml-3 p-1 bg-white shadow-md rounded-3xl`}>
                <MaterialIcons name={image} size={30} color="black" />
                {count === 1 ? <View/> : 
                <Text style={tw`text-5`} >{count}</Text>
                }
            </View>
        </View>
    )
}
// ------------------------------------------------------------------------------------------------
function Detail({title, icon}){
    return (
        <View style={tw`flex-row mt-5 items-start justify-center`} >
            <View style={tw`flex-row bg-white rounded-xl shadow-md items-center p-2 mr-3 w-90%`}>
                <MaterialIcons name={icon} size={50} color="black" />
                <Text style={tw`ml-3 text-5 w-90%`} >{title}</Text>
            </View>
        </View>
    )
}

function ImageIcon({name, subText, onPress, active=true}){
    const isActive = active ? tw`text-black` : tw`text-gray-500`
    return(
        <TouchableOpacity 
        disabled={!active}
         onPress={onPress} style={tw`bg-white rounded-xl shadow-md items-center p-2 mr-3 w-25%`} >
            <MaterialIcons name={name} size={50} color={active ? "black" : "gray"} />
            <Text style={[tw`text-4`, isActive]} >
                {subText}
            </Text>
        </TouchableOpacity>
    )
}