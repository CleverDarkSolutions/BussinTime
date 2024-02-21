import L from 'leaflet';
import CustomMarker from '@/lib/assets/Map_marker.svg'

export const PrimaryMarker = L.icon({
  iconUrl: CustomMarker.src,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
