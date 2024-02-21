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
import {DeleteForever, Edit} from '@mui/icons-material';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import axios from 'axios';
import {API_URL} from '@/lib/constants';
import {EventNewApi} from '@/types/event';
import {useRouter} from 'next/router';
import {useToast} from '@/components/ui/use-toast';

export type DeleteEventProps = {
  event: EventNewApi
}

const DeleteEvent = (props: DeleteEventProps) => {
  const token = localStorage.getItem('token')
  const router = useRouter()
  const {toast} = useToast()
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DeleteForever/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete forever</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will delete event permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              axios.delete(`${API_URL}/event/${props.event.id}`, {headers: {'Authorization': `Bearer ${token}`}})
                .then( (res) => {
                  toast({
                    title: 'Success',
                    description: 'Event deleted successfully',
                  })
                  router.push('/home')
                })
            }}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteEvent
