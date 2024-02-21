import {useEffect, useState} from 'react';
import {Event, EventNewApi} from '@/types/event'
import axios from 'axios';
import {Circle, Marker, Popup, useMap} from 'react-leaflet';
import {PrimaryMarker} from '@/components/custom/map/primary-marker';
import EventPopup from '@/components/custom/map/popup-content/event-popup';
import {API_URL, tags} from '@/lib/constants';
import {LatLngExpression} from 'leaflet';

const EventsOnMap = () => {
  const map = useMap()
  const [events, setEvents] = useState<EventNewApi[]>()
  const userId = localStorage.getItem('userId')

  useEffect( () => {
    axios.get(`${API_URL}/event/getPublicAndPersonalEvents/${userId}`)
      .then( (res) => {
        setEvents(res.data)
      })
  },[])

  return(
    <div>
      {events?.map( (event) => {
        const cords: LatLngExpression = [Number(event.localization.latitude), Number(event.localization.longitude)]
        return (
          <div onClick={() => {
            map.setView(cords, map.getZoom())
          }}>
            <Marker
              position={cords}
              icon={PrimaryMarker}>
              <Popup>
                <EventPopup
                  event={event}
                />
              </Popup>
            </Marker>
          </div>
        )
      })}
    </div>
  )
}

export default EventsOnMap
