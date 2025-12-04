import React from 'react';
import { Bot, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Gemini Chat</h1>
          <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
             Powered by Flash 2.5 <Zap size={12} className="text-yellow-500 fill-yellow-500" />
          </p>
        </div>
      </div>
      <div className="hidden sm:block">
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
          Online
        </span>
      </div>
    </header>
  );
};

export default Header;