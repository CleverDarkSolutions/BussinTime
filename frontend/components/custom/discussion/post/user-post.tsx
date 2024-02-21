import {CommentNewApi, Post, PostNewApi, ReactionNewApi} from '@/types/post';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import {AddReaction, Comment, DeleteForever, Description, Edit, EventNote, PeopleAlt} from '@mui/icons-material';
import Reaction from '@/components/custom/discussion/post/reaction';
import { Card } from '@/components/ui/card';
import EventPopupInfoRow from '@/components/custom/map/popup-content/event-popup-info-row';
import {Toggle} from '@/components/ui/toggle';
import {useEffect, useState} from 'react';
import PostComment from '@/components/custom/discussion/post/post-comment';
import AddNewPostComment from '@/components/custom/discussion/post/add-new-post-comment';
import EditPost from '@/components/custom/discussion/post/edit-post';
import DeletePost from './delete-post';
import {API_URL, tags} from '@/lib/constants';
import axios from 'axios';
import {formatDate, getRelativeTime} from '@/lib/utils';
import ReactionCluster from '@/components/custom/discussion/post/reaction-cluster';
import EmotePopover from '@/components/custom/discussion/post/emote-popover';
import {HashTag} from '@/types/tags';
import {UserNewApi} from '@/types/auth';
import {EventNewApi} from '@/types/event';

export type UserPostType = {
  post: PostNewApi
  event?: EventNewApi
}
const UserPost = ({post, event}: UserPostType) => {
  const [toggleComments, setToggleComments] = useState<boolean>(false)
  const [comments, setComments] = useState<CommentNewApi[]>([])
  const [reactions, setReactions] = useState<ReactionNewApi[]>([])
  const [tags, setTags] = useState<HashTag[]>()
  const [author, setAuthor] = useState<UserNewApi>()
  const userId = localStorage.getItem('userId')
  const [count , setCount] = useState<number>(0)
  const [host, setHost] = useState<UserNewApi>()

  useEffect(() => {
    if(event !== undefined) {
      axios.get(`${API_URL}/event/host/${event?.id}`)
        .then((res) => {
          setHost(res.data.host)
          console.log(res.data)
        })
    }
  }, [event])

  useEffect(() => {
    console.log(count)
    console.log('Use effect in user-post run')
    axios.get(`${API_URL}/reaction/entityReactions/${post.id}?reactionEntityType=POST`)
      .then( (res) => {
        setReactions(res.data)
      })
  }, [count])
  useEffect(() => {
    axios.get(`${API_URL}/comment/getCommentsByPost/${post.id}`)
      .then( (res) => {
        setComments(res.data)
      })
  }, [count])
  useEffect(() => {
    axios.get(`${API_URL}/hashtag/entityHashtags/${post.id}?hashtagEntityType=POST`)
      .then( (res) => {
        setTags(res.data)
      })
  }, [count])

  useEffect(() => {
    axios.get(`${API_URL}/account/${post.posterId.id}`)
      .then( (res) => { setAuthor(res.data) })
  }, [count])

  return(
    <div
      onClick={() => setCount(count + 1)}
      className="w-[85%] p-4">
      <Card>
        <div className="grid grid-cols-10 gap-2 p-4">
          <div className="col-span-6 text-xl">{post.title}</div>
          <div className="col-span-2 mt-[-6px] pl-4">
            <EmotePopover
              type="POST"
              entity={post}
              countState={{count, setCount}}
            />
          </div>
          <div className="col-span-1">
            {
              (Number(userId) === Number(post.posterId.id) && <EditPost post={post}/>)
            }
          </div>
          <div className="col-span-1">
            {
              (Number(userId) === Number(post.posterId.id) && <DeletePost post={post}/>) ||
              (Number(userId) === Number(host?.id) && <DeletePost post={post}/>)
            }
          </div>
          <div className="col-span-5">
            <EventPopupInfoRow
              passedIcon={<PeopleAlt/>}
              label={author?.username}
              textSize='text-lg'
            />
          </div>
          <div className="col-span-5">
            <EventPopupInfoRow
              passedIcon={<EventNote/>}
              label={getRelativeTime(formatDate(post.creationDate))}
              textSize='text-lg'
            />
          </div>
          <div className="col-span-10 overflow-hidden text-ellipsis break-words">
            {post.content}
          </div>
          <div className="col-span-10">
            <Label>{tags?.map( (tag) => {
              return(
                <Badge className="mr-1">{tag.name}</Badge>
              )
            })}</Label>
          </div>

          <div
            onClick={ () => setCount(count + 1) }
            className="col-span-2">
            <Toggle onClick={ () => {
              setToggleComments(!toggleComments)
            }}>
              <div onClick={() => setCount(count + 1)}>
                <Comment/> &nbsp;
                {comments?.length}
              </div>
            </Toggle>
          </div>

          <div className="col-span-8">
            <div className="grid grid-cols-5 gap-1">
              <ReactionCluster
                id={post.id}
                type='POST'
                countState={{count, setCount}}
              />
            </div>
          </div>
        </div>
        {toggleComments && (
          <div className="p-4">
            <AddNewPostComment post={post}/>
            {comments?.length === 0 && (
              <div className="text-center text-gray-500">
                No comments yet.
              </div>
            )}
            {comments?.map( (comment) => {
              return(
                <div className="grid grid-cols-10 gap-2">
                  <div className="col-span-10">
                    <PostComment
                      comment={comment}
                      host={host}
                    />
                  </div>
                </div>
              )
            }
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

export default UserPost
