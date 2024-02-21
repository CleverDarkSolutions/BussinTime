import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import { Star } from '@mui/icons-material';
import * as React from 'react';
import {API_URL} from '@/lib/constants';
import {UserNewApi} from '@/types/auth';
import {useEffect, useState} from 'react';
import axios from 'axios';

export type UserAvatarProps = {
  id: number | string
}

const UserAvatar = (props: UserAvatarProps) => {
  const [user, setUser] = useState<UserNewApi>()
  useEffect(() => {
    axios.get(`${API_URL}/account/${props.id}`)
      .then((res) => {
        setUser(res.data)
        console.log(res.data)
      })
  }, [])
  return(
    <div>
      <Avatar>
        <AvatarImage
          className="rounded-md"
          height="50px"
          width="50px"
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        {user?.premium !== null && (
          <Star style={{color: '#FFD700'}}
            className="absolute bottom-0 right-0" />
        )}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserAvatar
