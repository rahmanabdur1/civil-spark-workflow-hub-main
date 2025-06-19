
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Plus, Download, TrendingUp } from 'lucide-react';

const Reports = () => {
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
            Reports
          </h1>
          <p className="text-gray-600 mt-2">Generate and export project reports and analytics</p>
        </div>
        
        <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <BarChart3 className="h-5 w-5" />
              Project Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-gray-600">Generated this month</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Download className="h-5 w-5" />
              PDF Exports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-sm text-gray-600">Total downloads</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <TrendingUp className="h-5 w-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85%</div>
            <p className="text-sm text-gray-600">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
          <CardDescription>Create custom reports and export data in multiple formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Reporting system coming soon</h3>
            <p className="text-gray-600">Advanced analytics and customizable PDF/Excel exports</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Reports;
