import {useEffect, useState} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import Header from '@/components/custom/settings/header';
import { Divider } from '@mui/material';
import Checkout from './checkout';
import {Separator} from '@/components/ui/separator';
import CheckoutPopup from '@/components/custom/settings/billing/checkout-popup';
import PremiumCard from '@/components/custom/settings/billing/premium-card';
import {API_URL} from '@/lib/constants';
import axios from 'axios';

export type BillingContainerProps = {
  clientSecret: string;
}

const BillingContainer = (props: BillingContainerProps) => {
  return (
    <div className="w-[80vw] p-8">
      <Header text="Buy premium" />
      <Divider />
      <div className="py-5">
        <PremiumCard
          clientSecret={props.clientSecret}
          title="Founder's pack"
          price={10}
          description="As we are still in beta, we are offering a special deal for our first users. Buying grants you a distinct profile view now, in the future we plan to grant you the following futures:"
          features={['No ads', 'Customization options', 'Preferential algorithm treatment']}/>
      </div>
    </div>
  );
};

export default BillingContainer;
