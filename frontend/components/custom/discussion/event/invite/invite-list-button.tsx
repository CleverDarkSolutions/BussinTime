import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {DeleteForever, PersonAdd} from '@mui/icons-material';
import axios from 'axios';
import {API_URL} from '@/lib/constants';
import InviteList from '@/components/custom/discussion/event/invite/invite-list';
import {EventNewApi} from '@/types/event';

export type InviteListButtonProps = {
  event: EventNewApi
}

const InviteListButton = (props: InviteListButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <PersonAdd/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Invite users</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Invite new people</AlertDialogTitle>
          <AlertDialogDescription>
            <InviteList event={props.event}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default InviteListButton;
