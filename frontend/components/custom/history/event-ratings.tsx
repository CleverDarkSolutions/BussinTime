import {EventNewApi, RatingType} from '@/types/event';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '@/lib/constants';
import {Rating} from '@mui/material';
import {ScrollArea} from '@/components/ui/scroll-area';

export type EventRatingsType = {
  event: EventNewApi
}

const EventRatings = (props: EventRatingsType) => {
  const [userRatings, setRatings] = useState<RatingType[]>()
  useEffect(() => {
    axios.get(`${API_URL}/rating/entityRatings/${props.event.id}?ratedEntityType=EVENT`)
      .then((res) => {
        setRatings(res.data)
      })
  }, [])
  return(
    <ScrollArea className="h-[50vh]">
      <div className="grid">
        {userRatings && userRatings.length === 0 && <div className="text-center text-xl">No ratings yet</div>}
        {userRatings ? (
          <div>
            {userRatings.map((rating) => {
              return(
                <div className="my-4 rounded border-2 border-solid p-2">
                  <div>{rating.account.username}</div>
                  <Rating
                    value={rating.score}
                    disabled
                  />
                  <div className="overflow-hidden text-ellipsis break-words">{rating.content}</div>
                </div>
              )
            })}
          </div>
        ) : <div>Loading...</div> }
      </div>
    </ScrollArea>
  )
}

export default EventRatings
