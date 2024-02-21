import {useEffect, useRef, useState} from 'react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {API_URL} from '@/lib/constants';
import axios from 'axios';
import {chatDate, getRelativeTime, sortByTimestampOldestToNewest} from '@/lib/utils';
import {UserNewApi} from '@/types/auth';

export type OneOnOneChatType = {
  client: any
  senderId: string | number,
  recipientId: string | number
  sendAction: (recipientId: string | number, senderId: string | number, content: string) => void
}

export type MessageType = {
  id: string | number,
  content: string,
  messageTime: string,
  messageType: string,
  chatName: string,
  sender: { id: string },
  recipient: { id: string },
}

const OneOnOneChat = (props: OneOnOneChatType) => {
  const [message, setMessage] = useState('');
  const [yourMessages, setYourMessages] = useState([]);
  const [theirMessages, setTheirMessages] = useState([]);
  const [messages, setMessages] = useState<MessageType[]>([])
  const [sendCount, setSendCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const scrollRef = useRef(null);
  const [recipient, setRecipient] = useState('');
  const userId = localStorage.getItem('userId');
  const client = props.client;

  useEffect(() => {
    axios.get(`${API_URL}/account/${props.recipientId}`)
      .then((res) => {
        setRecipient(res.data.username)
      })
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      axios.get(`${API_URL}/messages/${props.senderId}/${props.recipientId}`)
        .then((res) => {
          setMessages(sortByTimestampOldestToNewest(res.data))
        }).then(() => {
          console.log(messages)
        })
    }
    client.subscribe(`/user/${userId}/queue/messages`, (logs: any) => {
      console.log(logs)
    });
    fetchMessages()
    const intervalId = setInterval(fetchMessages, 1000);
    return () => clearInterval(intervalId);
  }, [])

  const handleSendMessage = () => {
    setIsButtonDisabled(true);

    // Simulate sending the message
    setTimeout(() => {
      props.sendAction(props.recipientId, userId!, message);
      setIsButtonDisabled(false);
    }, 2000);
    setMessage('');
  };

  return(
    <div>
      <h1>Chat with {recipient}</h1>
      <ScrollArea className='h-[50vh]' >
        {messages.map( (message: MessageType) => {
          if(message.sender.id == userId) {
            return (
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <div className="my-4 rounded bg-gray-100 p-4">
                    <div className="col-span-1">
                      <div>{getRelativeTime(message.messageTime)}</div>
                    </div>
                    <div className="col-span-7 overflow-hidden text-ellipsis break-words">
                      {message.content}
                    </div>
                  </div>
                </div>
                <div className="col-span-1"/>
              </div>
            )
          } else {
            return (
              <div className="grid grid-cols-2">
                <div className="col-span-1"/>
                <div className="col-span-1">
                  <div className="my-4 rounded bg-yellow-100 p-4">
                    <div className="col-span-1">{getRelativeTime(message.messageTime)}</div>
                    <div className="col-span-7 overflow-hidden text-ellipsis break-words">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </ScrollArea>
      <div className="my-8 grid grid-cols-6 gap-2">
        <div className="col-span-5">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            className="w-full"
          />
        </div>
        <div className="col-span-1">
          <Button
            className="w-full"
            onClick={handleSendMessage}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OneOnOneChat;
