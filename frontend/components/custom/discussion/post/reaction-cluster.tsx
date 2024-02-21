import {useEffect, useState} from 'react';
import {CommentNewApi, ReactionNewApi} from '@/types/post';
import axios from 'axios';
import {API_URL} from '@/lib/constants';
import {CheckCircle, Favorite, Stars, ThumbUp} from '@mui/icons-material';

export type ReactionClusterType = {
  id: string | number,
  type: 'POST' | 'COMMENT',
  countState: { count: number; setCount: React.Dispatch<React.SetStateAction<number>> };
}

export const emoteComponents = [
  {
    icon: <Favorite/>,
    label: 'SHOCKED'
  },
  {
    icon: <ThumbUp/>,
    label: 'HAPPY'
  },
  {
    icon: <CheckCircle/>,
    label: 'SAD'
  },
  {
    icon: <Stars/>,
    label: 'ANGRY'
  },
]

const ReactionCluster = (props: ReactionClusterType) => {
  const groupReactions = (reactions: ReactionNewApi[]) => {
    const groupedReactions = new Map()
    reactions.forEach( (reaction) => {
      if(groupedReactions.has(reaction.reactionType)){
        groupedReactions.set(reaction.reactionType, groupedReactions.get(reaction.reactionType) + 1)
      } else {
        groupedReactions.set(reaction.reactionType, 1)
      }
    })
    return groupedReactions
  }

  const [reactions, setReactions] = useState<ReactionNewApi[]>([])
  const [groupedReactions, setGroupedReactions] = useState<Map<string, number>>(new Map())

  useEffect(() => {
    console.log('Use effect called in reaction-cluster');
    axios.get(`${API_URL}/reaction/entityReactions/${props.id}?reactionEntityType=${props.type}`)
      .then( (res) => {
        setReactions(res.data)
        setGroupedReactions(groupReactions(res.data))
      })
  }, [props.countState.count])

  return(
    <div className="mt-[6px] flex items-center space-x-2">
      {Array.from(groupedReactions.keys()).map( (key) => {
        const filteredIcon = emoteComponents.filter( (item) => {
          return item.label === key
        })
        return(
          <div className="flex items-center space-x-1">
            <div className="text-sm">{filteredIcon[0]?.icon}</div>
            <div className="text-sm">{groupedReactions.get(key)}</div>
          </div>
        )})}
    </div>
  )
}

export default ReactionCluster;
