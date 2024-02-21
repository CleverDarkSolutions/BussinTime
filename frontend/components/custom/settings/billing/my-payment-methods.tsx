import {useEffect, useState} from 'react';
import {PaymentMethod} from '@/types/payment-methods';
import axios from 'axios';

const MyPaymentMethods = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  useEffect( () => {
    axios.get('http://localhost:8000/paymentMethods')
      .then( (res) => {
        setMethods(res.data)
      })
  }, [])
  return (
    <div>
      {methods.map( (method) => {
        return (
          <div className="m-2 grid rounded border-2 border-solid p-2">
            <div>{method.name}</div>
            <div>{method.number}</div>
            <div>{method.expirationDate}</div>
            <div>{method.cvv}</div>
          </div>
        )
      })}
    </div>
  )
}
export default MyPaymentMethods
