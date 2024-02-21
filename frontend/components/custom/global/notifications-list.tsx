import {useEffect, useState} from 'react';
import NotificationElement from '@/components/custom/global/notification-element';
import {ScrollArea} from '@/components/ui/scroll-area';
import {API_URL} from '@/lib/constants';
import axios from 'axios';
import {Notification} from '@/types/notification';

const NotificationsList = () => {
  const userId = localStorage.getItem('userId')
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const acceptNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }
  const declineNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }
  useEffect(() => {
    axios.get(`${API_URL}/notification/${userId}`)
      .then((res) => {
        setNotifications(res.data)
      })
  }, [])
  return(
    <div>
      <div className="my-4 text-xl">Notifications</div>
      <ScrollArea className="h-[50vh]">
        {notifications.map((notification) => {
          return(
            <NotificationElement
              acceptAction={acceptNotification}
              declineAction={declineNotification}
              notification={notification}
            />
          )
        })}
        {notifications.length === 0 && <div>No notifications</div>}
      </ScrollArea>
    </div>
  )
}

export default NotificationsList;
