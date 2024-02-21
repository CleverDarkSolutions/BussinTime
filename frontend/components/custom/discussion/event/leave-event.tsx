import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {DeleteForever, Edit, Logout} from '@mui/icons-material';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {API_URL} from '@/lib/constants';
import axios from 'axios';
import {EventNewApi} from '@/types/event';
import {useEffect, useState} from 'react';
import {UserNewApi} from '@/types/auth';
import { useRouter } from 'next/router';

export type LeaveEventProps = {
  event: EventNewApi
}
const LeaveEvent = (props: LeaveEventProps) => {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const router = useRouter()
  const [user, setUser] = useState<UserNewApi>()
  useEffect(() => {
    axios.get(`${API_URL}/account/${userId}`, {headers: {'Authorization': `Bearer ${token}`}})
      .then((res) => {
        setUser(res.data)
      })
  }, [])
  return(
    <AlertDialog>
      <AlertDialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Logout/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Leave event</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will leave the event and will not be able to join again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              axios.delete(`${API_URL}/event/removeFromEvent/${props.event.id}/${userId}`, {headers: {'Authorization': `Bearer ${token}`}})
                .then( (res) => {
                  router.push('/home')
                })
            }}
          >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LeaveEvent
