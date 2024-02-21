import '@/styles/globals.css'
import {Separator} from '@/components/ui/separator';
import {siteConfig} from '@/config/site';
import {buttonVariants} from '@/components/ui/button';
import Link from 'next/link';
import AuthForm from '@/components/custom/welcome/auth-form';
import {useContext, useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {reduxStore} from '@/utils/store';
import IsAuth from '@/utils/isAuth';
import PagePadding from '@/components/custom/global/page-padding';
import NetworkErrorCheck from '@/utils/network-error/NetworkErrorCheck';
import {API_URL} from '@/lib/constants';
import StepperGuide from '@/components/custom/welcome/stepper-guide';
import {useRouter} from 'next/router';
import {Toaster} from '@/components/ui/toaster';
import {SiteHeader} from '@/components/custom/global/site-header';
import ChatTab from '@/components/custom/global/chat-tab';
import CookiesBanner from '@/components/custom/global/cookies-banner';

export default function Welcome() {
  const router = useRouter();
  useEffect(() => {
    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if(token !== undefined && token !== null) {
        router.push('/home');
      }
    }
  })
  return (
    <Provider store={reduxStore}>
      <NetworkErrorCheck apiUrl={API_URL}>
        <Toaster/>
        <div className="grid grid-cols-8 gap-8 p-10">
          <div className="col-span-5 overflow-auto">
            <h1 className="pb-10 text-5xl font-extrabold">
              Bussin Time
            </h1>
            <h2 className="pb-10 text-3xl font-medium leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">About</h2>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              Our application is an innovative tool designed to facilitate people in getting to know each other and creating and organizing events. With our application, users can easily connect with others who share similar interests and passions. Furthermore, we enable the creation and management of events, such as meetings, parties, or workshops, allowing users to easily find events that interest them in their area. Our application provides the opportunity for a social experience, enabling users to embark on new adventures and find joy in meeting new people
            </p>
          </div>
          <div className="col-span-1">
            <AuthForm/>
          </div>
          <CookiesBanner/>
        </div>
      </NetworkErrorCheck>
    </Provider>
  )
}
