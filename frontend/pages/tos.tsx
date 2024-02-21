'use client'
import '@/styles/globals.css'
import TosContainer from '@/components/custom/settings/tos/tos-container';
import {SiteHeader} from '@/components/custom/global/site-header';
import ChatTab from '@/components/custom/global/chat-tab';

const Tos = () => {
  return (
    <div>
      <SiteHeader/>
      <ChatTab/>
      <TosContainer/>
    </div>
  )
}

export default Tos
