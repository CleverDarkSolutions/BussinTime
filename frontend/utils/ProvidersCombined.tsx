import {Provider} from 'react-redux';
import {reduxStore} from '@/utils/store';
import NetworkErrorCheck from '@/utils/network-error/NetworkErrorCheck';
import {API_URL} from '@/lib/constants';
import {Toaster} from '@/components/ui/toaster';
import ChatTab from '@/components/custom/global/chat-tab';
import {SiteHeader} from '@/components/custom/global/site-header';
import {ReactNode} from 'react';
import dynamic from 'next/dynamic';

export type ProvidersCombinedType = {
  children: ReactNode
}

const IsAuth = dynamic( () => import('@/utils/isAuth'), {ssr: false})

const ProvidersCombined = ({children}: ProvidersCombinedType) => {
  return(
    <Provider store={reduxStore}>
      <IsAuth>
        <NetworkErrorCheck apiUrl={API_URL}>
          <Toaster/>
          {children}
        </NetworkErrorCheck>
      </IsAuth>
    </Provider>
  )
}

export default ProvidersCombined
