'use client'
import '@/styles/globals.css'
import IsAuth from '@/utils/isAuth';
import {reduxStore} from '@/utils/store';
import {Provider} from 'react-redux';
import {SiteHeader} from '@/components/custom/global/site-header';
import {Toaster} from '@/components/ui/toaster';
import ChatTab from '@/components/custom/global/chat-tab';
import EventDetailsContent from '@/components/custom/home/event-details/event-details-content';
import {Event, EventNewApi} from '@/types/event';
import {useEffect, useState} from 'react';
import axios from 'axios';
import PastEventList from '@/components/custom/history/past-event-list';
import {Separator} from '@/components/ui/separator';
import RateThisEvent from '@/components/custom/history/rate-this-event';
import ListOfUsersContainer from '@/components/custom/discussion/list-of-users/list-of-users-container';
import {ScrollArea} from '@/components/ui/scroll-area';
import RateThisEventSheet from '@/components/custom/history/rate-this-event-sheet';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/router';
import {API_URL} from '@/lib/constants';
import NetworkErrorCheck from '@/utils/network-error/NetworkErrorCheck';
import ProvidersCombined from '@/utils/ProvidersCombined';

const History = () => {
  const router = useRouter();
  const [events, setEvents] = useState<EventNewApi[]>([]);
  const [currentEvent, setCurrentEvent] = useState<EventNewApi>();
  useEffect(
    () => {
      axios.get(`${API_URL}/event/getEventsByAccount/${localStorage.getItem('userId')}`)
        .then( (res) => {
          setEvents(res.data)
          setCurrentEvent(res.data[0])
        })
    }, []
  )
  return (
    <ProvidersCombined>
      <SiteHeader/>
      <ChatTab/>
      <div className="grid max-h-screen w-[85%] grid-cols-10 grid-rows-5 gap-4">
        <div className="col-span-5 row-span-5">
          {events &&
                (
                  <PastEventList
                    setCurrentEvent={setCurrentEvent}
                    events={events}
                  />
                )}
        </div>
        <div className="col-span-5 row-span-5">
          <div className="flex flex-col p-4">
            {currentEvent && (
              <Button
                onClick={() => {
                  router.push(`/discussion/${currentEvent?.id}/discussion`)
                }}>
                Visit discussion
              </Button>
            )}
          </div>
          {currentEvent && (
            <RateThisEvent event={currentEvent}/>
          )}
        </div>
      </div>
    </ProvidersCombined>
  )
}
export default History;
