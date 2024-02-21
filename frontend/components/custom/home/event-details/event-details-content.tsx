import {Event, EventNewApi} from '@/types/event'
import Header from '@/components/custom/settings/header';
import {Separator} from '@/components/ui/separator';
import {Chat, Description, EventNote, LocationOn, ManageAccounts, PeopleAlt} from '@mui/icons-material';
import EventPopupInfoRow from '@/components/custom/map/popup-content/event-popup-info-row';
import {Divider} from '@mui/material';
import Hashtags from '@/components/custom/home/event-details/hashtags';
import EventUsers from '@/components/custom/home/event-details/event-users';
import EventDiscussion from '@/components/custom/home/event-details/event-discussion';
import {ScrollArea} from '@/components/ui/scroll-area';
import {formatDate} from '@/lib/utils';
import {User, UserNewApi} from '@/types/auth';
import {useEffect, useState} from 'react';
import {API_URL} from '@/lib/constants';
import axios from 'axios';

export type EventDetailsContentType = {
  event: EventNewApi
}

const EventDetailsContent = ({event}: EventDetailsContentType) => {
  const [participants, setParticipants] = useState<UserNewApi[]>([])
  const [creator, setCreator] = useState<UserNewApi>()
  useEffect( () => {
    axios.get(`${API_URL}/event/getEventParticipants/${event.id}`)
      .then( (res) => {
        setParticipants(res.data)
      })
    axios.get(`${API_URL}/event/host/${event.id}`)
      .then( (res) => {
        setCreator(res.data.host)
      })
  }, [])
  return(
    <div>
      <div className="grid-rows-20 grid grid-cols-5 gap-2">
        <div className="col-span-5">
          <Header text={event.name}/>
          <div className="text-lg">Event type: {event.eventVisibility}</div>
          <Divider/>
        </div>
        <div className="col-span-2 row-start-2">
          <EventPopupInfoRow
            passedIcon={<LocationOn/>}
            label={event.localization.city}
            textSize="text-lg"
          />
        </div>
        <div className="col-span-3 col-start-3 row-span-4 row-start-2">
          <div className="h-full w-3/4 rounded border-2 border-solid text-center
          bg-cover bg-[url('https://img.freepik.com/free-photo/happy-young-company-smiling-friends-sitting-park-grass-man-women-having-fun-together_285396-8812.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=ais')]">
          </div>
          <Hashtags
            id={event.id}
            type="EVENT"
          />
        </div>
        <div className="col-span-2 row-start-3">
          <EventPopupInfoRow
            passedIcon={<EventNote/>}
            label={`${formatDate(event.startDate)}`}
            textSize="text-lg"
          />
        </div>
        <div className="col-span-2 row-start-4">
          <EventPopupInfoRow
            passedIcon={<EventNote/>}
            label={`${formatDate(event.endDate)}`}
            textSize="text-lg"
          />
        </div>
        <div className="col-span-2 row-start-5">
          <EventPopupInfoRow
            passedIcon={<ManageAccounts/>}
            label={`${creator?.username || 'Backend error'}`}
            textSize="text-lg"
          />
        </div>
        <div className="col-span-2 row-start-6">
          <EventPopupInfoRow
            passedIcon={<PeopleAlt/>}
            label={`${participants.length}`}
            textSize="text-lg"
          />
        </div>
        <div className="col-span-2 row-start-7">
          <Divider/>
        </div>
        <div className="col-span-5 mt-2">
          <ScrollArea className="h-[15vh]">
            <div className="min-h-20 mb-4 grid grid-cols-2 overflow-hidden text-xl">
              <div className="col-span-2 my-2">
                <Description/>
                Details
              </div>
              <div className="col-span-2 text-lg">
                {event.description}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsContent
