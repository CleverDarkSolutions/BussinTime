import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MainNav} from '@/components/custom/global/main-nav';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '@/lib/constants';
import {UserNewApi} from '@/types/auth';
import {Logout, Notifications, Star} from '@mui/icons-material';
import UserAvatar from '@/components/custom/global/user-avatar';
import NotificationPopup from '@/components/custom/global/notification-popup';

export function SiteHeader() {
  const router = useRouter();
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState<UserNewApi>();
  useEffect(() => {
    axios.get(`${API_URL}/account/${userId}`)
      .then( (res) => {
        setUser(res.data)
      })
  }, [])
  return user ? (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-20 items-center space-x-8 sm:justify-between sm:space-x-8">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-3 p-4">
            <h2 className="scroll-m-20 p-4 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
              {user.username}
            </h2>
            <UserAvatar id={userId!}/>
            <NotificationPopup />
            <Logout
              className="cursor-pointer"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                router.push('/welcome');
              }}
            />
          </nav>
        </div>
      </div>
    </header>
  ) : (
    <div>Loading...</div>
  );

}
