import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {Event} from '@/types/event'
import {PeopleAlt} from '@mui/icons-material';
import EventPopupInfoRow from '@/components/custom/map/popup-content/event-popup-info-row';

export type EventUsersType = {
  event: Event
}

const EventUsers = ({event}: EventUsersType) => {
  return(
    <div>
      <Popover>
        <PopoverTrigger>
          <EventPopupInfoRow
            passedIcon={<PeopleAlt/>}
            label={`Participants (${event.participants?.length})`}
            textSize='text-lg'
          />
        </PopoverTrigger>
        <PopoverContent>
          {event.participants?.map( (user) => {
            return(
              <div>User {user}</div>
            )
          })}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default EventUsers
