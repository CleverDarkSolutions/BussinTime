import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {ReactElement, useEffect, useState} from 'react';
import {ReactionNewApi} from '@/types/post'
import {CheckCircle, Favorite, PriorityHigh, Stars, ThumbUp} from '@mui/icons-material';

export type ReactionType = {
  reaction: ReactionNewApi
}
const Reaction = ({reaction}: ReactionType) => {

  const iconComponents = [
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

  const [selectedIcon, setSelectedIcon] = useState<ReactElement>(<Favorite/>)

  useEffect( () => {
    const filteredIcon = iconComponents.filter( (item) => {
      return item.label === reaction.reactionType
    })
    setSelectedIcon(filteredIcon[0]?.icon)
  }, [])

  return(
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="mt-1">
              {selectedIcon}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>{reaction.reactionType}</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default Reaction
