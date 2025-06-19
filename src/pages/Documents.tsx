
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Upload, Folder } from 'lucide-react';

const Documents = () => {
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
            Documents
          </h1>
          <p className="text-gray-600 mt-2">Manage project documents, drawings, and specifications</p>
        </div>
        
        <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <FileText className="h-5 w-5" />
              Drawings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-sm text-gray-600">Technical drawings</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <FileText className="h-5 w-5" />
              Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28</div>
            <p className="text-sm text-gray-600">Project specs</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <FileText className="h-5 w-5" />
              Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">67</div>
            <p className="text-sm text-gray-600">Inspection reports</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Folder className="h-5 w-5" />
              Total Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-sm text-gray-600">All documents</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
          <CardDescription>Organize and version control your project documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Document system coming soon</h3>
            <p className="text-gray-600">Advanced file management with version control and collaboration</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Documents;
