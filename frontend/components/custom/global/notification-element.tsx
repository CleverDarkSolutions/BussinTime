import {Clear, Done, Event, PeopleAlt} from '@mui/icons-material';
import UserAvatar from '@/components/custom/global/user-avatar';
import {Notification} from '@/types/notification';
import axios from 'axios';
import {API_URL} from '@/lib/constants';
import {useEffect} from 'react';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/router';

export type NotificationElementProps = {
  notification: Notification,
  acceptAction: (id: number) => void,
  declineAction: (id: number) => void
}

const NotificationElement = (props: NotificationElementProps) => {
  useEffect(() => {
    axios.put(`${API_URL}/notification/setNotificationToNoticed?notificationId=${props.notification.id}`)
  }, [])
  const userId = localStorage.getItem('userId')
  const eventId = props.notification.event?.id
  const {toast} = useToast();
  const router = useRouter();
  return(
    <div>
      {props.notification.notificationType === 'FRIEND_INVITE' ? (
        <div className="m-2 grid grid-cols-6 grid-rows-1 rounded border-2 border-solid p-2">
          <div className="col-span-1 row-span-1">
            <UserAvatar id={1}/>
          </div>
          <div className="col-span-1 row-span-1">
            <PeopleAlt/>
          </div>
          <div className="col-span-3 row-span-1">
            {props.notification.notificationStatus === 'UNNOTICED' && (<div>NEW</div>)}
            {props.notification.message}
          </div>
          <div className="col-span-1 row-span-1 cursor-pointer">
            <div
              className="cursor-pointer"
              onClick={() => {
                axios.put(`${API_URL}/friendship/changeStatus/${props.notification.friendship?.id}?friendshipStatus=ACCEPTED`)
                  .then((res) => {
                    toast({
                      title: 'Friend request accepted',
                    })
                    props.acceptAction(props.notification.id)
                    router.reload()
                  })
              }}>
              <Done
                style={{ color: '#00CC00'}}
              />
            </div>
            &nbsp;
            <div>
              <Clear
                onClick={() => {
                  axios.put(`${API_URL}/friendship/changeStatus/${props.notification.friendship?.id}?friendshipStatus=REJECTED`)
                    .then((res) => {
                      toast({
                        title: 'Friend request rejected',
                      })
                      props.declineAction(props.notification.id)
                      router.reload()
                    })
                }}
                style={{ color: '#FF0000'}}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="m-2 grid grid-cols-6 grid-rows-1 rounded border-2 border-solid p-2">
          <div className="col-span-1 row-span-1">
            <UserAvatar id={1}/>
          </div>
          <div className="col-span-1 row-span-1">
            <Event/>
          </div>
          <div className="col-span-3 row-span-1">
            {props.notification.message}
          </div>
          <div className="col-span-1 row-span-1 cursor-pointer">
            <div onClick={() => {
              if(props.notification.notificationType === 'JOIN_REQUEST'){
                console.log('Join_request')
                axios.post(`${API_URL}/event/joinEvent/${props.notification.request.requester.id}/${props.notification.request.event.id}`)
                  .then((res) => {
                    toast({
                      title: 'Success!',
                      description: 'You have accepted the join request.'
                    })
                  })
                props.acceptAction(props.notification.id)
              }
              else if(props.notification.notificationType === 'EVENT_INVITE'){
                axios.post(`${API_URL}/event/joinEvent/${userId}/${eventId}`)
                  .then((res) => {
                    toast({
                      title: 'Success!',
                      description: 'You have joined the event'
                    })
                    props.acceptAction(props.notification.id)
                    router.reload()
                  })
              }
            }}>
              <Done
                style={{ color: '#00CC00'}}
              />
            </div>
            &nbsp;
            <div onClick={() => {
              axios.delete(`${API_URL}/event/rejectInvitation?accountId=${userId}&eventId=${props.notification.request.event.id}`)
                .then((res) => {
                  toast({
                    title: 'Success!',
                    description: 'You have rejected the invitation.'
                  })
                  router.reload()
                  props.declineAction(props.notification.id)
                })
            }}>
              <Clear
                style={{ color: '#FF0000'}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationElement;
