import {Input} from '@/components/ui/input';
import {ScrollArea} from '@/components/ui/scroll-area';
import UserAvatar from '@/components/custom/global/user-avatar';
import ChatPopup from '@/components/custom/global/chat-popup';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {UserNewApi} from '@/types/auth';
import {sendMessage} from 'next/dist/client/dev/error-overlay/websocket';
import {Add} from '@mui/icons-material';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {API_URL} from '@/lib/constants';
import {EventNewApi} from '@/types/event';
import {useToast} from '@/components/ui/use-toast';

export type InviteListType = {
  event: EventNewApi
}

const InviteList = (props: InviteListType) => {
  const {toast} = useToast()
  const userId = localStorage.getItem('userId')
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<UserNewApi[]>([]);
  useEffect( () => {
    axios.get(`${API_URL}/account/all`)
      .then( (res) => {
        if(userId) {
          const filteredData = res.data.filter((user: UserNewApi) => {
            return user.id.toString() !== userId
          })
          filteredData.length > 0 && setUsers(filteredData)
        }
      })
  },[])
  const filteredUsers = users?.filter((user) =>
    (user?.username?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (user?.name?.toLowerCase() || '').includes(search.toLowerCase())
  );
  return(
    <div>
      <Input
        placeholder="Search"
        className="w-full"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
      />
      <ScrollArea className="h-[50vh]">
        <div className="p-4">
          {filteredUsers?.length === 0 && <div>No users found</div>}
          {filteredUsers?.map( (user) => {
            return(
              <div className="border-300-gray my-2 grid grid-cols-5 rounded border-2 border-solid p-2">
                <div className="col-span-1 py-1">
                  <UserAvatar id={user.id}/>
                </div>
                <div className="col-span-3 p-2">
                  <div className="flex flex-row">{user.username}</div>
                </div>
                <div className="col-span-1 p-2">
                  <div
                    onClick={() => {
                      axios.post(`${API_URL}/event/inviteToEvent/${props.event.id}?invitedAccountId=${user.id}`)
                        .then( (res: AxiosResponse) => {
                          if(res.status === 200)
                            toast({
                              title: 'Success',
                              description: 'User invited',
                            })
                        }).catch( (err: AxiosError) => {
                          if(err.response?.status === 409) {
                            toast({
                              title: 'Error',
                              description: 'User is already invited',
                            })
                          }
                          else{
                            toast({
                              title: 'Error',
                              description: 'Something went wrong',
                            })
                          }
                        })
                    }}
                    className="flex cursor-pointer flex-row">
                    <Add/>
                  </div>
                </div>
              </div>
            )})}
        </div>
      </ScrollArea>
    </div>
  )
}

export default InviteList;
