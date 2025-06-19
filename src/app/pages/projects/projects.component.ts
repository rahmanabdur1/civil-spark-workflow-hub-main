import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate: string;
  budget: number;
  progress: number;
  manager: string;
  team: string[];
  location: string;
  client: string;
  category: string;
  tags: string[];
  lastUpdated: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  showAddProjectModal = false;
  showProjectDetailsModal = false;
  selectedProject: Project | null = null;
  isLoading = false;
  searchTerm = '';
  statusFilter = 'all';
  priorityFilter = 'all';
  
  projectForm: FormGroup;
  
  statusOptions = [
    { value: 'planning', label: 'Planning', color: 'bg-blue-100 text-blue-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'on-hold', label: 'On Hold', color: 'bg-red-100 text-red-800' }
  ];

  priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ];

  categoryOptions = [
    'Residential Construction',
    'Commercial Construction',
    'Infrastructure',
    'Renovation',
    'Maintenance',
    'Inspection'
  ];

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['planning', Validators.required],
      priority: ['medium', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      manager: ['', Validators.required],
      location: ['', Validators.required],
      client: ['', Validators.required],
      category: ['', Validators.required],
      tags: ['']
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    // Simulate loading projects from API
    this.projects = [
      {
        id: '1',
        name: 'Downtown Office Complex',
        description: 'Modern 15-story office building with sustainable design features and smart building technology.',
        status: 'in-progress',
        priority: 'high',
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        budget: 2500000,
        progress: 65,
        manager: 'Sarah Johnson',
        team: ['John Smith', 'Mike Davis', 'Lisa Chen'],
        location: 'Downtown Business District',
        client: 'Metro Development Corp',
        category: 'Commercial Construction',
        tags: ['office', 'sustainable', 'smart-building'],
        lastUpdated: '2024-01-20T10:30:00Z'
      },
      {
        id: '2',
        name: 'Riverside Residential Complex',
        description: 'Luxury residential complex with 50 units, featuring river views and premium amenities.',
        status: 'planning',
        priority: 'medium',
        startDate: '2024-03-01',
        endDate: '2025-06-30',
        budget: 180000,
        progress: 15,
        manager: 'David Wilson',
        team: ['Emma Brown', 'Alex Rodriguez'],
        location: 'Riverside Drive',
        client: 'Luxury Homes Inc',
        category: 'Residential Construction',
        tags: ['residential', 'luxury', 'river-view'],
        lastUpdated: '2024-01-18T14:20:00Z'
      },
      {
        id: '3',
        name: 'Highway Bridge Renovation',
        description: 'Structural renovation and expansion of the main highway bridge connecting north and south districts.',
        status: 'completed',
        priority: 'urgent',
        startDate: '2023-06-01',
        endDate: '2023-12-15',
        budget: 3200000,
        progress: 100,
        manager: 'Robert Chen',
        team: ['Maria Garcia', 'Tom Anderson', 'Jennifer Lee'],
        location: 'Main Highway Bridge',
        client: 'City Infrastructure Department',
        category: 'Infrastructure',
        tags: ['bridge', 'renovation', 'infrastructure'],
        lastUpdated: '2023-12-15T16:45:00Z'
      },
      {
        id: '4',
        name: 'Shopping Mall Expansion',
        description: 'Expansion of existing shopping mall with additional retail space and parking facilities.',
        status: 'on-hold',
        priority: 'low',
        startDate: '2024-02-01',
        endDate: '2024-11-30',
        budget: 1500000,
        progress: 25,
        manager: 'Amanda Taylor',
        team: ['Chris Martinez', 'Rachel Green'],
        location: 'Westside Mall',
        client: 'Retail Properties LLC',
        category: 'Commercial Construction',
        tags: ['retail', 'expansion', 'parking'],
        lastUpdated: '2024-01-15T09:15:00Z'
      }
    ];
    this.filteredProjects = [...this.projects];
  }

  openAddProjectModal() {
    this.showAddProjectModal = true;
    this.projectForm.reset({
      status: 'planning',
      priority: 'medium'
    });
  }

  closeAddProjectModal() {
    this.showAddProjectModal = false;
    this.projectForm.reset();
  }

  addProject() {
    if (this.projectForm.valid) {
      const newProject: Project = {
        id: (this.projects.length + 1).toString(),
        ...this.projectForm.value
      };
      this.projects.unshift(newProject);
      this.filterProjects();
      this.closeAddProjectModal();
    }
  }

  openProjectDetails(project: Project) {
    this.selectedProject = project;
    this.showProjectDetailsModal = true;
  }

  closeProjectDetails() {
    this.showProjectDetailsModal = false;
    this.selectedProject = null;
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || project.status === this.statusFilter;
      const matchesPriority = this.priorityFilter === 'all' || project.priority === this.priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  onSearchChange() {
    this.filterProjects();
  }

  onStatusFilterChange() {
    this.filterProjects();
  }

  onPriorityFilterChange() {
    this.filterProjects();
  }

  getStatusColor(status: string): string {
    const statusOption = this.statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
  }

  getPriorityColor(priority: string): string {
    const priorityOption = this.priorityOptions.find(option => option.value === priority);
    return priorityOption ? priorityOption.color : 'bg-gray-100 text-gray-800';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  deleteProject(projectId: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projects = this.projects.filter(p => p.id !== projectId);
      this.filterProjects();
    }
  }

  duplicateProject(project: Project) {
    const duplicatedProject: Project = {
      ...project,
      id: (this.projects.length + 1).toString(),
      name: `${project.name} (Copy)`,
      status: 'planning',
      progress: 0,
      lastUpdated: new Date().toISOString()
    };
    
    this.projects.unshift(duplicatedProject);
    this.filterProjects();
  }
} 