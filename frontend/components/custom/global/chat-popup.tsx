import {AlertDialog, AlertDialogTrigger} from '@radix-ui/react-alert-dialog';
import {Button} from '@/components/ui/button';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter
} from '@/components/ui/alert-dialog';
import EventDetailsContent from '@/components/custom/home/event-details/event-details-content';
import OneOnOneChat from '@/components/custom/global/one-on-one-chat';
import {AddComment} from '@mui/icons-material';
import * as React from 'react';

export type ChatPopupType = {
  client: any,
  senderId: string | number,
  recipientId: string | number,
  sendAction: (recipientId: string | number, senderId: string | number, content: string) => void
}

const ChatPopup = (props: ChatPopupType) => {
  return(
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <AddComment/>
        </AlertDialogTrigger>
        <AlertDialogContent className="h-[70vh] w-[50vw] max-w-[50vw]">
          <OneOnOneChat
            client={props.client}
            sendAction={props.sendAction}
            recipientId={props.recipientId}
            senderId={props.senderId}
          />
          <AlertDialogFooter>
            <AlertDialogCancel className="absolute right-5 top-5">X</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ChatPopup;
