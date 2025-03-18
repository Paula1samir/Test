import React from 'react';
import { Search, Globe, Facebook, Twitter, Instagram, Youtube, MessageCircle, Pointer as Pinterest } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div>Welcome to bulkify online Community Purchase.</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              Follow us:
              <div className="flex gap-2">
                <Twitter size={16} className="cursor-pointer hover:text-green-200" />
                <Facebook size={16} className="cursor-pointer hover:text-green-200" />
                <Pinterest size={16} className="cursor-pointer hover:text-green-200" />
                <MessageCircle size={16} className="cursor-pointer hover:text-green-200" />
                <Youtube size={16} className="cursor-pointer hover:text-green-200" />
                <Instagram size={16} className="cursor-pointer hover:text-green-200" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-transparent border-none text-white focus:outline-none">
                <option value="eng">Eng</option>
                <option value="esp">Esp</option>
              </select>
              <select className="bg-transparent border-none text-white focus:outline-none">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-3xl font-bold text-green-600">
            bulkify
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-600"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="text-gray-400 hover:text-green-600" />
              </button>
            </div>
          </div>

          {/* User account */}
          <div className="flex items-center">
            <button className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700">
              <Globe size={20} />
              <span>Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;