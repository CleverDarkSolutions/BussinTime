import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {Edit} from '@mui/icons-material';
import EditEventForm from '@/components/custom/discussion/event/edit-event-form';
import {Post, PostNewApi} from '@/types/post';
import EditPostForm from '@/components/custom/discussion/post/edit-post-form';

export type EditPostProps = {
  post: PostNewApi
}
const EditPost = (props: EditPostProps) => {
  return(
    <div>
      <Sheet>
        <SheetTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Edit/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit post</SheetTitle>
            <SheetDescription>
              <EditPostForm post={props.post}/>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
export default EditPost;
