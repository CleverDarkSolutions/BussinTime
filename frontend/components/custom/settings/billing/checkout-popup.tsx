import Checkout from './checkout'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '@/lib/constants';

export type CheckoutPopupProps = {
  clientSecret: string;
}

const CheckoutPopup = (props: CheckoutPopupProps) => {
  const [premium, setPremium] = useState(false)
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    axios.get(`${API_URL}/account/${userId}`)
      .then((res) => {
        if(res.data.premium !== null) setPremium(true)
        else {
          setPremium(false)
        }
      })
  }, [])
  return(
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          { premium ? (
            <Button disabled
              className="mt-6 w-[100px]">Premium bought</Button>
          ) : (<Button className="mt-6 w-[100px]">Buy now</Button>) }
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete payment</AlertDialogTitle>
            <AlertDialogDescription>
              10$ will be charged to your credit card for the premium subscription.
              <Separator className="my-6"/>
              <Checkout clientSecret={props.clientSecret} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default CheckoutPopup
