import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {DeleteForever} from '@mui/icons-material';
import axios from 'axios';
import {API_URL} from '@/lib/constants';
import {PostNewApi} from '@/types/post';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/router';

export type DeletePostProps = {
  post: PostNewApi
}

const DeletePost = (props: DeletePostProps) => {
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
              You will delete post permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={ () => {
              axios.delete(`${API_URL}/post/${props.post.id}`,
                {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                .then( (res) => {
                  toast({
                    title: 'Success!',
                    description: 'Post deleted successfully',
                  })})
                .then( () => router.reload())
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
export default DeletePost;
