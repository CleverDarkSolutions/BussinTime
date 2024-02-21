import {moveToEvent} from '@/utils/map';
import {Card, CardTitle} from '@/components/ui/card';
import {EventNote, LocationOn, PeopleAlt} from '@mui/icons-material';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import {Event, EventNewApi} from '@/types/event'
import RateThisEventSheet from '@/components/custom/history/rate-this-event-sheet';
import {API_URL, tags} from '@/lib/constants';
import {formatDate} from '@/lib/utils';
import {useState} from 'react';
import {User} from '@/types/auth';
import axios from 'axios';
import Hashtags from '@/components/custom/home/event-details/hashtags';

const EventBoxCard = ({ event, onClick }: { event: EventNewApi, onClick: () => void }) => {
  const [participants, setParticipants] = useState<User[]>([]);
  useState( () => {
    axios.get(`${API_URL}/event/getEventParticipants/${event.id}`)
      .then((res) => {
        setParticipants(res.data)
      })
  }, [])
  return(
    <Card
      onClick={onClick}
      className="ml-4 mt-4 h-[20%] w-[93%] overflow-hidden p-2">
      <div className="grid-rows-8 grid grid-cols-7 gap-2">
        <div className="col-span-4 row-span-2">
          <CardTitle className="text-lg">{event.name}</CardTitle>
        </div>
        <div className="col-span-1 row-span-2">
          <CardTitle className="text-sm">
            <PeopleAlt className="text-sm" /> &nbsp;
            {participants.length}
          </CardTitle>
        </div>
        <div className="col-span-3 row-span-2">
          <CardTitle className="text-sm">
            <EventNote className="text-sm" /> &nbsp;
            {formatDate(event.startDate)}
          </CardTitle>
        </div>
        <div className="col-span-3 row-span-2 truncate">
          <CardTitle className="text-sm">
            <LocationOn className="text-sm"/> &nbsp;
            {event.localization.city}
          </CardTitle>
        </div>
        <div className="col-span-7 row-span-2 text-sm">
          <Hashtags
            id={event.id}
            type="EVENT"
          />
        </div>
      </div>
    </Card>
  )
}
export default EventBoxCard
