import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

interface InspectionItem {
  id: string;
  category: string;
  item: string;
  status: 'pending' | 'pass' | 'fail' | 'na';
  notes: string;
  photos: string[];
}

interface Finding {
  id: string;
  severity: 'minor' | 'major' | 'critical';
  description: string;
  recommendation: string;
  assignedTo: string;
  dueDate: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
}

interface Inspection {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  inspector: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'failed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledDate: string;
  completedDate?: string;
  duration: number;
  location: string;
  type: 'safety' | 'quality' | 'compliance' | 'structural' | 'electrical' | 'plumbing' | 'general';
  checklist: InspectionItem[];
  findings: Finding[];
  attachments: string[];
  notes: string;
  weather: string;
  temperature: number;
  lastUpdated: string;
}

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

interface TypeOption {
  value: string;
  label: string;
  icon: string;
}

interface Project {
  id: string;
  name: string;
}

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css'],
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
export class InspectionsComponent implements OnInit {
  inspections: Inspection[] = [];
  filteredInspections: Inspection[] = [];
  showAddInspectionModal = false;
  showInspectionDetailsModal = false;
  selectedInspection: Inspection | null = null;
  isLoading = false;
  searchTerm = '';
  statusFilter = 'all';
  typeFilter = 'all';
  priorityFilter = 'all';
  selectedStatus: string = '';
  
  inspectionForm: FormGroup;
  
  statusOptions: StatusOption[] = [
    { value: 'scheduled', label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-gray-100 text-gray-800' }
  ];

  priorityOptions: PriorityOption[] = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ];

  typeOptions: TypeOption[] = [
    { value: 'safety', label: 'Safety Inspection', icon: 'shield' },
    { value: 'quality', label: 'Quality Control', icon: 'check-circle' },
    { value: 'compliance', label: 'Compliance Check', icon: 'clipboard-check' },
    { value: 'structural', label: 'Structural Review', icon: 'building' },
    { value: 'electrical', label: 'Electrical Systems', icon: 'zap' },
    { value: 'plumbing', label: 'Plumbing Systems', icon: 'droplets' },
    { value: 'general', label: 'General Inspection', icon: 'eye' }
  ];

  projects: Project[] = [
    { id: '1', name: 'Downtown Office Complex' },
    { id: '2', name: 'Riverside Residential Complex' },
    { id: '3', name: 'Highway Bridge Renovation' },
    { id: '4', name: 'Shopping Mall Expansion' }
  ];

  inspectors = [
    'Sarah Johnson',
    'David Wilson',
    'Robert Chen',
    'Amanda Taylor',
    'Mike Davis',
    'Lisa Chen'
  ];

  constructor(private fb: FormBuilder) {
    this.inspectionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      projectId: ['', Validators.required],
      inspector: ['', Validators.required],
      status: ['scheduled', Validators.required],
      priority: ['medium', Validators.required],
      scheduledDate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(0.5)]],
      location: ['', Validators.required],
      type: ['general', Validators.required],
      notes: [''],
      weather: [''],
      temperature: ['']
    });
  }

  ngOnInit() {
    this.loadInspections();
  }

  loadInspections() {
    // Simulate loading inspections from API
    this.inspections = [
      {
        id: '1',
        title: 'Foundation Safety Inspection',
        description: 'Comprehensive safety inspection of the foundation structure and surrounding areas.',
        projectId: '1',
        projectName: 'Downtown Office Complex',
        inspector: 'Sarah Johnson',
        status: 'completed',
        priority: 'high',
        scheduledDate: '2024-01-15T09:00:00Z',
        completedDate: '2024-01-15T12:30:00Z',
        duration: 3.5,
        location: 'Foundation Level, Downtown Office Complex',
        type: 'safety',
        checklist: [
          { id: '1', category: 'Structural', item: 'Foundation integrity', status: 'pass', notes: 'All foundation elements in good condition', photos: [] },
          { id: '2', category: 'Safety', item: 'Safety barriers', status: 'pass', notes: 'Proper safety barriers in place', photos: [] },
          { id: '3', category: 'Access', item: 'Emergency exits', status: 'pass', notes: 'Emergency exits clearly marked and accessible', photos: [] }
        ],
        findings: [
          { id: '1', severity: 'minor', description: 'Minor debris in corner area', recommendation: 'Clean debris and maintain cleanliness', assignedTo: 'Site Supervisor', dueDate: '2024-01-20', status: 'resolved' }
        ],
        attachments: ['inspection_report_001.pdf', 'photos_001.zip'],
        notes: 'Overall foundation is in excellent condition. Minor cleanup needed.',
        weather: 'Clear',
        temperature: 22,
        lastUpdated: '2024-01-15T12:30:00Z'
      },
      {
        id: '2',
        title: 'Electrical Systems Review',
        description: 'Inspection of electrical systems and wiring installations.',
        projectId: '1',
        projectName: 'Downtown Office Complex',
        inspector: 'David Wilson',
        status: 'in-progress',
        priority: 'medium',
        scheduledDate: '2024-01-20T10:00:00Z',
        duration: 4,
        location: 'Electrical Room, Floor 5',
        type: 'electrical',
        checklist: [
          { id: '1', category: 'Electrical', item: 'Main electrical panel', status: 'pending', notes: '', photos: [] },
          { id: '2', category: 'Electrical', item: 'Wiring installation', status: 'pending', notes: '', photos: [] },
          { id: '3', category: 'Safety', item: 'Ground fault protection', status: 'pending', notes: '', photos: [] }
        ],
        findings: [],
        attachments: [],
        notes: 'Inspection in progress...',
        weather: 'Partly Cloudy',
        temperature: 18,
        lastUpdated: '2024-01-20T10:30:00Z'
      },
      {
        id: '3',
        title: 'Quality Control Check',
        description: 'Quality control inspection for concrete work and finishing.',
        projectId: '2',
        projectName: 'Riverside Residential Complex',
        inspector: 'Robert Chen',
        status: 'scheduled',
        priority: 'medium',
        scheduledDate: '2024-01-25T14:00:00Z',
        duration: 2.5,
        location: 'Building A, Riverside Complex',
        type: 'quality',
        checklist: [],
        findings: [],
        attachments: [],
        notes: '',
        weather: 'Forecast: Sunny',
        temperature: 24,
        lastUpdated: '2024-01-18T16:45:00Z'
      },
      {
        id: '4',
        title: 'Structural Integrity Assessment',
        description: 'Comprehensive structural assessment of the bridge renovation project.',
        projectId: '3',
        projectName: 'Highway Bridge Renovation',
        inspector: 'Amanda Taylor',
        status: 'completed',
        priority: 'urgent',
        scheduledDate: '2023-12-10T08:00:00Z',
        completedDate: '2023-12-10T16:00:00Z',
        duration: 8,
        location: 'Main Highway Bridge',
        type: 'structural',
        checklist: [
          { id: '1', category: 'Structural', item: 'Bridge deck condition', status: 'pass', notes: 'Deck in excellent condition after renovation', photos: [] },
          { id: '2', category: 'Structural', item: 'Support beams', status: 'pass', notes: 'All support beams properly reinforced', photos: [] },
          { id: '3', category: 'Safety', item: 'Guardrails', status: 'pass', notes: 'Guardrails meet all safety standards', photos: [] }
        ],
        findings: [],
        attachments: ['bridge_inspection_report.pdf', 'structural_analysis.pdf'],
        notes: 'Bridge renovation completed successfully. All structural elements meet or exceed specifications.',
        weather: 'Clear',
        temperature: 15,
        lastUpdated: '2023-12-10T16:00:00Z'
      }
    ];
    this.filteredInspections = [...this.inspections];
  }

  getStatusLabel(status: string): string {
    const option = this.statusOptions.find(s => s.value === status);
    return option ? option.label : '';
  }

  getPriorityLabel(priority: string): string {
    const option = this.priorityOptions.find(p => p.value === priority);
    return option ? option.label : '';
  }

  getStatusColor(status: string): string {
    const statusOption = this.statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
  }

  getPriorityColor(priority: string): string {
    const priorityOption = this.priorityOptions.find(option => option.value === priority);
    return priorityOption ? priorityOption.color : 'bg-gray-100 text-gray-800';
  }

  getTypeIcon(type: string): string {
    const typeOption = this.typeOptions.find(option => option.value === type);
    return typeOption ? typeOption.icon : 'eye';
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

  formatDuration(hours: number): string {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  }

  openAddInspectionModal() {
    this.showAddInspectionModal = true;
    this.inspectionForm.reset({
      status: 'scheduled',
      priority: 'medium',
      type: 'general'
    });
  }

  closeAddInspectionModal() {
    this.showAddInspectionModal = false;
    this.inspectionForm.reset();
  }

  addInspection() {
    if (this.inspectionForm.valid) {
      this.isLoading = true;
      
      const formValue = this.inspectionForm.value;
      const project = this.projects.find(p => p.id === formValue.projectId);
      
      const newInspection: Inspection = {
        id: (this.inspections.length + 1).toString(),
        ...formValue,
        projectName: project?.name || '',
        checklist: [],
        findings: [],
        attachments: [],
        lastUpdated: new Date().toISOString()
      };

      // Simulate API call
      setTimeout(() => {
        this.inspections.unshift(newInspection);
        this.filterInspections();
        this.closeAddInspectionModal();
        this.isLoading = false;
      }, 1000);
    }
  }

  openInspectionDetails(inspection: Inspection) {
    this.selectedInspection = inspection;
    this.showInspectionDetailsModal = true;
  }

  closeInspectionDetails() {
    this.showInspectionDetailsModal = false;
    this.selectedInspection = null;
  }

  filterInspections() {
    this.filteredInspections = this.inspections.filter(inspection => {
      const matchesSearch = inspection.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           inspection.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           inspection.projectName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || inspection.status === this.statusFilter;
      const matchesType = this.typeFilter === 'all' || inspection.type === this.typeFilter;
      const matchesPriority = this.priorityFilter === 'all' || inspection.priority === this.priorityFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }

  onSearchChange() {
    this.filterInspections();
  }

  onStatusFilterChange() {
    this.filterInspections();
  }

  onTypeFilterChange() {
    this.filterInspections();
  }

  onPriorityFilterChange() {
    this.filterInspections();
  }

  getRecentInspections(): Inspection[] {
    return this.inspections
      .filter(inspection => inspection.status === 'completed')
      .sort((a, b) => new Date(b.completedDate!).getTime() - new Date(a.completedDate!).getTime())
      .slice(0, 5);
  }

  getUpcomingInspections(): Inspection[] {
    return this.inspections
      .filter(inspection => inspection.status === 'scheduled')
      .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
      .slice(0, 3);
  }

  deleteInspection(inspectionId: string) {
    if (confirm('Are you sure you want to delete this inspection?')) {
      this.inspections = this.inspections.filter(i => i.id !== inspectionId);
      this.filterInspections();
    }
  }

  duplicateInspection(inspection: Inspection) {
    const duplicatedInspection: Inspection = {
      ...inspection,
      id: (this.inspections.length + 1).toString(),
      title: `${inspection.title} (Copy)`,
      status: 'scheduled',
      checklist: [],
      findings: [],
      attachments: [],
      lastUpdated: new Date().toISOString()
    };
    
    this.inspections.unshift(duplicatedInspection);
    this.filterInspections();
  }

  getInspectionStats() {
    const total = this.inspections.length;
    const completed = this.inspections.filter(i => i.status === 'completed').length;
    const inProgress = this.inspections.filter(i => i.status === 'in-progress').length;
    const scheduled = this.inspections.filter(i => i.status === 'scheduled').length;
    const failed = this.inspections.filter(i => i.status === 'failed').length;

    return { total, completed, inProgress, scheduled, failed };
  }

  setSelectedStatus(status: string) {
    this.selectedStatus = status;
  }
}