
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus, Bug, AlertCircle, CheckCircle } from 'lucide-react';

const Issues = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Issues & Punch List
          </h1>
          <p className="text-gray-600 mt-2">Track and resolve project issues and defects</p>
        </div>
        
        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-gray-600">High priority</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Bug className="h-5 w-5" />
              Open
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-gray-600">In progress</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-sm text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle>Issue Tracking</CardTitle>
          <CardDescription>Manage defects, punch list items, and resolutions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Issue tracking coming soon</h3>
            <p className="text-gray-600">Comprehensive punch list and defect management system</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Issues;
