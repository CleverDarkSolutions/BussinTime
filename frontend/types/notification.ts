import {UserNewApi} from '@/types/auth';
import {EventNewApi} from '@/types/event';

export type Notification = {
  id: number,
  recipient: UserNewApi,
  timestamp: string,
  message: string,
  notificationStatus: 'NOTICED' | 'UNNOTICED',
  notificationType: 'MESSAGE' | 'EVENT_INVITE' | 'FRIEND_INVITE' | 'SYSTEM' | 'JOIN_REQUEST'
  photoPath: string,
  event?: EventNewApi
  friendship?: {
    id: number,
    initiator: UserNewApi,
    invitationDate: string,
    receiver: UserNewApi
  },
  request: {
    event: EventNewApi,
    host: UserNewApi,
    requester: UserNewApi,
    id: string | number,
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
  }
}
