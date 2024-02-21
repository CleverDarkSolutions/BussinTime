import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {Event, EventNewApi} from '@/types/event'
import {EventAvailable, EventNote, LocationOn, PeopleAlt} from '@mui/icons-material';
import {Badge} from '@/components/ui/badge';
import {useMap} from 'react-leaflet';
import {moveToEvent} from '@/utils/map';
import EventDetailsPopup from '@/components/custom/home/event-details/event-details-popup';
import EventBoxCard from '@/components/custom/global/event-box-card';
import {LatLngExpression} from 'leaflet';

export type EventBoxProps = {
  event: EventNewApi,
  joined?: boolean,
}

const EventBox = ({event, joined}: EventBoxProps) => {
  const map = useMap()
  const cords: LatLngExpression = [Number(event.localization.latitude), Number(event.localization.longitude)]
  return(
    <EventBoxCard
      onClick={() => moveToEvent(map, cords)}
      event={event}
    />
  )
}

export default EventBox
