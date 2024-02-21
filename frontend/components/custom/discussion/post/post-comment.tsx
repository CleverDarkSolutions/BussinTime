import {CommentNewApi, PostCommentType, ReactionNewApi} from '@/types/post';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import * as React from 'react';
import Reaction from '@/components/custom/discussion/post/reaction';
import {DeleteForever, Edit} from '@mui/icons-material';
import EditComment from '@/components/custom/discussion/post/edit-comment';
import DeleteComment from '@/components/custom/discussion/post/delete-comment';
import {useEffect, useState} from 'react';
import {API_URL} from '@/lib/constants';
import axios from 'axios';
import {formatDate, getRelativeTime} from '@/lib/utils';
import ReactionCluster from '@/components/custom/discussion/post/reaction-cluster';
import EmotePopover from '@/components/custom/discussion/post/emote-popover';
import {UserNewApi} from '@/types/auth';
import UserAvatar from '@/components/custom/global/user-avatar';

export type PostCommentProps = {
  comment: CommentNewApi
  host?: UserNewApi
}
const PostComment = (props: PostCommentProps) => {
  const userId = localStorage.getItem('userId')
  const [count, setCount] = useState<number>(0)
  const [author, setAuthor] = useState<UserNewApi>()
  const [reactions, setReactions] = useState<ReactionNewApi[]>([])
  useEffect(() => {
    axios.get(`${API_URL}/reaction/entityReactions/${props.comment.id}?reactionEntityType=COMMENT`)
      .then( (res) => {
        setReactions(res.data)
      })
  }, [])
  useEffect(() => {
    axios.get(`${API_URL}/account/${props.comment.commenterId.id}`)
      .then( (res) => { setAuthor(res.data) })
  }, [])

  return(
    <div className="m-2 rounded border-2 border-solid p-2">
      <div className="grid-rows-8 grid grid-cols-8">
        <div className="background col-span-8 rounded">
          <div className="grid grid-cols-10 gap-2">
            <div className="col-span-1 row-span-3 p-2">
              <UserAvatar id={props.comment.commenterId.id}/>
            </div>
            <div className="col-span-4 row-span-1">
              <div className="grid px-4">
                <div>{author?.username}</div>
                <div>{getRelativeTime(formatDate(props.comment.creationDate))}</div>
              </div>
            </div>
            <div className="col-span-2 row-span-1 py-1 pl-4">
              <EmotePopover
                type='COMMENT'
                entity={props.comment}
                countState={{count, setCount}}
              />
            </div>
            <div className="col-span-1 row-span-1 p-2">
              {Number(userId) === props.comment.commenterId.id && <EditComment comment={props.comment}/> }
            </div>
            <div className="col-span-1 row-span-1 p-2">
              {
                (Number(userId) === Number(props.comment.commenterId.id) && <DeleteComment comment={props.comment}/>) ||
                (Number(userId) === Number(props.host?.id) && <DeleteComment comment={props.comment}/>)
              }
            </div>
          </div>
        </div>
        <div className="col-span-8 row-span-2 overflow-hidden text-ellipsis break-words pl-1">
          <div className="text-l flex flex-row text-stone-500">{props.comment.content}</div>
        </div>
        <div className="col-span-8 row-span-2 p-2">
          <ReactionCluster
            type='COMMENT'
            id={props.comment.id}
            countState={{count, setCount}}
          />
        </div>

      </div>
    </div>
  )
}
export default PostComment
