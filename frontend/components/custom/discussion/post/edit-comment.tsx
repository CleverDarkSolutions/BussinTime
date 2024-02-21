import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {Edit} from '@mui/icons-material';
import EditPostForm from '@/components/custom/discussion/post/edit-post-form';
import {CommentNewApi, PostCommentType} from '@/types/post';
import EditCommentForm from '@/components/custom/discussion/post/edit-comment-form';

export type EditCommentProps = {
  comment: CommentNewApi
}
const EditComment = (props: EditCommentProps) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Edit/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit comment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit comment</SheetTitle>
            <SheetDescription>
              <EditCommentForm comment={props.comment}/>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default EditComment;
