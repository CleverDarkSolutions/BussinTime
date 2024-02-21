'use client'
import '@/styles/globals.css'
import {SiteHeader} from '@/components/custom/global/site-header';
import Sidebar from '@/components/custom/settings/sidebar';
import {SetStateAction, useContext, useEffect, useState} from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import ProfileContainer from '@/components/custom/settings/profile/profile-container';
import BillingContainer from '@/components/custom/settings/billing/billing-container';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountContainer from '@/components/custom/settings/account/account-container';
import PrivacyContainer from '@/components/custom/settings/privacy/privacy-container';
import {ScrollArea} from '@/components/ui/scroll-area';
import TosContainer from '@/components/custom/settings/tos/tos-container';
import isAuth from '@/utils/isAuth';
import { Provider } from 'react-redux';
import {reduxStore} from '@/utils/store';
import IsAuth from '@/utils/isAuth';
import ChatTab from '@/components/custom/global/chat-tab';
import {Toaster} from '@/components/ui/toaster';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NetworkErrorCheck from '@/utils/network-error/NetworkErrorCheck';
import {API_URL} from '@/lib/constants';
import ProvidersCombined from '@/utils/ProvidersCombined';

const Settings = () => {
  const [clientSecret, setClientSecret] = useState('');

  const sidebarItems = [
    {
      icon: <InstagramIcon/>,
      label: 'Profile',
      component: <ProfileContainer/>
    },
    {
      icon: <CreditCardIcon/>,
      label: 'Billing',
      component: <BillingContainer clientSecret={clientSecret}/>
    }
  ]

  const [selectedOption, setSelectedOption] = useState(0);
  const contentComponents = sidebarItems.map( (item) => item.component );
  const onSelectOption = (index: SetStateAction<number>) => {
    setSelectedOption(index);
  };
  const CurrentContent = contentComponents[selectedOption];

  const stripePromise = loadStripe('pk_test_51OM6cBH2vserwmCOcvH9XTV3XXE4D5JKzwuVQr7R1clQrrkkfVgz9XxR8RkxVHnhrjPmZQFzzvbZpwRU9KSjg1JW00C1zoqOcv');

  const handlePaymentIntent = async () => {
    try {
      const response = await fetch('http://localhost:5252/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000, currency: 'usd' }),
      });

      const data = await response.json();
      setClientSecret(data.client_secret);
      console.log(data.client_secret)
    } catch (error) {
      console.error('Error creating PaymentIntent:', error);
    }
  };

  useEffect(() => {
    handlePaymentIntent();
  },[])

  return(
    <ProvidersCombined>
      <SiteHeader/>
      <ChatTab/>
      <div>
        <div>
          <Sidebar
            options={sidebarItems}
            onSelectOption={onSelectOption}/>
        </div>
        <div className="fixed left-[18vw] top-24">
          <ScrollArea className="h-[90vh] w-[80vw]">
            {clientSecret && (
              <Elements
                stripe={stripePromise!}
                options={{clientSecret: clientSecret}}>
                {CurrentContent}
              </Elements>
            )}
          </ScrollArea>
        </div>
      </div>
    </ProvidersCombined>
  )
}

export default Settings;
