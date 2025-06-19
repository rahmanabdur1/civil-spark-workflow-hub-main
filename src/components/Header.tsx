
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Bell, Settings, User, LogOut } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 flex items-center justify-between shadow-sm"
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hover:bg-blue-50 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Engineering CM
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="sm" className="relative hover:bg-blue-50">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>
        </motion.div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Avatar className="cursor-pointer ring-2 ring-blue-100 hover:ring-blue-200 transition-all">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md" align="end">
            <DropdownMenuLabel>John Doe</DropdownMenuLabel>
            <DropdownMenuLabel className="text-sm font-normal text-muted-foreground">
              Senior Engineer
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-blue-50">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-red-50 text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default Header;
