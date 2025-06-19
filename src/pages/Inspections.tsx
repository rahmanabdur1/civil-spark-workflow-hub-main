
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Plus, Clock, AlertCircle } from 'lucide-react';

const Inspections = () => {
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
            Inspections
          </h1>
          <p className="text-gray-600 mt-2">Manage inspection checklists and track completion</p>
        </div>
        
        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Inspection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckSquare className="h-5 w-5" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Clock className="h-5 w-5" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-sm text-gray-600">Due soon</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-gray-600">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle>Recent Inspections</CardTitle>
          <CardDescription>Latest inspection activities and results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Inspection module coming soon</h3>
            <p className="text-gray-600">Advanced checklist management and tracking features</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Inspections;
