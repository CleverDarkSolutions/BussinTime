'use client'
import '@/styles/globals.css'
import ProvidersCombined from '@/utils/ProvidersCombined';
import RecentActivity from '@/components/custom/profile/recent-activity';
import ProfileInfo from '@/components/custom/profile/profile-info';
import {useEffect, useState} from 'react';
import {UserNewApi} from '@/types/auth';
import axios, {AxiosError} from 'axios';
import {API_URL} from '@/lib/constants';
import {useParams} from 'next/navigation';
import {SiteHeader} from '@/components/custom/global/site-header';
import ChatTab from '@/components/custom/global/chat-tab';
import {AverageRatingType} from '@/types/event';
import {Rating} from '@mui/material';
import {useRouter} from 'next/router';

const Profile = ({params}: any) => {
  const accountId = useParams()?.id
  const [user, setUser] = useState<UserNewApi>()
  const router = useRouter()
  useEffect(() => {
    if(accountId !== undefined) {
      axios.get(`${API_URL}/account/${accountId}`)
        .then((res) => {
          setUser(res.data)
        })
        .catch((err: AxiosError) => {
          if(err.response?.status === 404) {
            router.push('/home')
          }
        })
    }
  },[accountId])
  return(
    <ProvidersCombined>
      <SiteHeader/>
      <ChatTab/>
      <div className="grid grid-cols-2 p-4">
        <div className="col-span-1">
          {user && <ProfileInfo user={user}/> }
        </div>
        <div className="col-span-1">
          {accountId && <RecentActivity userId={parseInt(accountId as string)}/>}
        </div>
      </div>
    </ProvidersCombined>
  )
}

export default Profile;
