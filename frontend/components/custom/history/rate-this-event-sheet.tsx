import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {Add} from '@mui/icons-material';
import NewPostForm from '@/components/custom/discussion/post/new-post-form';
import RateThisEvent from '@/components/custom/history/rate-this-event';
import {Event} from '@/types/event';
import { Button } from '@/components/ui/button';

export type RateThisEventSheetProps = {
  event: Event
}
const RateThisEventSheet = (props: RateThisEventSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          Send review
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your review of {props.event.title} event</SheetTitle>
          <SheetDescription>
            <RateThisEvent event={props.event}/>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default RateThisEventSheet
