import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {Add} from '@mui/icons-material';
import NewPostForm from '@/components/custom/discussion/post/new-post-form';
import NewEventForm from '@/components/custom/home/tabs/new-event-form';

const AddNewEvent = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="grid grid-cols-6 border-2 border-gray-300 p-2">
          <div className="col-span-4 text-xl">Add new event</div>
          <div className="col-span-2">
            <Add/>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New event</SheetTitle>
          <SheetDescription>
            <NewEventForm/>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default AddNewEvent;
