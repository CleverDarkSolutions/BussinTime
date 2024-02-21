import {Input} from '@/components/ui/input';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Tabs} from '@radix-ui/react-tabs';
import {TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useEffect, useState} from 'react';
import {Event, EventNewApi} from '@/types/event';
import axios from 'axios';
import EventBox from '@/components/custom/home/tabs/events/event-box';
import {ScrollArea} from '@/components/ui/scroll-area';
import SearchBar from '@/components/custom/home/tabs/search-bar';
import {User, UserNewApi} from '@/types/auth';
import AddNewEvent from '@/components/custom/home/tabs/add-new-event';
import {API_URL} from '@/lib/constants';
import GeocodeComponent from '../discussion/event/geocode-component';

export function MainUI(){
  const userId = localStorage.getItem('userId')
  const [events, setEvents] = useState<EventNewApi[]>()
  const [user, setUser] = useState<User>()
  const [myEvents, setMyEvents] = useState<EventNewApi[]>()
  const [search, setSearch] = useState('');
  const [tempTags, setTempTags] = useState<string[]>([])

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }

  useEffect( () => {
    axios.get(`${API_URL}/event/getPublicAndPersonalEvents/${userId}`)
      .then( (res) => {
        setEvents(res.data)
      }).then( () => console.log(events))
    axios.get(`${API_URL}/account/${userId}`)
      .then( (res) => {
        setUser(res.data)
      })
    axios.get(`${API_URL}/event/getEventsByAccount/${userId}`)
      .then( (res) => {
        setMyEvents(res.data)
      })
  },[])

  const filteredEvents = events?.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase()) ||
    event.localization.city.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMyEvents = myEvents?.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    {
      title: 'Events',
      component: filteredEvents?.map((event) => (
        <EventBox event={event} />
      )),
    },
    {
      title: 'My events',
      component: filteredMyEvents?.map((event) => (
        <EventBox event={event} />
      )),
    },
  ];
  return(
    <div
      className="absolute h-[70vh] w-1/3 p-4"
    >
      <Tabs defaultValue="Events">
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
              <div className="p-4">
                <AddNewEvent/>
              </div>
              <Input
                className="mx-4 my-2 w-[93%]"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
              <ScrollArea className="h-[64vh]">
                {tab.component}
              </ScrollArea>
            </Card>
          </TabsContent>
        ) )}
      </Tabs>
    </div>
  )
}
