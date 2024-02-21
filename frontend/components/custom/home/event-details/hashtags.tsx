import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import {Event, EventNewApi} from '@/types/event';
import {API_URL, tags} from '@/lib/constants';
import {useEffect, useState} from 'react';
import {HashTag} from '@/types/tags';
import axios from 'axios';

export type EventTagsProps = {
  id: string | number,
  type: 'POST' | 'EVENT' | 'ACCOUNT'
}

const Hashtags = (props: EventTagsProps) => {
  const [hashtags, setHashtags] = useState<HashTag[]>([])
  useEffect(() => {
    axios.get(  `${API_URL}/hashtag/entityHashtags/${props.id}?hashtagEntityType=${props.type}`)
      .then( (res) => {
        setHashtags(res.data)
      })
  }, [])
  return(
    <div className="row=span-2 py-4">
      <Label>{hashtags.map( (hashtag) => {
        return(
          <Badge className="mb-1 mr-1">{hashtag.name}</Badge>
        )
      })}</Label>
    </div>
  )
}

export default Hashtags
