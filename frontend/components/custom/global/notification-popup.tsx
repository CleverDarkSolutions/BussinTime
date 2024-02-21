
import {AddComment, Notifications} from '@mui/icons-material';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialog
} from '@/components/ui/alert-dialog';
import * as React from 'react';
import NotificationsList from '@/components/custom/global/notifications-list';
import {useEffect, useState} from 'react';
import {API_URL} from '@/lib/constants';
import axios from 'axios';

const NotificationPopup = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    axios.get(`${API_URL}/notification/${userId}`)
      .then((res) => {
        setNotifications(res.data)
      })
  }, [])
  return(
    <AlertDialog>
      <AlertDialogTrigger>
        <Notifications className="mx-2"/>
        ({notifications.length})
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[70vh] w-[25vw] max-w-[35vw]">
        <NotificationsList/>
        <AlertDialogFooter>
          <AlertDialogCancel className="absolute right-5 top-5">X</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default NotificationPopup;
