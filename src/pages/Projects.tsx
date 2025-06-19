
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Building, 
  Calendar, 
  Users, 
  MapPin,
  Filter,
  MoreVertical
} from 'lucide-react';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Metro Station Alpha Construction',
      description: 'Underground metro station with integrated shopping complex',
      status: 'active',
      progress: 85,
      location: 'Downtown District',
      startDate: '2024-01-15',
      endDate: '2024-12-20',
      team: 12,
      priority: 'high',
      budget: '$2.5M'
    },
    {
      id: 2,
      name: 'Bridge Construction Beta',
      description: 'Suspension bridge over Metro River',
      status: 'delayed',
      progress: 60,
      location: 'Metro River',
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      team: 18,
      priority: 'medium',
      budget: '$4.2M'
    },
    {
      id: 3,
      name: 'Highway Expansion Gamma',
      description: 'Six-lane highway expansion project',
      status: 'active',
      progress: 95,
      location: 'Highway 101',
      startDate: '2023-08-10',
      endDate: '2024-07-15',
      team: 25,
      priority: 'high',
      budget: '$8.7M'
    },
    {
      id: 4,
      name: 'Water Treatment Plant Delta',
      description: 'Modern water treatment facility',
      status: 'planning',
      progress: 30,
      location: 'Industrial Zone',
      startDate: '2024-04-01',
      endDate: '2025-03-30',
      team: 8,
      priority: 'low',
      budget: '$1.8M'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-gray-600 mt-2">Manage your engineering projects and track progress</p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50"
              />
            </div>
            
            <div className="flex gap-2">
              {['all', 'active', 'delayed', 'planning'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(project.priority)}`}></div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm">
                        {project.description}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getStatusColor(project.status)} border`}>
                      {project.status}
                    </Badge>
                    <span className="text-xs text-gray-500">{project.budget}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Project Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{project.team} team members</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1 hover:bg-blue-50">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 hover:bg-green-50">
                      Inspections
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;
