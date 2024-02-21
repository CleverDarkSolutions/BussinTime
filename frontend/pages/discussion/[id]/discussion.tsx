'use client'
import '@/styles/globals.css'
import {Provider} from 'react-redux';
import {reduxStore} from '@/utils/store';
import IsAuth from '@/utils/isAuth';
import {SiteHeader} from '@/components/custom/global/site-header';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import EventDetailsContent from '@/components/custom/home/event-details/event-details-content';
import {Event, EventNewApi} from '@/types/event'
import {Post, PostNewApi} from '@/types/post';
import axios from 'axios';
import UserPost from '@/components/custom/discussion/post/user-post';
import {Separator} from '@/components/ui/separator';
import {ScrollArea} from '@/components/ui/scroll-area';
import ListOfUsersContainer from '@/components/custom/discussion/list-of-users/list-of-users-container';
import ChatTab from '@/components/custom/global/chat-tab';
import {Toaster} from '@/components/ui/toaster';
import AddNewPost from '@/components/custom/discussion/post/add-new-post';
import {Button} from '@/components/ui/button';
import {DeleteForever, Edit, Logout} from '@mui/icons-material';
import EditEvent from '@/components/custom/discussion/event/edit-event';
import {useToast} from '@/components/ui/use-toast';
import DeleteEvent from '@/components/custom/discussion/event/delete-event';
import LeaveEvent from '@/components/custom/discussion/event/leave-event';
import {API_URL} from '@/lib/constants';
import NetworkErrorCheck from '@/utils/network-error/NetworkErrorCheck';
import ProvidersCombined from '@/utils/ProvidersCombined';
import IsAuthEvent from '@/utils/isAuthEvent';
import {UserNewApi} from '@/types/auth';
import {Input} from '@/components/ui/input';
import InviteListButton from '@/components/custom/discussion/event/invite/invite-list-button';

const Discussion = ({ params }: any) => {
  const {toast} = useToast();
  const router = useRouter();
  const eventId = useParams()?.id;
  console.log(eventId)
  const [event, setEvent] = useState<EventNewApi>();
  const [posts, setPosts] = useState<PostNewApi[]>();
  const userId = localStorage.getItem('userId');
  const [host, setHost] = useState<UserNewApi>();
  const [loaded, setLoaded] = useState<Boolean>();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if(event !== undefined) {
      axios.get(`${API_URL}/event/host/${event?.id}`)
        .then((res) => {
          setHost(res.data.host)
          console.log(res.data)
        })
    }
  }, [event])

  useEffect( () => {
    if(eventId !== undefined && userId !== undefined)
      axios.get(`${API_URL}/event/getEventParticipants/${eventId}`)
        .then( (res) => {
          if(!res.data.find( (user: UserNewApi) => user.id === parseInt(userId!))){
            router.push('/home')
          }
          else{
            setLoaded(true)
          }
        })
  },[eventId, userId])

  useEffect(() => {
    if(eventId !== undefined) {
      axios.get(`${API_URL}/event/${eventId}`)
        .then((res) => {
          setEvent(res.data)
        })
    }
  }, [eventId])

  useEffect(() => {
    if(eventId !== undefined) {
      axios.get(`${API_URL}/post/getPostsByEvent/${eventId}`)
        .then((res) => {
          setPosts(res.data)
          console.log(eventId)
        })
    }
  }, [eventId])

  const filteredPosts = posts?.filter((post) =>
    post.content.toLowerCase().includes(search.toLowerCase()) ||
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if(eventId !== null && loaded){
    return(
      <ProvidersCombined>
        <SiteHeader/>
        <ChatTab/>
        <div className="grid max-h-screen w-[85%] grid-cols-2 grid-rows-5 gap-4">
          <div className="row-span-3">
            <div className="grid gap-2 p-4 text-2xl">
              <div className="my-1.5">Discussion</div>
              <Separator orientation="horizontal"/>
              { event && host && (
                <div className="my-3 grid grid-cols-2">
                  <div className="col-span-1 text-xl">
                    Event actions
                  </div>
                  <div className="col-span-1">
                    <div className="grid grid-cols-6">
                      <div>
                        {host?.id === Number(userId) && <EditEvent event={event}/> }
                      </div>
                      <div>
                        {host?.id === Number(userId) && <DeleteEvent event={event}/> }
                      </div>
                      <div>
                        {host?.id !== Number(userId) && <LeaveEvent event={event}/> }
                      </div>
                      <div>
                        {host?.id === Number(userId) && <InviteListButton event={event}/> }
                      </div>
                      <div>
                        <AddNewPost event={event}/>
                      </div>
                    </div>
                  </div>
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="col-span-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              ) }
            </div>
            <ScrollArea className="h-[60vh]">
              {filteredPosts?.length === 0 && posts?.length !== 0 && (
                <div className="text-center text-2xl">No matching posts</div>
              )}
              {filteredPosts?.map((post) => {
                return (
                  <UserPost
                    event={event}
                    post={post} />
                );
              })}
              {
                posts?.length === 0 && (
                  <div className="text-center text-2xl">No posts</div>
                )
              }
            </ScrollArea>
          </div>
          { event && (
            <ScrollArea className="h-[75vh]">
              <div className="row-span-2 py-1">
                <EventDetailsContent event={event}/>
                {eventId && <ListOfUsersContainer eventId={parseInt(eventId[0])}/>}
              </div>
            </ScrollArea>
          )}
        </div>
      </ProvidersCombined>
    )
  } else {
    return(
      <div className="flex h-screen items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }
}

export default Discussion
