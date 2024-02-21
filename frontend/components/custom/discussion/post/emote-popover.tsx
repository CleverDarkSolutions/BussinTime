import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {AddReaction} from '@mui/icons-material';
import {emoteComponents} from '@/components/custom/discussion/post/reaction-cluster';
import {API_URL} from '@/lib/constants';
import axios from 'axios';
import {CommentNewApi, PostNewApi, ReactionNewApi} from '@/types/post';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

export type EmotePopoverProps = {
  entity: PostNewApi | CommentNewApi
  type: 'POST' | 'COMMENT',
  countState: { count: number; setCount: React.Dispatch<React.SetStateAction<number>> };
}

const EmotePopover = (props: EmotePopoverProps) => {
  const router = useRouter()
  const [reactions, setReactions] = useState<ReactionNewApi[]>([])
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    axios.get(`${API_URL}/reaction/entityReactions/${props.entity.id}?reactionEntityType=${props.type}`)
      .then( (res) => {
        setReactions(res.data)
      }).then(
        () => console.log(reactions)
      )
  }, [props.countState.count])
  const accountId = localStorage.getItem('userId')
  const handleIncrement = () => {
    props.countState.setCount(props.countState.count + 1);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline">
          <AddReaction/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid grid-cols-4">
          {emoteComponents.map((emote) => {
            // Find the matching reaction (if it exists)
            const matchingReaction = reactions.find((reaction: ReactionNewApi) => reaction.reactionType === emote.label && reaction.account.id === Number(userId));

            return (
              <div
                className="col-span-1"
                key={emote.label}>
                {matchingReaction?.account.id === Number(userId) ? (
                  <Button
                    onClick={() => {
                      handleIncrement()
                      axios.delete(`${API_URL}/reaction/${matchingReaction.id}`, {
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                      })
                    }}
                    variant="outline"
                    className="rounded-full border-2 border-solid bg-slate-500 p-2">
                    {emote.icon}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleIncrement()
                      axios.post(`${API_URL}/reaction?reactionEntityType=${props.type}&entityId=${props.entity.id}&reactionType=${emote.label}&accountId=${accountId}`, {}, {
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                      })
                    }}
                    variant="outline"
                    className="rounded-full border-2 border-solid p-2">
                    {emote.icon}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default EmotePopover
