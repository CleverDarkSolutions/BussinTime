import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Event, EventNewApi, AverageRatingType} from '@/types/event';
import {useToast} from '@/components/ui/use-toast';
import EventPopupInfoRow from '@/components/custom/map/popup-content/event-popup-info-row';
import {Description, Edit, EventNote, LocationOn} from '@mui/icons-material';
import {Separator} from '@/components/ui/separator';
import {formatDate} from '@/lib/utils';
import {API_URL} from '@/lib/constants';
import axios, {AxiosError} from 'axios';
import { Rating } from '@mui/material';
import {useRouter} from 'next/router';
import EventRatingsPopup from '@/components/custom/history/event-ratings-popup';
import {ScrollArea} from '@/components/ui/scroll-area';

export type RateThisEventProps = {
  event: EventNewApi
}

const RateThisEvent = (props: RateThisEventProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [value, setValue] = useState<number | null>(0);
  const [comment, setComment] = useState<string | null>('');
  const [rating, setRating] = useState<AverageRatingType>();
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    axios.get(`${API_URL}/rating/getAverage/${props.event.id}?ratedEntityType=EVENT`)
      .then((res) => {
        setRating(res.data)
        console.log(res.data)
      })
    setValue(0)
    setComment('')
  }, [props.event])
  return(
    <ScrollArea className="h-[75vh]">
      <div className="flex flex-col p-2">
        <span className="py-4 text-2xl font-bold">Rate this event</span>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <div>Average rating:</div>
            {rating && (
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <Rating
                    name="avg"
                    value={Number(rating.averageScore)}
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  ({isNaN(Number(rating.averageScore)) ? 0 : rating.averageScore})
                </div>
              </div>
            )}
          </div>
          <div className="col-span-1 flex flex-col">
            <EventRatingsPopup event={props.event}/>
          </div>
        </div>
        <EventPopupInfoRow
          passedIcon={<Edit/>}
          label={props.event.name}
          textSize="text-lg"
        />
        <EventPopupInfoRow
          passedIcon={<EventNote/>}
          label={`${formatDate(props.event.startDate)} - ${formatDate(props.event.endDate)}` || 'No date'}
          textSize="text-lg"
        />
        <EventPopupInfoRow
          passedIcon={<LocationOn/>}
          label={props.event.localization.city}
          textSize="text-lg"
        />
        <ScrollArea className="h-[10vh]">
          <EventPopupInfoRow
            passedIcon={<Description/>}
            label={props.event.description}
            textSize="text-lg"
          />
        </ScrollArea>
        <Separator orientation="horizontal"/>
        <div className="mt-4 flex flex-col">
          <div className="text-lg font-bold">Rating</div>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>
        <div>
          <div className="mt-4 text-lg font-bold">Review</div>
          <textarea
            className="mt-4 h-32 w-full rounded-md border-2 border-gray-300 p-2"
            placeholder="Write your review here..."
            onChange={(event) => {
              setComment(event.target.value)
            }}
            value={comment!}
          >
          </textarea>
        </div>
        <Button
          disabled={comment?.length! > 100}
          className="mt-4"
          onClick={() => {
            axios.post(`${API_URL}/rating/addRating/${props.event.id}?ratedEntityType=EVENT&accountId=${userId}`, {
              score: value,
              content: comment
            }, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }).then( () => {
              toast({
                title: 'Your review has been submitted',
                description: 'Thank you for your feedback!',
                duration: 5000,
              })
              setComment('')
              setValue(0)
              router.reload()
            } ).catch( (err: AxiosError) => {
              if(err.response?.status === 409){
                toast({
                  title: 'Error',
                  description: 'You have already rated this event!',
                  duration: 5000,
                })
              }
              else{
                toast({
                  title: 'Error',
                  description: err.message,
                  duration: 5000,
                })
              }
            })
            console.log(props.event)
          }}
        >
          Submit</Button>
      </div>
    </ScrollArea>
  )
}

export default RateThisEvent
