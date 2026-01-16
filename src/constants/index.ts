import type { ChatType } from "@/types/chat.type";
import { Calendar, Menu, MessageSquareQuote, Search, SettingsIcon, Sparkle } from "lucide-react";

 type ChatItem = {
  // id: string;
  name: string;
  text: string;
  time: string;
  color: string; // Tailwind bg class like "bg-purple-400"
  // image?: string;
};

 export const navLink1 = [
    {
      icon: Menu,
      href: '/menu',
      label: 'Menu'
    },
    {
      icon: MessageSquareQuote,
      href: '/chat',
      label: 'Chat'

    },
   ]

 export const navLink2 = [
    // {
    //   icon: Sparkle,
    //   href: '/ai',
    //   label: 'AI'

    // },
    {
      icon: SettingsIcon,
      href: '/setting',
      label: 'Setting'
    },
   ]

    