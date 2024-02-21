import {Event, EventNewApi} from '@/types/event'
import {ScrollArea} from '@/components/ui/scroll-area'
import EventBoxCard from '@/components/custom/global/event-box-card';
import {Separator} from '@/components/ui/separator';
import {Input} from '@/components/ui/input';
import {useState} from 'react';

export type PastEventListProps = {
  events: EventNewApi[]
  setCurrentEvent: (event: EventNewApi) => void
}

const PastEventList = (props: PastEventListProps) => {
  const [search, setSearch] = useState('');

  // Filter events based on title
  const filteredEvents = props.events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex w-full flex-col px-2">
      <div className="grid gap-2 p-4 text-2xl">
        <div className="my-1">My past events</div>
        <Separator orientation="horizontal"/>
        <Input
          placeholder="Search for an event"
          className="mx-4 my-2 w-[93%]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ScrollArea className="h-[75vh]">
          {filteredEvents.length === 0 && <div>No past events were found</div>}
          {filteredEvents.map((event) => (
            <EventBoxCard
              event={event}
              onClick={() => props.setCurrentEvent(event)}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

export default PastEventList;
