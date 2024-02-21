import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import {API_URL} from '@/lib/constants';

export type CheckoutFormProps = {
  clientSecret: string;
}

export default function CheckoutForm(props: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const userId = localStorage.getItem('userId');

  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    axios.post(`${API_URL}/premium/${userId}`) // TODO GOLEMOWA LOGIKA UWAGA

    try {
      const paymentElement = elements?.getElement(PaymentElement);

      if (paymentElement) {
        const result = await stripe?.confirmPayment({
          elements: elements!,
          confirmParams: {
            return_url: 'http://localhost:3000/home',
          }
        }).then((result) => {
          if (result?.error) {
            console.error(result.error.message);
          }
        })
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      console.log(props.clientSecret)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement/>
      <Button disabled={isProcessing || !stripe || !elements}
        className="my-4"
        onClick={handleSubmit}
        type="submit">
        {isProcessing ? 'Processing ... ' : 'Pay now'}
      </Button>
      {/* Show any error or success messages */}
      {message && <div>{message}</div>}
    </form>
  );
}
