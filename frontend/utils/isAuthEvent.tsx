import {ReactNode, useEffect, useState} from 'react';
import {EventNewApi} from '@/types/event';
import {UserNewApi} from '@/types/auth';
import axios from 'axios';
import {API_URL} from '@/lib/constants';
import {useRouter} from 'next/router';

export type IsAuthEventProps = {
  children: ReactNode
  userId: number | string | null
  eventId: number | string
}

const IsAuthEvent = (props: IsAuthEventProps) => {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState<boolean>(false)
  useEffect(() => {
    axios.get(`${API_URL}/event/getEventParticipants/${props.eventId}`)
      .then( (res) => {
        res.data.find((user: UserNewApi) => {
          if(user.id === parseInt(props.userId as string)){
            setIsAuth(true)
          }
        })
      })
  }, [])
  return(
    <>
      {isAuth ? props.children : <div>Unauthorized</div>}
    </>
  )
}

export default IsAuthEvent
