import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {DeleteForever} from '@mui/icons-material';
import {API_URL} from '@/lib/constants';
import axios from 'axios';
import {CommentNewApi} from '@/types/post';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/router';

export type DeleteCommentProps = {
  comment: CommentNewApi
}

const DeleteComment = (props: DeleteCommentProps) => {
  const {toast} = useToast()
  const router = useRouter();
  return(
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <DeleteForever/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete forever</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will delete comment permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={ () => {
              axios.delete(`${API_URL}/comment/${props.comment.id}`,
                {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                .then( (res) => {
                  toast({
                    title: 'Success!',
                    description: 'Comment deleted successfully',
                  })
                }).then( () => router.reload())
            }}
            >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeleteComment;
