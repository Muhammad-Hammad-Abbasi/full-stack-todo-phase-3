import Link from 'next/link';
import { Button } from './button';

interface NavbarProps {
  onLogout?: () => void;
}

export function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white font-bold text-lg">
                    T
                </div>
                <span className="text-xl font-bold text-foreground tracking-tight">TodoApp</span>
              </Link>
              <div className="ml-10 flex items-center space-x-4">
                  <Link href="/dashboard" className="text-sm font-medium text-[#EB6824] hover:text-[#EB6824]/80 transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                    Tasks
                  </Link>
                  <Link href="/chat" className="text-sm font-medium hover:text-primary transition-colors">
                    Legacy Chat
                  </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
               {onLogout && (
                 <>
                   <div className="hidden sm:block text-sm text-muted-foreground">
                        Welcome back
                   </div>
                   <Button variant="ghost" size="sm" onClick={onLogout}>Logout</Button>
                 </>
               )}
            </div>
          </div>
        </div>
      </nav>
  );
}