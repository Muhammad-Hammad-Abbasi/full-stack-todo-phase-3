'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { API_URL } from '@/lib/api';
import { X, Send, Sparkles, MessageSquare, History, Plus } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
}

interface Conversation {
  id: number;
  title: string;
  updated_at: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversations = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/conversations`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (e) {
      console.error("Failed to fetch sessions", e);
    }
  }, []);

  const loadHistory = useCallback(async (convId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/conversations/${convId}/history`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        setActiveConvId(convId);
        setShowHistory(false);
      }
    } catch (e) {
      console.error("Failed to load history", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.id);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen && userId) {
      fetchConversations();
    }
  }, [isOpen, userId, fetchConversations]);

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleNewChat = () => {
    setActiveConvId(null);
    setMessages([]);
    setShowHistory(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !userId || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/${userId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
            message: userMsg,
            conversation_id: activeConvId 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Chat failed');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      
      if (!activeConvId) {
          setActiveConvId(data.conversation_id);
          fetchConversations();
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={onClose} />}

      <aside className={`fixed right-0 top-0 h-full w-80 md:w-[400px] z-50 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full bg-slate-50/95 backdrop-blur-2xl border-l border-[#EB6824]/20 shadow-[-8px_0_40px_rgba(0,0,0,0.08)] flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EB6824]/10 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#EB6824] rounded-xl shadow-lg shadow-[#EB6824]/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 leading-none">AI Assistant</h3>
                <span className="text-[10px] text-[#EB6824] font-bold uppercase tracking-wider mt-1 block">
                    {activeConvId ? 'Active Session' : 'New Session'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
                <button 
                    onClick={() => setShowHistory(!showHistory)} 
                    className={`p-2 rounded-full transition-colors ${showHistory ? 'bg-[#EB6824] text-white' : 'hover:bg-slate-100 text-slate-400'}`}
                    title="History"
                >
                    <History className="h-5 w-5" />
                </button>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                    <X className="h-5 w-5" />
                </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative flex flex-col">
            
            {/* History Overlay */}
            {showHistory && (
                <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur flex flex-col animate-in fade-in duration-200">
                    <div className="p-4 border-b flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 px-2 uppercase tracking-tight">Recent Sessions</span>
                        <Button variant="ghost" size="sm" onClick={handleNewChat} className="text-[#EB6824] hover:bg-[#EB6824]/5">
                            <Plus className="h-4 w-4 mr-1" /> New Chat
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {conversations.length === 0 ? (
                            <p className="text-center text-xs text-slate-400 py-10">No previous sessions found.</p>
                        ) : (
                            conversations.map(c => (
                                <button 
                                    key={c.id} 
                                    onClick={() => loadHistory(c.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                                        activeConvId === c.id 
                                        ? 'bg-[#EB6824]/5 border-[#EB6824]/20 text-[#EB6824] font-medium' 
                                        : 'bg-transparent border-transparent hover:bg-slate-100 text-slate-600'
                                    }`}
                                >
                                    <div className="truncate">{c.title}</div>
                                    <div className="text-[10px] opacity-60 mt-0.5">{new Date(c.updated_at).toLocaleDateString()}</div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.length === 0 && !isLoading && (
                    <div className="text-center py-12 space-y-4">
                        <div className="w-16 h-16 bg-[#EB6824]/10 rounded-full flex items-center justify-center mx-auto">
                            <MessageSquare className="h-8 w-8 text-[#EB6824]" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-slate-900">Professional Support</p>
                            <p className="text-xs text-slate-500 px-10 leading-relaxed">
                                Hello! I'm your task management expert. Start a conversation to organize your day.
                            </p>
                        </div>
                    </div>
                )}
                
                {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    m.role === 'user' 
                        ? 'bg-slate-800 text-white rounded-tr-none' 
                        : 'bg-white border border-[#EB6824]/20 text-slate-800 rounded-tl-none !border-l-4 !border-l-[#EB6824]'
                    }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                    </div>
                </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-[#EB6824]/10 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm animate-pulse">
                            <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-[#EB6824] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 bg-[#EB6824] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 bg-[#EB6824] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-[#EB6824]/10 bg-white">
            <form onSubmit={handleSubmit} className="relative group">
                <Input 
                  className="pr-12 bg-slate-50 border-slate-200 focus:border-[#EB6824] h-12 rounded-xl transition-all shadow-inner" 
                  placeholder="Ask a professional question..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#EB6824] hover:bg-[#EB6824] hover:text-white rounded-lg transition-all disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>
            </form>
            <p className="text-[10px] text-center text-slate-400 mt-4 font-medium uppercase tracking-tighter">
                Powered by TodoPro AI Assistant
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
