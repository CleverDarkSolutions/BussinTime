import {ScrollArea} from '@/components/ui/scroll-area';
import {Separator} from '@/components/ui/separator';
import EventBoxCard from '@/components/custom/global/event-box-card';
import {Button} from '@/components/ui/button';
import UserPost from '@/components/custom/discussion/post/user-post';
import PostComment from '@/components/custom/discussion/post/post-comment';
import {useEffect, useState} from 'react';
import {EventNewApi} from '@/types/event';
import {CommentNewApi, PostNewApi} from '@/types/post';
import axios from 'axios';
import {API_URL} from '@/lib/constants';

export type RecentActivityProps = {
  userId: number
}
const RecentActivity = (props: RecentActivityProps) => {
  const [maxEvents, setMaxEvents] = useState<number>(2)
  const [maxPosts, setMaxPosts] = useState<number>(2)
  const [maxComments, setMaxComments] = useState<number>(2)
  const [events, setEvents] = useState<EventNewApi[]>([])
  const [posts, setPosts] = useState<PostNewApi[]>([])
  const [comments, setComments] = useState<CommentNewApi[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/event/getEventsByAccount/${props.userId}`)
      .then( (res) => {
        setEvents(res.data)
      })
    // axios.get(`${API_URL}/post/getPostsByAccount/${props.userId}`)
    //   .then( (res) => {
    //     setPosts(res.data)
    //   })
    // axios.get(`${API_URL}/comment/getCommentsByAccount/${props.userId}`)
    //   .then( (res) => {
    //     setComments(res.data)
    //   })
  }, [])
  return(
    <div>
      <div className="text-2xl">
        Recent activity
      </div>
      <ScrollArea className='h-[90vh]'>
        <div className="my-4 text-lg">
          Events
          <Separator/>
          {events.slice(0,maxEvents).map((event) => (
            <EventBoxCard
              event={event}
              onClick={() => {} }/>
          ))}
          {events && (
            <Button
              className='m-4'
              onClick={() => setMaxEvents((prevState) => prevState + 2 )}>Show more</Button>
          )}
        </div>
        {/*<div className="my-4 text-lg">*/}
        {/*  Posts*/}
        {/*  <Separator/>*/}
        {/*  {posts.slice(0,maxPosts).map((post) => <UserPost post={post}/> )}*/}
        {/*  { posts && (*/}
        {/*    <Button*/}
        {/*      className='m-4'*/}
        {/*      onClick={() => setMaxPosts((prevState) => prevState + 2 )}>Show more</Button>*/}
        {/*  )}*/}
        {/*</div>*/}
        {/*<div className="my-4 text-lg">*/}
        {/*  Comments*/}
        {/*  <Separator/>*/}
        {/*  {comments.slice(0,maxComments).map((comment) => <PostComment comment={comment}/> )}*/}
        {/*  {comments && (*/}
        {/*    <Button*/}
        {/*      className='m-4'*/}
        {/*      onClick={() => setMaxComments((prevState) => prevState + 2 )}>Show more</Button>*/}
        {/*  )}*/}
        {/*</div>*/}
      </ScrollArea>
    </div>
  )
}

export default RecentActivity
