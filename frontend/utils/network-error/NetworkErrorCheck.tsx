import React, {useState, useEffect, ReactNode} from 'react';
import axios from 'axios';
import NetworkErrorMessage from '@/utils/network-error/NetworkErrorMessage';
import { Skeleton } from '@/components/ui/skeleton';
import {API_URL} from '@/lib/constants';

export type NetworkErrorCheckType = {
  apiUrl: string,
  children: ReactNode
}

const NetworkErrorCheck = ({ apiUrl, children }: NetworkErrorCheckType) => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/account/all`)
      .then( (res) => {
        setData(res.data)
      })
      .catch( (err) => {
        setError(err.message)
      })
      .finally( () => {
        setLoading(false)
      })
  },[])
  if(loading) return <Skeleton/>
  if(error) return <NetworkErrorMessage error={error}/>
  return (
    <div>
      {data && !error && !loading && children}
    </div>
  )
};

export default NetworkErrorCheck;
