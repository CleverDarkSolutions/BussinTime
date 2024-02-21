'use client'
import '@/styles/globals.css'
import dynamic from 'next/dynamic';
import {reduxStore} from '@/utils/store';
import {Provider} from 'react-redux';
import IsAuth from '@/utils/isAuth';
import NetworkErrorCheck from '@/utils/network-error/NetworkErrorCheck';
import {API_URL} from '@/lib/constants';
import ProvidersCombined from '@/utils/ProvidersCombined';
import {SiteHeader} from '@/components/custom/global/site-header';
import ChatTab from '@/components/custom/global/chat-tab';

const HomeComponent = dynamic( () =>
  import('../components/custom/home/home-component'), {ssr: false})

const Home = () => {
  return(
    <div>
      <ProvidersCombined>
        <SiteHeader/>
        <ChatTab/>
        <HomeComponent/>
      </ProvidersCombined>
    </div>
  )
}

export default Home
