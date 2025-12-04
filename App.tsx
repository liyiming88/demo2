import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import InputArea from './components/InputArea';
import { Message, Sender } from './types';
import { generateResponse } from './services/geminiService';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    // 1. Add User Message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.USER,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // 2. Call API
    const responseText = await generateResponse(text);

    // 3. Add Bot Message
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: Sender.BOT,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header />

      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-4xl mx-auto px-4 py-6 min-h-full flex flex-col">
          
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60 mt-10 md:mt-0">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Sparkles size={48} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">How can I help you today?</h2>
              <p className="text-gray-500 max-w-md">
                I'm powered by Google's Gemini 2.5 Flash model. I can answer questions, write creative content, and help with coding tasks.
              </p>
            </div>
          ) : (
            <div className="flex flex-col pt-2 pb-2">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              
              {isLoading && (
                <div className="flex w-full mb-6 justify-start animate-pulse">
                   <div className="flex max-w-[85%] gap-3 flex-row">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white opacity-80">
                         <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-400">Thinking...</span>
                      </div>
                   </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;