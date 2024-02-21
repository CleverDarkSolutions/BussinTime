import ProfileForm from '@/components/custom/settings/profile/form';
import {Divider} from '@mui/material';
import Header from '@/components/custom/settings/header';
import {useEffect, useState} from 'react';
import {User, UserNewApi} from '@/types/auth';
import axios from 'axios';
import {API_URL} from '@/lib/constants';

const ProfileContainer = () => {
  const userId = localStorage.getItem('userId')
  const [userData, setUserData] = useState<UserNewApi>()
  useEffect( () => {
    axios.get(`${API_URL}/account/${userId}`)
      .then((res) => {
        setUserData(res.data)
      })
  }, [])
  return(
    <div className="w-[80vw] p-8">
      <Header text="Profile"/>
      <Divider />
      <div className="grid grid-cols-1 gap-[10vw] pb-5">
        <div className="col-span-1">
          {userData && <ProfileForm user={userData}/>}
        </div>
      </div>
    </div>
  )
}

export default ProfileContainer;
