import {MouseEvent, useEffect, useState} from 'react';
import {User, UserNewApi} from '@/types/auth';
import axios from 'axios';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import * as React from 'react';
import {AddComment, FiberManualRecord} from '@mui/icons-material';
import {ScrollArea} from '@/components/ui/scroll-area';
import {io} from 'socket.io-client'
import { Client } from '@stomp/stompjs';
import {API_URL} from '@/lib/constants';
import ChatPopup from '@/components/custom/global/chat-popup';
import UserAvatar from '@/components/custom/global/user-avatar';
import {Input} from '@/components/ui/input';

const SockJS = require('sockjs-client')

export type ChatMessagesType = {
  recipientId: string | number,
  senderId: string | number,
  content: string[]
}

const ChatTab = () => {
  const userId = localStorage.getItem('userId')
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<UserNewApi[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessagesType[]>();
  const [search, setSearch] = useState<string>('');

  const onMessageReceived = (msg: any) => {
    console.log(msg);
  }

  const client = new Client({
    brokerURL: 'ws://localhost:8443/ws',
    // connectHeaders: {
    //   login: 'user',
    //   passcode: 'password',
    // },
    debug: function (str: string) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  // Fallback code
  if (typeof WebSocket !== 'function') {
    client.webSocketFactory = function () {
      // Note that the URL is different from the WebSocket URL
      return new SockJS('http://localhost:8443/stomp');
    };
  }

  client.onConnect = function (frame: any) {
    console.log(`Connected: ${  frame}`);
    client.subscribe('/user/public', onMessageReceived);
    client.subscribe('/app/chat', onChatMessageReceived);
  };

  client.onStompError = function (frame: any) {
    console.log(`Broker reported error: ${  frame.headers['message']}`);
    console.log(`Additional details: ${  frame.body}`);
  };

  client.activate();

  const sendMessage = (recipientId: string | number, senderId: string | number, content: string) => {
    console.log('Message sent')
    client.publish({
      destination: '/app/chat',
      body: JSON.stringify({
        recipientId: recipientId,
        senderId: senderId,
        content: content}),
    });
  }

  const onChatMessageReceived = () => {
    console.log('Message received')
  }

  useEffect( () => {
    axios.get(`${API_URL}/friendship/${userId}`)
      .then( (res) => {
        setUsers(res.data)
      })
  },[])

  const openTab = () => {
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const filteredUsers = users?.filter((user) =>
    (user?.username?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (user?.name?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        onClick={openTab}
        className={`fixed bottom-0 right-10 z-20 transition-all duration-500 ease-in-out ${isOpen ? 'translate-y-[60px]' : ''}`}
      >
        <div className="flex h-[50px] w-[250px] cursor-pointer items-center justify-center rounded-t-lg bg-blue-500 text-center text-white">
          Chat
        </div>
      </div>
      <div className={`fixed bottom-10 right-10 z-10 transition-all duration-500 ease-in-out ${isOpen ? 'h-90' : 'h-0'} w-[250px] overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md`}>
        <div
          onClick={closeChat}
          className={`absolute right-6 top-4 h-10 cursor-pointer bg-transparent${isOpen ? 'block' : 'hidden'}`}
        >
          X
        </div>
        <div className="p-4 text-xl">Chat</div>
        <Input
          placeholder="Search"
          className="mx-auto w-[90%]"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <ScrollArea className="h-[50vh]">
          <div className="p-4">
            {filteredUsers?.length === 0 && <div>Chat is available for friends only! Invite some to chat</div>}
            {filteredUsers?.map( (user) => {
              return(
                <div className="border-300-gray my-2 grid grid-cols-5 rounded border-2 border-solid p-2">
                  <div className="col-span-1 py-1">
                    <UserAvatar id={user.id}/>
                  </div>
                  <div className="col-span-3 p-2">
                    <div className="flex flex-row">{user.username}</div>
                  </div>
                  <div className="col-span-1 p-2">
                    <div className="flex flex-row">
                      <ChatPopup
                        client={client}
                        sendAction={sendMessage}
                        senderId={userId!}
                        recipientId={user.id}
                      />
                    </div>
                  </div>
                </div>
              )})}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default ChatTab
