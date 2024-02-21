import {PopoverTrigger} from '@radix-ui/react-popover';
import {MoreVert} from '@mui/icons-material';
import {Popover, PopoverContent} from '@/components/ui/popover';
import * as React from 'react';
import {useRouter} from 'next/router';
import {UserNewApi} from '@/types/auth';
import {API_URL} from '@/lib/constants';
import axios, {AxiosError} from 'axios';
import {EventNewApi} from '@/types/event';
import {useToast} from '@/components/ui/use-toast';
import {useEffect, useState} from 'react';

export type UserPopoverProps = {
  user: UserNewApi
  kickFromEvent: boolean
  eventId?: number | string | undefined
}
const UserPopover = (props: UserPopoverProps) => {
  const {toast} = useToast()
  const router = useRouter()
  const userId = localStorage.getItem('userId')
  const [check, setCheck] = useState<boolean>()
  useEffect(() => {
    axios.get(`${API_URL}/friendship/checkIfFriend?accountId=${userId}&userToCheckId=${props.user.id}`)
      .then((res) => {
        setCheck(res.data)
      })
  }, [])
  if(props.user.id !== Number(userId)) return (
    <div>
      <Popover>
        <PopoverTrigger>
          <MoreVert />
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid cursor-pointer grid-cols-1">
            <div
              onClick={() => router.push(`/profile/${props.user.id}/profile`)}
              className="col-span-1 p-2"
            >
              View profile
            </div>
            { !check ? (
              <div
                onClick={() =>
                  axios.post(`${API_URL}/friendship?initiator_id=${userId}&receiver_id=${props.user.id}`).then(
                    () => {
                      toast({
                        title: 'Success!',
                        description: 'Friend request sent',
                      });
                    }
                  )}
                className="col-span-1 p-2"
              >
                Add to friends
              </div>
            ) :  (
              <div
                onClick={() =>
                  axios.delete(`${API_URL}/friendship?user1Id=${props.user.id}&user2Id=${userId}`)
                    .then(() => {
                      toast({
                        title: 'Success!',
                        description: 'Friend removed',
                      });
                      router.reload();
                    })} //TODO add params
                className="col-span-1 p-2"
              >
                Delete from friends
              </div>
            ) }

            {props.kickFromEvent && (
              <div
                onClick={() => {
                  axios
                    .delete(`${API_URL}/event/removeFromEvent/${props.eventId}/${props.user.id}`)
                    .then(() => {
                      toast({
                        title: 'Success!',
                        description: 'User kicked from event',
                      });
                      router.reload();
                    })
                    .catch((err: AxiosError) => {
                      if(err.response?.status === 409) {
                        toast({
                          title: 'Error!',
                          description: 'Friendship is already established with this user or invitation is pending',
                        });
                      }
                      else{
                        toast({
                          title: 'Error!',
                          description: 'Something went wrong',
                        });
                      }
                    })
                }}
                className="col-span-1 p-2"
              >
                Kick from event
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
  else return null
}

export default UserPopover
