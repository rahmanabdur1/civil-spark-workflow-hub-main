
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  CheckSquare, 
  AlertTriangle, 
  FileText, 
  TrendingUp,
  Clock,
  Users,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Active Projects', value: '12', icon: Building, color: 'from-blue-500 to-blue-600', change: '+2' },
    { title: 'Inspections Due', value: '24', icon: CheckSquare, color: 'from-green-500 to-green-600', change: '+5' },
    { title: 'Open Issues', value: '8', icon: AlertTriangle, color: 'from-orange-500 to-orange-600', change: '-3' },
    { title: 'Documents', value: '156', icon: FileText, color: 'from-purple-500 to-purple-600', change: '+12' },
  ];

  const recentProjects = [
    { name: 'Metro Station Alpha', progress: 85, status: 'On Track', priority: 'High' },
    { name: 'Bridge Construction Beta', progress: 60, status: 'Delayed', priority: 'Medium' },
    { name: 'Highway Expansion Gamma', progress: 95, status: 'Near Complete', priority: 'High' },
    { name: 'Water Treatment Plant', progress: 30, status: 'Starting', priority: 'Low' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your projects.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <motion.p 
                    className="text-2xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </CardContent>
              
              <motion.div
                className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${stat.color}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
              />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Projects */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Recent Projects
            </CardTitle>
            <CardDescription>Track progress of your ongoing projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                className="space-y-2 p-3 rounded-lg hover:bg-blue-50/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{project.name}</h4>
                  <Badge 
                    variant={project.status === 'On Track' ? 'default' : 
                            project.status === 'Delayed' ? 'destructive' : 
                            project.status === 'Near Complete' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress 
                    value={project.progress} 
                    className="h-2"
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: 'Inspection completed', project: 'Metro Station Alpha', time: '2 hours ago' },
              { action: 'Issue reported', project: 'Bridge Construction Beta', time: '4 hours ago' },
              { action: 'Document uploaded', project: 'Highway Expansion Gamma', time: '6 hours ago' },
              { action: 'Checklist updated', project: 'Water Treatment Plant', time: '1 day ago' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.8 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50/50 transition-colors"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.project}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
