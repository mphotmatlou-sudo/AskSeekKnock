
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Clock,
  PenSquare,
  BookMarked,
  Lightbulb,
  Crown,
  Users,
  UserSquare,
  ClipboardEdit,
  Calendar,
  LogIn,
  Sun,
  Moon,
  Cog,
} from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './logo';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from './ui/dropdown-menu';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/prayer', label: 'Prayer Hub', icon: Clock },

  { href: '/bible-verses', label: 'Bible Verse Locator', icon: BookMarked },
  { href: '/sermons', label: 'Sermons', icon: ClipboardEdit },
  { href: '/personal-templates', label: 'Personal Templates', icon: UserSquare },
  { href: '/community', label: 'Community', icon: Users },

  { href: '/subscription', label: 'Subscription', icon: Crown },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  // Hide sidebar for login, signup and landing pages
  if (pathname === '/login' || pathname === '/signup' || pathname === '/landing') {
    return <main className="animate-fade-in">{children}</main>;
  }


  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-border/50 bg-sidebar shadow-blocksy">
        <SidebarHeader className="h-20 flex items-center justify-center border-b border-border/50">
          <Logo className="scale-110 transition-transform duration-blocksy hover:scale-115" />
          <SidebarTrigger className="hidden md:flex absolute right-[-12px] top-7 bg-background border shadow-blocksy rounded-full h-6 w-6" />
        </SidebarHeader>
        <SidebarContent className="px-3 py-6">
          <SidebarMenu className="gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.href || item.label}>
                  <SidebarMenuButton
                    asChild
                    variant={isActive ? 'outline' : 'default'}
                    className={cn(
                      "w-full justify-start transition-all duration-blocksy rounded-blocksy-md h-10 px-4",
                      isActive 
                        ? "bg-primary/10 text-primary border-primary/20 font-semibold shadow-sm" 
                        : "hover:bg-primary/5 hover:text-primary"
                    )}
                    tooltip={item.label}
                  >
                    <Link href={item.href} prefetch={true} className="flex items-center gap-3">
                      <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-border/50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 h-auto hover:bg-primary/5 rounded-blocksy-lg transition-colors group">
                <Avatar className="h-10 w-10 border-2 border-primary/10 group-hover:border-primary/30 transition-all">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="@user" />
                  <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
                </Avatar>
                <div className="ml-3 text-left overflow-hidden">
                    <p className="text-sm font-semibold text-blocksy-heading truncate">User</p>
                    <p className="text-xs text-muted-foreground truncate">user@example.com</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
               <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Cog className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Cog className="mr-2 h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("theme-rose")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Rose</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("theme-emerald")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Emerald</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4"/>
                        Log In
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="relative">
        {/* Global Watermark */}
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center -z-10 opacity-[0.03] overflow-hidden">
          <img 
            src="/ASKlogo1.png" 
            alt="" 
            className="w-[800px] h-[800px] object-contain rotate-12"
          />
        </div>
        
        <header className="flex items-center justify-between p-4 border-b md:hidden bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <Logo />
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
