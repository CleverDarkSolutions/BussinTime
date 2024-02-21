import {useMap, useMapEvents} from 'react-leaflet';
import {useState} from 'react';

const MapCenter = () => {
  const map = useMap()
  const [location, setLocation] = useState(map.getCenter())
  const { lat, lng } = location
  const text = `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  useMapEvents({
    move(event) {
      setLocation(event.target.getCenter())
    },
    zoom(event) {
      setLocation(event.target.getCenter())
    },
  })
  return (
    <span
      className="button absolute right-2 top-2 rounded border-2 border-neutral-400 bg-white px-2 py-1 text-black"
      onClick={() => map.setZoom(13)}
    >
      {text}
    </span>
  )
}

export default MapCenter
