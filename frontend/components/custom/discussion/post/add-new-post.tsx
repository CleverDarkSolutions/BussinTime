import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {Add, AddCircleOutline, DeleteForever} from '@mui/icons-material';
import NewPostForm from '@/components/custom/discussion/post/new-post-form';
import {EventNewApi} from '@/types/event';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export type AddNewPostProps = {
  event: EventNewApi
}
const AddNewPost = (props: AddNewPostProps) => {
  return(
    <Sheet>
      <SheetTrigger>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AddCircleOutline/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New post</SheetTitle>
          <SheetDescription>
            <NewPostForm event={props.event}/>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default AddNewPost;
