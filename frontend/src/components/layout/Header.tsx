'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Sparkles, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
  onOpenChat?: () => void;
}

export function Header({ onLogout, onOpenChat }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-[#fcd897]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex items-center space-x-2 md:hidden h-full">
        <div className="h-8 w-8 bg-[#EB6824] rounded-lg flex items-center justify-center text-white font-bold text-lg">
          T
        </div>
        <span className="text-xl font-semibold font-mono tracking-tight text-foreground flex items-center">TodoPro</span>
      </div>
      
      <div className="hidden md:block">
        {/* Placeholder for left-side items if needed, or just empty space */}
      </div>

      <div className="flex items-center space-x-4">
        <Button 
          onClick={onOpenChat}
          variant="primary"
          className="space-x-2 shadow-sm shadow-[#EB6824]/20"
        >
          <Sparkles className="h-4 w-4" />
          <span>AI Assistant</span>
        </Button>
      </div>
    </header>
  );
}
