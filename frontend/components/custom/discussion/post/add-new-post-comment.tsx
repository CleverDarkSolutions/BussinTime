import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {Add, Description, Edit, EventNote, PeopleAlt} from '@mui/icons-material';
import NewPostForm from '@/components/custom/discussion/post/new-post-form';
import NewCommentForm from '@/components/custom/discussion/post/new-comment-form';
import {Post, PostNewApi} from '@/types/post';
import UserPost from '@/components/custom/discussion/post/user-post';
import EventPopupInfoRow from '@/components/custom/map/popup-content/event-popup-info-row';
import {Separator} from '@/components/ui/separator';
import {Button} from '@/components/ui/button';
import {UserNewApi} from '@/types/auth';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '@/lib/constants';

export type AddNewPostCommentType = {
  post: PostNewApi
}

const AddNewPostComment = (props: AddNewPostCommentType) => {
  const [author, setAuthor] = useState<UserNewApi>();
  useEffect(() => {
    axios.get(`${API_URL}/account/${props.post.posterId.id}`)
      .then( (res) => { setAuthor(res.data) })
  }, []);
  return (
    <Sheet>
      <SheetTrigger>
        <Button>Add new comment</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comment on this post</SheetTitle>
          <SheetDescription>
            <EventPopupInfoRow
              passedIcon={<Edit/>}
              label={props.post.title}
              textSize="text-lg"
            />
            <EventPopupInfoRow
              passedIcon={<PeopleAlt/>}
              label={author?.username}
              textSize="text-lg"
            />
            <EventPopupInfoRow
              passedIcon={<Description/>}
              label={props.post.content}
              textSize="text-lg"
            />
            <Separator orientation="horizontal"/>
            <NewCommentForm postId={props.post.id}/>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default AddNewPostComment;
