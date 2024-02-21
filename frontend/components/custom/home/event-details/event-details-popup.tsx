import {AlertDialog, AlertDialogTrigger} from '@radix-ui/react-alert-dialog';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';
import {OpenWith} from '@mui/icons-material';
import EventDetailsContent from '@/components/custom/home/event-details/event-details-content';
import {Event, EventNewApi} from '@/types/event'
import { useRouter, Router } from 'next/router';
import {API_URL} from '@/lib/constants';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {UserNewApi} from '@/types/auth';
import {useToast} from '@/components/ui/use-toast';

export type EventDetailsPopupType = {
  event: EventNewApi
}

const EventDetailsPopup = ({event}: EventDetailsPopupType) => {
  const router = useRouter();
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  const isPrivate = event.eventVisibility === 'PRIVATE';
  const {toast} = useToast();

  useEffect(() => {
    axios.get(`${API_URL}/event/getEventParticipants/${event.id}`).then((res) => {
      if(userId && res.data.find((user: any) => user.id === parseInt(userId))) {
        setIfJoined(true)
      }
    })
    console.log(userId)
  }, [])
  const [ifJoined, setIfJoined] = useState<boolean>(false)
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="w-[270px]">Show Details</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-[85vh] w-[50vw] max-w-[50vw]">
          <EventDetailsContent event={event} />
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            {ifJoined ? (
              <AlertDialogAction
                onClick={() => {
                  router.push(`/discussion/${event.id}/discussion`);
                }}
              >
                Discussion
              </AlertDialogAction>
            ) : (
              <>
                <AlertDialogAction
                  onClick={() => {
                    console.log(ifJoined);
                    axios.post(`${API_URL}/event/requestToJoinEvent?eventId=${event.id}&requesterId=${userId}`)
                  }}
                >
                  Request to join
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default EventDetailsPopup
