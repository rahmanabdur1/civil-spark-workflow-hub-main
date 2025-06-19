
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  AlertTriangle, 
  FileText, 
  BarChart3,
  Building,
  Users
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: Building },
  { name: 'Inspections', href: '/inspections', icon: CheckSquare },
  { name: 'Issues', href: '/issues', icon: AlertTriangle },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="h-full bg-white/70 backdrop-blur-md border-r border-gray-200/50 shadow-lg"
    >
      <div className="p-6">
        <nav className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            
            return (
              <motion.div
                key={item.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <NavLink
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  )}
                >
                  <item.icon 
                    className={cn(
                      'h-5 w-5 transition-transform group-hover:scale-110',
                      isActive ? 'text-white' : 'text-gray-500'
                    )} 
                  />
                  <span>{item.name}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 w-1 h-8 bg-white rounded-l-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
        >
          <h3 className="font-semibold text-sm text-gray-800 mb-2">Quick Stats</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Active Projects</span>
              <span className="font-semibold text-blue-600">12</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Issues</span>
              <span className="font-semibold text-orange-600">8</span>
            </div>
            <div className="flex justify-between">
              <span>Completed Today</span>
              <span className="font-semibold text-green-600">15</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
