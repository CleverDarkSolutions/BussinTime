import { LazyMap, LazyMarker, LazyMarkerCluster } from '@/utils/map';
import {Key, Suspense, useEffect} from 'react';

const LeafletMap = () => {
  return (
    <Suspense fallback={<div className="h-[200px]"/>}>
      <LazyMap>
      </LazyMap>
    </Suspense>
  )
}

export default LeafletMap
