import {EventNewApi} from '@/types/event';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import EventRatings from '@/components/custom/history/event-ratings';

export type EventRatingsPopupProps = {
  event: EventNewApi
}

const EventRatingsPopup = (props: EventRatingsPopupProps) => {
  return(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show reviews</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reviews of event {props.event.name}</AlertDialogTitle>
          <AlertDialogDescription>
            <EventRatings event={props.event} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EventRatingsPopup
