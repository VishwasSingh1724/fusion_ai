'use client';
import Header from '@/components/Header';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { MessageSquare, SendHorizonal } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import Markdown from 'react-markdown';
import { toast } from 'react-toastify';

// Define Message Type
interface Message {
  user: string;
  response: string;
  isSaved?: boolean;
}

const Conversation = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const storedMessages = localStorage.getItem('conversationHistory');
      return storedMessages ? (JSON.parse(storedMessages) as Message[]).reverse() : [];
    }
    return [];
  });

  const [isSending, setIsSending] = useState<boolean>(false);

  const userInfo = useUser();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('conversationHistory', JSON.stringify([...messages].reverse()));
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0; // Keep scroll at the top for the newest messages
    }
  }, [messages]);

  const onSendMessage = async () => {
    if (!message || isSending) return;

    setIsSending(true);

    try {
      const response = await axios.post('/api/conversation', { 
        userPrompt: message,
        email: userInfo?.user?.primaryEmailAddress?.emailAddress 
      });

      const data = response.data;

      if (data.error === 'Insufficient credits.') {
        toast.error('You do not have enough credits to send a message.');
        setIsSending(false);
        return;
      }

      if (!response.status || data.error) {
        toast.error(data.error || 'An unexpected error occurred.');
        setIsSending(false);
        return;
      }

      const responseText = typeof data === 'string' ? data : data.text;

      setMessages((prevMessages) => [{ user: message, response: responseText }, ...prevMessages]);

      setMessage('');
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    }

    setIsSending(false);
  };

  const onDeleteMessage = (index: number) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
  };

  const onSaveMessage = async (index: number) => {
    const { user, response, isSaved } = messages[index];

    if (isSaved) return;

    try {
      await axios.post('/api/save-conversation', {
        userChat: user,
        AiChat: response,
        email: userInfo?.user?.primaryEmailAddress?.emailAddress, 
      });

      const updatedMessages = [...messages];
      updatedMessages[index].isSaved = true;
      setMessages(updatedMessages);
      toast.success('Chat message saved successfully');
    } catch (error) {
      toast.error('Failed to save message');
    }
  };

  return (
    <div className="pt-16 pl-4 pr-4 md:pl-64 ml-4">
      <Header
        title="Conversation"
        description="Generates code by leveraging the power of AI"
        icon={MessageSquare}
        iconColor="red"
        bgColor="red"
      />

      <div className="flex items-center bg-slate-50 lg:w-[60%] w-full rounded-lg shadow-lg flex-wrap pb-4 pt-4 md:p-0 gap-6 justify-between">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="p-3 lg:p-4 m-3 bg-slate-100 rounded-md outline-none flex-grow"
        />
        <button
          onClick={onSendMessage}
          disabled={isSending}
          className="mr-4 bg-red-500 text-white text-lg p-2 rounded-md font-bold lg:p-3 shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? 'Sending...' : 'Send'}
          <SendHorizonal />
        </button>
      </div>

      {messages.length > 0 && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
          <div
            ref={chatContainerRef}
            className="max-h-[66vh] overflow-y-auto pr-4 space-y-4"
          >
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col gap-4">
                {/* User message on right */}
                <div className="flex justify-end">
                  <div className="bg-sky-900 text-white p-4 rounded-2xl shadow-md max-w-[50%]">
                    <div className="text-sm font-medium text-white">You</div>
                    <div className="text-lg">{msg.user}</div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => onSaveMessage(index)}
                        className={`text-${msg.isSaved ? 'green' : 'white'}-300 hover:underline`}
                      >
                        {msg.isSaved ? 'Saved' : 'Save'}
                      </button>
                      <button
                        onClick={() => onDeleteMessage(index)}
                        className="text-red-200 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI message on left */}
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-white p-4 rounded-2xl shadow-md max-w-[50%]">
                    <div className="text-sm font-medium text-gray-300">AI Assistant</div>
                    <div className="prose prose-sm prose-invert max-w-none">
                      <Markdown>{msg.response}</Markdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
