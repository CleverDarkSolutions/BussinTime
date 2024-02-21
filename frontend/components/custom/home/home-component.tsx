import {MainUI} from '@/components/custom/home/mainUI';
import {SiteHeader} from '@/components/custom/global/site-header';
import LeafletMap from '@/components/custom/map/leaflet-map';
import ChatTab from '@/components/custom/global/chat-tab';
import {Toaster} from '@/components/ui/toaster';

export default function HomeComponent() {
  return(
    <div> 
      <div>
        <LeafletMap/>
      </div>
    </div>
  )
}
