import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

interface StatusOption {
  value: string;
  label: string;
  color: string;
}

interface FormatOption {
  value: string;
  label: string;
  icon: string;
}

interface TypeOption {
  value: string;
  label: string;
  icon: string;
}

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'project' | 'inspection' | 'issue' | 'financial' | 'progress' | 'custom';
  format: 'pdf' | 'excel' | 'csv' | 'json';
  status: 'draft' | 'generating' | 'completed' | 'failed';
  createdBy: string;
  createdAt: string;
  lastGenerated?: string;
  dataSource: string[];
  filters: ReportFilter[];
  schedule?: ReportSchedule;
  downloadUrl?: string;
  size?: number;
}

interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: any;
}

interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  nextRun: string;
  recipients: string[];
  enabled: boolean;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
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
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  filteredReports: Report[] = [];
  showCreateReportModal = false;
  showReportDetailsModal = false;
  selectedReport: Report | null = null;
  isLoading = false;
  searchTerm = '';
  typeFilter = 'all';
  statusFilter = 'all';
  
  reportForm: FormGroup;
  
  reportTemplates: ReportTemplate[] = [
    {
      id: '1',
      name: 'Project Progress Report',
      description: 'Comprehensive overview of project milestones, timelines, and completion status',
      type: 'project',
      category: 'Progress',
      icon: 'chart-bar',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: '2',
      name: 'Inspection Summary',
      description: 'Detailed inspection results, findings, and compliance status',
      type: 'inspection',
      category: 'Quality',
      icon: 'clipboard-check',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: '3',
      name: 'Issue Tracking Report',
      description: 'Open issues, resolution status, and defect management overview',
      type: 'issue',
      category: 'Issues',
      icon: 'alert-triangle',
      color: 'bg-red-100 text-red-600'
    },
    {
      id: '4',
      name: 'Financial Summary',
      description: 'Budget analysis, cost tracking, and financial projections',
      type: 'financial',
      category: 'Finance',
      icon: 'dollar-sign',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: '5',
      name: 'Safety Compliance Report',
      description: 'Safety incidents, compliance status, and risk assessment',
      type: 'custom',
      category: 'Safety',
      icon: 'shield',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: '6',
      name: 'Resource Utilization',
      description: 'Team workload, equipment usage, and resource allocation',
      type: 'custom',
      category: 'Resources',
      icon: 'users',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  typeOptions: TypeOption[] = [
    { value: 'project', label: 'Project Reports', icon: 'folder' },
    { value: 'inspection', label: 'Inspection Reports', icon: 'clipboard-check' },
    { value: 'issue', label: 'Issue Reports', icon: 'alert-triangle' },
    { value: 'financial', label: 'Financial Reports', icon: 'dollar-sign' },
    { value: 'progress', label: 'Progress Reports', icon: 'trending-up' },
    { value: 'custom', label: 'Custom Reports', icon: 'settings' }
  ];

  statusOptions: StatusOption[] = [
    { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
    { value: 'generating', label: 'Generating', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' }
  ];

  formatOptions: FormatOption[] = [
    { value: 'pdf', label: 'PDF', icon: 'file-text' },
    { value: 'excel', label: 'Excel', icon: 'grid' },
    { value: 'csv', label: 'CSV', icon: 'file' },
    { value: 'json', label: 'JSON', icon: 'code' }
  ];

  projects = [
    'Downtown Office Complex',
    'Riverside Residential Complex',
    'Highway Bridge Renovation',
    'Shopping Mall Expansion'
  ];

  dataSources = [
    'Projects',
    'Inspections',
    'Issues',
    'Documents',
    'Team Members',
    'Financial Data',
    'Safety Records',
    'Quality Metrics'
  ];

  selectedStatus: string = '';
  selectedFormat: string = '';

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      type: ['project', Validators.required],
      format: ['pdf', Validators.required],
      dataSource: ['', Validators.required],
      scheduleEnabled: [false],
      scheduleFrequency: ['weekly'],
      recipients: [''],
      filters: ['']
    });
  }

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    // Simulate loading reports from API
    this.reports = [
      {
        id: '1',
        name: 'Monthly Project Progress Report',
        description: 'Comprehensive overview of all project milestones and completion status',
        type: 'project',
        format: 'pdf',
        status: 'completed',
        createdBy: 'Sarah Johnson',
        createdAt: '2024-01-01T10:00:00Z',
        lastGenerated: '2024-01-31T16:00:00Z',
        dataSource: ['Projects', 'Team Members'],
        filters: [
          { field: 'status', operator: 'in', value: ['active', 'in-progress'] }
        ],
        schedule: {
          frequency: 'monthly',
          nextRun: '2024-02-28T16:00:00Z',
          recipients: ['management@company.com'],
          enabled: true
        },
        downloadUrl: '#',
        size: 2048000
      },
      {
        id: '2',
        name: 'Weekly Inspection Summary',
        description: 'Summary of all inspections conducted during the week',
        type: 'inspection',
        format: 'excel',
        status: 'completed',
        createdBy: 'David Wilson',
        createdAt: '2024-01-15T09:30:00Z',
        lastGenerated: '2024-01-26T17:00:00Z',
        dataSource: ['Inspections'],
        filters: [
          { field: 'date', operator: 'between', value: ['2024-01-20', '2024-01-26'] }
        ],
        downloadUrl: '#',
        size: 512000
      },
      {
        id: '3',
        name: 'Critical Issues Report',
        description: 'Report of all critical and urgent issues requiring immediate attention',
        type: 'issue',
        format: 'pdf',
        status: 'generating',
        createdBy: 'Robert Chen',
        createdAt: '2024-01-20T14:15:00Z',
        dataSource: ['Issues'],
        filters: [
          { field: 'priority', operator: 'in', value: ['critical', 'urgent'] }
        ]
      },
      {
        id: '4',
        name: 'Q4 Financial Summary',
        description: 'Financial overview for Q4 including budget vs actual costs',
        type: 'financial',
        format: 'excel',
        status: 'draft',
        createdBy: 'Amanda Taylor',
        createdAt: '2024-01-25T11:45:00Z',
        dataSource: ['Financial Data'],
        filters: [
          { field: 'quarter', operator: 'equals', value: 'Q4' }
        ]
      }
    ];
    this.filteredReports = [...this.reports];
  }

  // New methods for status and format label lookups
  getStatusLabel(statusValue: string): string {
    const status = this.statusOptions.find(option => option.value === statusValue);
    return status ? status.label : '';
  }

  getFormatLabel(formatValue: string): string {
    const format = this.formatOptions.find(option => option.value === formatValue);
    return format ? format.label : '';
  }

  getStatusColor(statusValue: string): string {
    const status = this.statusOptions.find(option => option.value === statusValue);
    return status ? status.color : 'bg-gray-100 text-gray-800';
  }

  getTypeIcon(typeValue: string): string {
    const type = this.typeOptions.find(option => option.value === typeValue);
    return type ? type.icon : 'file';
  }

  getFormatIcon(formatValue: string): string {
    const format = this.formatOptions.find(option => option.value === formatValue);
    return format ? format.icon : 'file';
  }

  openCreateReportModal() {
    this.showCreateReportModal = true;
    this.reportForm.reset({
      type: 'project',
      format: 'pdf',
      scheduleEnabled: false,
      scheduleFrequency: 'weekly'
    });
  }

  closeCreateReportModal() {
    this.showCreateReportModal = false;
    this.reportForm.reset();
  }

  createReport() {
    if (this.reportForm.valid) {
      this.isLoading = true;
      
      const formValue = this.reportForm.value;
      const newReport: Report = {
        id: (this.reports.length + 1).toString(),
        name: formValue.name,
        description: formValue.description,
        type: formValue.type,
        format: formValue.format,
        status: 'draft',
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        dataSource: [formValue.dataSource],
        filters: [],
        schedule: formValue.scheduleEnabled ? {
          frequency: formValue.scheduleFrequency,
          nextRun: this.calculateNextRun(formValue.scheduleFrequency),
          recipients: formValue.recipients ? formValue.recipients.split(',').map((r: string) => r.trim()) : [],
          enabled: true
        } : undefined
      };

      // Simulate API call
      setTimeout(() => {
        this.reports.unshift(newReport);
        this.filterReports();
        this.closeCreateReportModal();
        this.isLoading = false;
      }, 1000);
    }
  }

  calculateNextRun(frequency: string): string {
    const now = new Date();
    switch (frequency) {
      case 'daily':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
      case 'monthly':
        return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).toISOString();
      case 'quarterly':
        return new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()).toISOString();
      default:
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    }
  }

  openReportDetails(report: Report) {
    this.selectedReport = report;
    this.showReportDetailsModal = true;
  }

  closeReportDetails() {
    this.showReportDetailsModal = false;
    this.selectedReport = null;
  }

  generateReport(report: Report) {
    report.status = 'generating';
    // Simulate report generation
    setTimeout(() => {
      report.status = 'completed';
      report.lastGenerated = new Date().toISOString();
      report.downloadUrl = '#';
      report.size = Math.floor(Math.random() * 2000000) + 100000;
    }, 3000);
  }

  downloadReport(report: Report) {
    if (report.downloadUrl) {
      // Simulate download
      console.log(`Downloading ${report.name}...`);
    }
  }

  deleteReport(reportId: string) {
    if (confirm('Are you sure you want to delete this report?')) {
      this.reports = this.reports.filter(r => r.id !== reportId);
      this.filterReports();
    }
  }

  duplicateReport(report: Report) {
    const duplicatedReport: Report = {
      ...report,
      id: (this.reports.length + 1).toString(),
      name: `${report.name} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      lastGenerated: undefined,
      downloadUrl: undefined,
      size: undefined
    };
    
    this.reports.unshift(duplicatedReport);
    this.filterReports();
  }

  filterReports() {
    this.filteredReports = this.reports.filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           report.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = this.typeFilter === 'all' || report.type === this.typeFilter;
      const matchesStatus = this.statusFilter === 'all' || report.status === this.statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }

  onSearchChange() {
    this.filterReports();
  }

  onTypeFilterChange() {
    this.filterReports();
  }

  onStatusFilterChange() {
    this.filterReports();
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

  formatSize(size: number): string {
    if (size > 1e6) return (size / 1e6).toFixed(1) + ' MB';
    if (size > 1e3) return (size / 1e3).toFixed(1) + ' KB';
    return size + ' B';
  }

  getRecentReports(): Report[] {
    return this.reports
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }

  getScheduledReports(): Report[] {
    return this.reports
      .filter(report => report.schedule?.enabled)
      .sort((a, b) => new Date(a.schedule!.nextRun).getTime() - new Date(b.schedule!.nextRun).getTime())
      .slice(0, 3);
  }

  getReportStats() {
    const total = this.reports.length;
    const completed = this.reports.filter(r => r.status === 'completed').length;
    const generating = this.reports.filter(r => r.status === 'generating').length;
    const draft = this.reports.filter(r => r.status === 'draft').length;
    const scheduled = this.reports.filter(r => r.schedule?.enabled).length;

    return { total, completed, generating, draft, scheduled };
  }

  setSelectedStatus(status: string) {
    this.selectedStatus = status;
  }

  setSelectedFormat(format: string) {
    this.selectedFormat = format;
  }
}