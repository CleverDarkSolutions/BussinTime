import {useMap, useMapEvents} from 'react-leaflet';
import dynamic from 'next/dynamic';
import {LatLngExpression} from 'leaflet';

export const ComponentResize = () => {
  const map = useMap()
  setTimeout(() => {
    map.invalidateSize()
  }, 0)
  return null
}

export const moveToEvent = (map: any, cords: LatLngExpression) => {
  console.log(cords)
  map.flyTo(cords, map.getZoom())
}
export const handleClick = (e: { latlng: any; }) => {
  console.log('Clicked position:', e.latlng);
};

export const MapClickHandler = () => {
  useMapEvents({
    click: handleClick
  });
  return null;
};

export const LazyMapCenter = dynamic(async () => (await import('../components/custom/map/map-center')));

export const LazyMap = dynamic(
  async () => (await import('../components/custom/map/map')),
  {
    ssr: false,
  }
)

export const LazyMarker = dynamic(
  async () => (await import('react-leaflet')).Marker,
  {
    ssr: false,
  }
)

export const LazyMarkerCluster = dynamic(
  async () => (await import('../components/custom/map/events-on-map')),
  {
    ssr: false,
  }
)
