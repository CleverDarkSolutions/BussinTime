import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import EventPopupInfoRow from '@/components/custom/map/popup-content/event-popup-info-row';
import {Chat, PeopleAlt} from '@mui/icons-material';
import {Event} from '@/types/event';

export type EventDiscussionType = {
  event: Event
}

const EventDiscussion = ({event}: EventDiscussionType) => {
  return(
    <div>
      <Popover>
        <PopoverTrigger>
          <EventPopupInfoRow
            passedIcon={<Chat/>}
            label='Discussion'
            textSize='text-lg'
          />
        </PopoverTrigger>
        <PopoverContent>
          Comments etc
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default EventDiscussion
