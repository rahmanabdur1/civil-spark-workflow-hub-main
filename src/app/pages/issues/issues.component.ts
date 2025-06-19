import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

interface StatusOption {
  value: string;
  label: string;
  color: string;
}

interface PriorityOption {
  value: string;
  label: string;
  color: string;
}

interface SeverityOption {
  value: string;
  label: string;
  color: string;
}

interface CategoryOption {
  value: string;
  label: string;
  icon: string;
}

interface TypeOption {
  value: string;
  label: string;
  icon: string;
}

interface Project {
  id: string;
  name: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  attachments: string[];
}

interface Issue {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  reportedBy: string;
  assignedTo: string;
  status: 'open' | 'in-progress' | 'review' | 'resolved' | 'closed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'critical' | 'urgent';
  severity: 'minor' | 'major' | 'critical' | 'blocker';
  category: 'defect' | 'punch-list' | 'safety' | 'quality' | 'compliance' | 'structural' | 'electrical' | 'plumbing' | 'general';
  type: 'bug' | 'feature' | 'improvement' | 'task' | 'documentation';
  reportedDate: string;
  dueDate: string;
  resolvedDate?: string;
  location: string;
  attachments: string[];
  comments: Comment[];
  tags: string[];
  estimatedHours: number;
  actualHours?: number;
  cost: number;
  lastUpdated: string;
  isDefect: boolean;
  defectCode?: string;
  punchListCategory?: string;
  resolution?: string;
  verificationRequired: boolean;
  verifiedBy?: string;
  verifiedDate?: string;
}

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
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
export class IssuesComponent implements OnInit {
  issues: Issue[] = [];
  filteredIssues: Issue[] = [];
  showAddIssueModal = false;
  showIssueDetailsModal = false;
  selectedIssue: Issue | null = null;
  isLoading = false;
  searchTerm = '';
  statusFilter = 'all';
  priorityFilter = 'all';
  severityFilter = 'all';
  categoryFilter = 'all';
  typeFilter = 'all';
  selectedStatus: string = '';
  selectedPriority: string = '';
  
  issueForm: FormGroup;
  
  statusOptions: StatusOption[] = [
    { value: 'open', label: 'Open', color: 'bg-red-100 text-red-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'review', label: 'Under Review', color: 'bg-blue-100 text-blue-800' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
    { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' },
    { value: 'rejected', label: 'Rejected', color: 'bg-purple-100 text-purple-800' }
  ];

  priorityOptions: PriorityOption[] = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-purple-100 text-purple-800' }
  ];

  severityOptions: SeverityOption[] = [
    { value: 'minor', label: 'Minor', color: 'bg-gray-100 text-gray-800' },
    { value: 'major', label: 'Major', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
    { value: 'blocker', label: 'Blocker', color: 'bg-purple-100 text-purple-800' }
  ];

  categoryOptions: CategoryOption[] = [
    { value: 'defect', label: 'Defect', icon: 'bug' },
    { value: 'punch-list', label: 'Punch List', icon: 'clipboard-list' },
    { value: 'safety', label: 'Safety Issue', icon: 'shield' },
    { value: 'quality', label: 'Quality Issue', icon: 'check-circle' },
    { value: 'compliance', label: 'Compliance', icon: 'clipboard-check' },
    { value: 'structural', label: 'Structural', icon: 'building' },
    { value: 'electrical', label: 'Electrical', icon: 'zap' },
    { value: 'plumbing', label: 'Plumbing', icon: 'droplets' },
    { value: 'general', label: 'General', icon: 'alert-circle' }
  ];

  typeOptions: TypeOption[] = [
    { value: 'bug', label: 'Bug', icon: 'bug' },
    { value: 'feature', label: 'Feature Request', icon: 'plus-circle' },
    { value: 'improvement', label: 'Improvement', icon: 'trending-up' },
    { value: 'task', label: 'Task', icon: 'check-square' },
    { value: 'documentation', label: 'Documentation', icon: 'file-text' }
  ];

  projects: Project[] = [
    { id: '1', name: 'Downtown Office Complex' },
    { id: '2', name: 'Riverside Residential Complex' },
    { id: '3', name: 'Highway Bridge Renovation' },
    { id: '4', name: 'Shopping Mall Expansion' }
  ];

  teamMembers = [
    'Sarah Johnson',
    'David Wilson',
    'Robert Chen',
    'Amanda Taylor',
    'Mike Davis',
    'Lisa Chen',
    'John Smith',
    'Emily Brown'
  ];

  punchListCategories = [
    'Architectural',
    'Structural',
    'Mechanical',
    'Electrical',
    'Plumbing',
    'HVAC',
    'Finishes',
    'Landscaping',
    'Safety',
    'Accessibility'
  ];

  constructor(private fb: FormBuilder) {
    this.issueForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      projectId: ['', Validators.required],
      assignedTo: ['', Validators.required],
      status: ['open', Validators.required],
      priority: ['medium', Validators.required],
      severity: ['minor', Validators.required],
      category: ['general', Validators.required],
      type: ['bug', Validators.required],
      dueDate: ['', Validators.required],
      location: ['', Validators.required],
      estimatedHours: ['', [Validators.required, Validators.min(0.5)]],
      cost: ['', [Validators.required, Validators.min(0)]],
      isDefect: [false],
      defectCode: [''],
      punchListCategory: [''],
      resolution: [''],
      verificationRequired: [false],
      tags: ['']
    });
  }

  ngOnInit() {
    this.loadIssues();
  }

  // Helper methods for template lookups
  getStatusLabel(statusValue: string): string {
    const status = this.statusOptions.find(option => option.value === statusValue);
    return status ? status.label : '';
  }

  getPriorityLabel(priorityValue: string): string {
    const priority = this.priorityOptions.find(option => option.value === priorityValue);
    return priority ? priority.label : '';
  }

  getSeverityLabel(severityValue: string): string {
    const severity = this.severityOptions.find(option => option.value === severityValue);
    return severity ? severity.label : '';
  }

  getStatusColor(statusValue: string): string {
    const status = this.statusOptions.find(option => option.value === statusValue);
    return status ? status.color : 'bg-gray-100 text-gray-800';
  }

  getPriorityColor(priorityValue: string): string {
    const priority = this.priorityOptions.find(option => option.value === priorityValue);
    return priority ? priority.color : 'bg-gray-100 text-gray-800';
  }

  getSeverityColor(severityValue: string): string {
    const severity = this.severityOptions.find(option => option.value === severityValue);
    return severity ? severity.color : 'bg-gray-100 text-gray-800';
  }

  getCategoryIcon(categoryValue: string): string {
    const category = this.categoryOptions.find(option => option.value === categoryValue);
    return category ? category.icon : 'alert-circle';
  }

  loadIssues() {
    // Simulate loading issues from API
    this.issues = [
      {
        id: '1',
        title: 'Foundation Crack in Basement Wall',
        description: 'Large crack discovered in the basement foundation wall during routine inspection. Crack measures approximately 2 inches wide and extends 3 feet vertically.',
        projectId: '1',
        projectName: 'Downtown Office Complex',
        reportedBy: 'Sarah Johnson',
        assignedTo: 'David Wilson',
        status: 'in-progress',
        priority: 'high',
        severity: 'major',
        category: 'structural',
        type: 'bug',
        reportedDate: '2024-01-15T10:30:00Z',
        dueDate: '2024-01-25T17:00:00Z',
        location: 'Basement Level, North Wall',
        attachments: ['crack_photos.zip', 'structural_assessment.pdf'],
        comments: [
          {
            id: '1',
            author: 'David Wilson',
            content: 'Initial assessment completed. Structural engineer consultation required.',
            timestamp: '2024-01-15T14:20:00Z',
            attachments: []
          }
        ],
        tags: ['structural', 'foundation', 'urgent'],
        estimatedHours: 16,
        cost: 5000,
        lastUpdated: '2024-01-15T14:20:00Z',
        isDefect: true,
        defectCode: 'STR-001',
        verificationRequired: true
      },
      {
        id: '2',
        title: 'Electrical Panel Installation Punch List',
        description: 'Electrical panel installation requires final inspection and punch list completion before energization.',
        projectId: '1',
        projectName: 'Downtown Office Complex',
        reportedBy: 'Robert Chen',
        assignedTo: 'Mike Davis',
        status: 'open',
        priority: 'medium',
        severity: 'minor',
        category: 'punch-list',
        type: 'task',
        reportedDate: '2024-01-18T09:15:00Z',
        dueDate: '2024-01-22T17:00:00Z',
        location: 'Electrical Room, Floor 5',
        attachments: ['electrical_punch_list.pdf'],
        comments: [],
        tags: ['electrical', 'punch-list'],
        estimatedHours: 4,
        cost: 800,
        lastUpdated: '2024-01-18T09:15:00Z',
        isDefect: false,
        punchListCategory: 'Electrical',
        verificationRequired: true
      },
      {
        id: '3',
        title: 'Safety Barrier Missing on 3rd Floor',
        description: 'Safety barrier is missing on the 3rd floor balcony area, creating a fall hazard for workers.',
        projectId: '2',
        projectName: 'Riverside Residential Complex',
        reportedBy: 'Amanda Taylor',
        assignedTo: 'John Smith',
        status: 'open',
        priority: 'urgent',
        severity: 'critical',
        category: 'safety',
        type: 'bug',
        reportedDate: '2024-01-20T08:45:00Z',
        dueDate: '2024-01-21T17:00:00Z',
        location: '3rd Floor, Building A, Balcony',
        attachments: ['safety_photos.jpg'],
        comments: [],
        tags: ['safety', 'urgent', 'fall-hazard'],
        estimatedHours: 2,
        cost: 300,
        lastUpdated: '2024-01-20T08:45:00Z',
        isDefect: true,
        defectCode: 'SAF-001',
        verificationRequired: true
      },
      {
        id: '4',
        title: 'Quality Control - Concrete Finishing',
        description: 'Concrete finishing on the main lobby floor does not meet quality standards. Surface is uneven and requires correction.',
        projectId: '2',
        projectName: 'Riverside Residential Complex',
        reportedBy: 'Lisa Chen',
        assignedTo: 'Emily Brown',
        status: 'review',
        priority: 'medium',
        severity: 'major',
        category: 'quality',
        type: 'bug',
        reportedDate: '2024-01-19T16:30:00Z',
        dueDate: '2024-01-26T17:00:00Z',
        location: 'Main Lobby, Building A',
        attachments: ['concrete_photos.zip', 'quality_report.pdf'],
        comments: [
          {
            id: '1',
            author: 'Emily Brown',
            content: 'Quality assessment completed. Grinding and re-finishing required.',
            timestamp: '2024-01-20T10:15:00Z',
            attachments: []
          }
        ],
        tags: ['quality', 'concrete', 'finishing'],
        estimatedHours: 12,
        cost: 2500,
        lastUpdated: '2024-01-20T10:15:00Z',
        isDefect: true,
        defectCode: 'QC-001',
        verificationRequired: true
      },
      {
        id: '5',
        title: 'Plumbing Fixture Installation',
        description: 'Plumbing fixtures in bathrooms require final installation and testing.',
        projectId: '3',
        projectName: 'Highway Bridge Renovation',
        reportedBy: 'Mike Davis',
        assignedTo: 'Robert Chen',
        status: 'resolved',
        priority: 'low',
        severity: 'minor',
        category: 'plumbing',
        type: 'task',
        reportedDate: '2024-01-10T11:00:00Z',
        dueDate: '2024-01-15T17:00:00Z',
        resolvedDate: '2024-01-14T16:30:00Z',
        location: 'Restroom Facilities',
        attachments: ['plumbing_completion.pdf'],
        comments: [
          {
            id: '1',
            author: 'Robert Chen',
            content: 'All fixtures installed and tested successfully.',
            timestamp: '2024-01-14T16:30:00Z',
            attachments: []
          }
        ],
        tags: ['plumbing', 'completed'],
        estimatedHours: 8,
        actualHours: 7.5,
        cost: 1200,
        lastUpdated: '2024-01-14T16:30:00Z',
        isDefect: false,
        punchListCategory: 'Plumbing',
        resolution: 'All fixtures installed and tested successfully. System operational.',
        verificationRequired: true,
        verifiedBy: 'Mike Davis',
        verifiedDate: '2024-01-15T09:00:00Z'
      }
    ];
    this.filteredIssues = [...this.issues];
  }

  openAddIssueModal() {
    this.showAddIssueModal = true;
    this.issueForm.reset({
      status: 'open',
      priority: 'medium',
      severity: 'minor',
      category: 'general',
      type: 'bug',
      isDefect: false,
      verificationRequired: false
    });
  }

  closeAddIssueModal() {
    this.showAddIssueModal = false;
    this.issueForm.reset();
  }

  addIssue() {
    if (this.issueForm.valid) {
      this.isLoading = true;
      
      const formValue = this.issueForm.value;
      const project = this.projects.find(p => p.id === formValue.projectId);
      
      const newIssue: Issue = {
        id: (this.issues.length + 1).toString(),
        ...formValue,
        projectName: project?.name || '',
        reportedBy: 'Current User', // In real app, get from auth service
        attachments: [],
        comments: [],
        tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : [],
        lastUpdated: new Date().toISOString()
      };

      // Generate defect code if it's a defect
      if (newIssue.isDefect && !newIssue.defectCode) {
        const categoryPrefix = newIssue.category.substring(0, 3).toUpperCase();
        newIssue.defectCode = `${categoryPrefix}-${String(newIssue.id).padStart(3, '0')}`;
      }

      // Simulate API call
      setTimeout(() => {
        this.issues.unshift(newIssue);
        this.filterIssues();
        this.closeAddIssueModal();
        this.isLoading = false;
      }, 1000);
    }
  }

  openIssueDetails(issue: Issue) {
    this.selectedIssue = issue;
    this.showIssueDetailsModal = true;
  }

  closeIssueDetails() {
    this.showIssueDetailsModal = false;
    this.selectedIssue = null;
  }

  filterIssues() {
    this.filteredIssues = this.issues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           issue.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           issue.projectName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           (issue.defectCode && issue.defectCode.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesStatus = this.statusFilter === 'all' || issue.status === this.statusFilter;
      const matchesPriority = this.priorityFilter === 'all' || issue.priority === this.priorityFilter;
      const matchesSeverity = this.severityFilter === 'all' || issue.severity === this.severityFilter;
      const matchesCategory = this.categoryFilter === 'all' || issue.category === this.categoryFilter;
      const matchesType = this.typeFilter === 'all' || issue.type === this.typeFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesSeverity && matchesCategory && matchesType;
    });
  }

  onSearchChange() {
    this.filterIssues();
  }

  onStatusFilterChange() {
    this.filterIssues();
  }

  onPriorityFilterChange() {
    this.filterIssues();
  }

  onSeverityFilterChange() {
    this.filterIssues();
  }

  onCategoryFilterChange() {
    this.filterIssues();
  }

  onTypeFilterChange() {
    this.filterIssues();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getRecentIssues(): Issue[] {
    return this.issues
      .filter(issue => issue.status === 'open' || issue.status === 'in-progress')
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, 5);
  }

  getCriticalIssues(): Issue[] {
    return this.issues
      .filter(issue => issue.priority === 'critical' || issue.priority === 'urgent')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);
  }

  getResolvedIssues(): Issue[] {
    return this.issues
      .filter(issue => issue.status === 'resolved' || issue.status === 'closed')
      .sort((a, b) => new Date(b.resolvedDate!).getTime() - new Date(a.resolvedDate!).getTime())
      .slice(0, 3);
  }

  deleteIssue(issueId: string) {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.issues = this.issues.filter(i => i.id !== issueId);
      this.filterIssues();
    }
  }

  duplicateIssue(issue: Issue) {
    const duplicatedIssue: Issue = {
      ...issue,
      id: (this.issues.length + 1).toString(),
      title: `${issue.title} (Copy)`,
      status: 'open',
      comments: [],
      attachments: [],
      lastUpdated: new Date().toISOString()
    };
    
    this.issues.unshift(duplicatedIssue);
    this.filterIssues();
  }

  getIssueStats() {
    const total = this.issues.length;
    const open = this.issues.filter(i => i.status === 'open').length;
    const inProgress = this.issues.filter(i => i.status === 'in-progress').length;
    const resolved = this.issues.filter(i => i.status === 'resolved' || i.status === 'closed').length;
    const critical = this.issues.filter(i => i.priority === 'critical' || i.priority === 'urgent').length;
    const defects = this.issues.filter(i => i.isDefect).length;

    return { total, open, inProgress, resolved, critical, defects };
  }

  getTotalCost(): number {
    return this.issues.reduce((total, issue) => total + issue.cost, 0);
  }

  getTotalHours(): number {
    return this.issues.reduce((total, issue) => total + (issue.actualHours || issue.estimatedHours), 0);
  }

  setSelectedStatus(status: string) {
    this.selectedStatus = status;
  }

  setSelectedPriority(priority: string) {
    this.selectedPriority = priority;
  }
}