import {MapContainer, TileLayer, useMap, ZoomControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {CORDS_GDANSK} from '@/lib/constants';
import { ComponentResize, LazyMapCenter, LazyMarkerCluster, MapClickHandler } from '@/utils/map';
import {useSelector} from 'react-redux';
import {LoginInitialState} from '@/utils/store/login-reducer';
import {useEffect, useState} from 'react';
import {MainUI} from '@/components/custom/home/mainUI';
import './leaflet.css'
import GeocodeComponent from '@/components/custom/discussion/event/geocode-component';

const Map = (props: any) => {
  // Ensure the map has a height and is only rendered on the client side
  const { positionInfos } = props;
  // get the location from geolocation
  const [latLng, setLatLng] = useState({
    lat: 0.0,
    lng: 0.0,
    isLoaded: false,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatLng({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            isLoaded: true,
          });
        },
        (error) => {
          alert(error);
        }
      );
    }
  }, [setLatLng]);
  if (typeof window !== 'undefined') {
    return (
      <div
        className="p-4"
        style={{ width: '100%', height: '89vh', float: 'left'}}>
        <MapContainer
          center={CORDS_GDANSK}
          zoom={13}
          zoomControl={false}
          scrollWheelZoom
          style={{ width: '100%', height: '100%' }}
        >
          <MainUI/>
          <ZoomControl position='bottomright' />
          <ComponentResize />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler />
          <LazyMarkerCluster/>
          <LazyMapCenter/>
        </MapContainer>
      </div>
    );
  } else {
    return <div />;
  }
}

export default Map;
