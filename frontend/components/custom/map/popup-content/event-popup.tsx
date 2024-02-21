import {Card} from '@/components/ui/card';
import {Event, EventNewApi} from '@/types/event'
import {Description, EventNote, Image, LocationOn, PeopleAlt} from '@mui/icons-material';
import {Box} from '@mui/material';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import InfoIcon from '@mui/icons-material/Info';
import EventPopupInfoRow from '@/components/custom/map/popup-content/event-popup-info-row';
import {Button} from '@/components/ui/button';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {User} from '@/types/auth';
import EventDetailsPopup from '@/components/custom/home/event-details/event-details-popup';
import {API_URL, tags} from '@/lib/constants';
import {formatDate, getRelativeTime} from '@/lib/utils';

export type EventPopupProps = {
  event: EventNewApi
}

const EventPopup = (props: EventPopupProps) => {
  const userId = localStorage.getItem('userId');

  const [participants, setParticipants] = useState<User[]>([]);
  useEffect( () => {
    axios.get(`${API_URL}/event/getEventParticipants/${props.event.id}`)
      .then( (res) => {
        setParticipants(res.data)
      })
  }, [])
  return(
    <div>
      <Card className="w-[300px]">
        <div className="grid grid-rows-3 p-4">
          <div className="row-span-1 bg-cover bg-[url('https://img.freepik.com/free-photo/happy-young-company-smiling-friends-sitting-park-grass-man-women-having-fun-together_285396-8812.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=ais')]"/>
          <div className="row-span-2">
            <div className="h-full w-full">
              <div className="grid gap-1">
                <EventPopupInfoRow
                  passedIcon={<InfoIcon/>}
                  label={props.event.name}
                  textSize="text-lg"
                />
                <EventPopupInfoRow
                  passedIcon={<PeopleAlt/>}
                  label={`${participants.length}`}
                  textSize="text-xl"
                />
                <EventPopupInfoRow
                  passedIcon={<LocationOn/>}
                  label={props.event.localization.city}
                  textSize="text-lg"
                />
                <EventPopupInfoRow
                  passedIcon={<EventNote/>}
                  label={`${formatDate(props.event.startDate)}`}
                  textSize="text-xl"
                />
                <EventPopupInfoRow
                  passedIcon={<EventNote/>}
                  label={`${formatDate(props.event.endDate)}`}
                  textSize="text-xl"
                />
                <div className="row=span-2 py-4">
                  <Label>{tags.map( (tag) => {
                    return(
                      <Badge className="mb-1 mr-1">{tag}</Badge>
                    )
                  })}</Label>
                </div>
                <EventDetailsPopup event={props.event}/>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default EventPopup
