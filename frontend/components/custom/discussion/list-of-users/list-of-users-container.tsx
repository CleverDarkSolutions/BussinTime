import {User, UserNewApi} from '@/types/auth';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import * as React from 'react';
import {MoreVert} from '@mui/icons-material';
import {Popover, PopoverContent} from '@/components/ui/popover';
import {PopoverTrigger} from '@radix-ui/react-popover';
import {API_URL} from '@/lib/constants';
import {router} from 'next/client';
import {useRouter} from 'next/router';
import UserAvatar from '@/components/custom/global/user-avatar';
import UserPopover from '@/components/custom/global/user-popover';

export type ListOfUsersContainerType = {
  eventId: number
}

const ListOfUsersContainer = (props: ListOfUsersContainerType) => {
  const [users, setUsers] = useState<UserNewApi[]>()
  const router = useRouter()
  const userId = localStorage.getItem('userId')
  useEffect( () => {
    axios.get(`${API_URL}/event/getEventParticipants/${props.eventId}`)
      .then( (res) => {
        setUsers(res.data)
      })
  },[])
  return(
    <div className="">
      <div className="col-span-3 my-2 text-xl">Participants</div>
      <div className="grid grid-cols-3">
        {users?.map( (user) => {
          return(
            <div className="col-span-1 m-2 rounded border-2 border-solid p-2">
              <div className="grid grid-cols-4">
                <div className="col-span-1 py-1">
                  <UserAvatar id={user.id}/>
                </div>
                <div className="col-span-2 p-2">
                  <div className="flex flex-row overflow-hidden text-ellipsis">{user.username}</div>
                </div>
                <div className="col-span-1 p-2">
                  <UserPopover
                    kickFromEvent
                    eventId={props.eventId}
                    user={user}/>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListOfUsersContainer
