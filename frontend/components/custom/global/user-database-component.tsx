import {UserNewApi} from '@/types/auth';
import {useEffect, useState} from 'react';
import {API_URL} from '@/lib/constants';
import axios from 'axios';
import {Input} from '@/components/ui/input';
import {ScrollArea} from '@/components/ui/scroll-area';
import UserAvatar from '@/components/custom/global/user-avatar';
import ChatPopup from '@/components/custom/global/chat-popup';
import * as React from 'react';
import {MoreVert} from '@mui/icons-material';
import UserPopover from '@/components/custom/global/user-popover';
import {Tabs} from '@radix-ui/react-tabs';
import {TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card} from '@/components/ui/card';
import AddNewEvent from '@/components/custom/home/tabs/add-new-event';

const UserDatabaseComponent = () => {
  const [users, setUsers] = useState<UserNewApi[]>([])
  const [friends, setFriends] = useState<UserNewApi[]>([])
  const [search, setSearch] = useState<string>('')
  const userId = localStorage.getItem('userId')
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
  }, [])
  useEffect( () => {
    axios.get(`${API_URL}/friendship/${userId}`)
      .then( (res) => {
        setFriends(res.data)
      })
  },[])
  const filteredUsers = users?.filter((user) =>
    (user?.username?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (user?.name?.toLowerCase() || '').includes(search.toLowerCase())
  );

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }

  const tabs = [
    {
      title: 'All users',
      component: (
        <div>
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
                    <div className="flex flex-row">
                      <UserPopover
                        kickFromEvent={false}
                        user={user}/>
                    </div>
                  </div>
                </div>
              )})}
          </div>
        </div>
      )
    },
    {
      title: 'Friends',
      component: (
        <div>
          <div className="p-4">
            {friends.length === 0 && <div>No friends found</div>}
            {friends?.map( (user) => {
              return(
                <div className="border-300-gray my-2 grid grid-cols-5 rounded border-2 border-solid p-2">
                  <div className="col-span-1 py-1">
                    <UserAvatar id={user.id}/>
                  </div>
                  <div className="col-span-3 p-2">
                    <div className="flex flex-row">{user.username}</div>
                  </div>
                  <div className="col-span-1 p-2">
                    <div className="flex flex-row">
                      <UserPopover
                        kickFromEvent={false}
                        user={user}/>
                    </div>
                  </div>
                </div>
              )})}
          </div>
        </div>
      )
    }
  ]

  return (
    <div>
      <Tabs defaultValue="Friends">
        <TabsList className="grid w-full grid-cols-2">
          {tabs.map( (tab) => (
            <TabsTrigger
              value={tab.title}
              className='w-full'>
              {tab.title}
            </TabsTrigger>
          ) )}
        </TabsList>
        {tabs.map( (tab) => (
          <TabsContent value={tab.title}>
            <Card>
              <Input
                className="mx-4 my-2 w-[93%]"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
              <ScrollArea className="h-[50vh]">
                {tab.component}
              </ScrollArea>
            </Card>
          </TabsContent>
        ) )}
      </Tabs>
    </div>
  )
}

export default UserDatabaseComponent;
