import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import NewPostForm from '@/components/custom/discussion/post/new-post-form';
import EditEventForm from '@/components/custom/discussion/event/edit-event-form';
import {Event, EventNewApi} from '@/types/event';
import { Edit } from '@mui/icons-material';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export type EditEventProps = {
    event: EventNewApi
}
const EditEvent = (props: EditEventProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Edit/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit event</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit event</SheetTitle>
          <SheetDescription>
            <EditEventForm event={props.event}/>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default EditEvent;
