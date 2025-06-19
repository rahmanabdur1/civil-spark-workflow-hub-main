
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-64 flex-shrink-0"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.main
          layout
          className="flex-1 overflow-auto p-6"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
