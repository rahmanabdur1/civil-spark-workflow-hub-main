import { Component } from '@angular/core';

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  version: number;
  project: string;
  tags: string[];
  url: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  documents: DocumentFile[] = [];
  filteredDocuments: DocumentFile[] = [];
  showUploadModal = false;
  isUploading = false;
  searchTerm = '';
  projects = [
    'Downtown Office Complex',
    'Riverside Residential Complex',
    'Highway Bridge Renovation',
    'Shopping Mall Expansion'
  ];
  selectedProject = '';
  uploadFile: File | null = null;
  uploadTags = '';

  constructor() {
    this.loadDocuments();
  }

  loadDocuments() {
    // Simulate loading documents from API
    this.documents = [
      {
        id: '1',
        name: 'Site_Plan_v1.pdf',
        type: 'pdf',
        size: 1024000,
        uploadedBy: 'Sarah Johnson',
        uploadedAt: '2024-01-10T09:00:00Z',
        version: 1,
        project: 'Downtown Office Complex',
        tags: ['site plan', 'architecture'],
        url: '#'
      },
      {
        id: '2',
        name: 'Inspection_Report_2024-01-15.docx',
        type: 'docx',
        size: 204800,
        uploadedBy: 'David Wilson',
        uploadedAt: '2024-01-15T13:30:00Z',
        version: 1,
        project: 'Downtown Office Complex',
        tags: ['inspection', 'report'],
        url: '#'
      },
      {
        id: '3',
        name: 'Electrical_Drawings_v2.dwg',
        type: 'dwg',
        size: 5120000,
        uploadedBy: 'Robert Chen',
        uploadedAt: '2024-01-18T16:45:00Z',
        version: 2,
        project: 'Riverside Residential Complex',
        tags: ['electrical', 'drawings'],
        url: '#'
      }
    ];
    this.filteredDocuments = [...this.documents];
  }

  openUploadModal() {
    this.showUploadModal = true;
    this.uploadFile = null;
    this.selectedProject = '';
    this.uploadTags = '';
  }

  closeUploadModal() {
    this.showUploadModal = false;
    this.uploadFile = null;
    this.selectedProject = '';
    this.uploadTags = '';
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.uploadFile = file ? file : null;
  }

  uploadDocument() {
    if (!this.uploadFile || !this.selectedProject) return;
    this.isUploading = true;
    const newDoc: DocumentFile = {
      id: (this.documents.length + 1).toString(),
      name: this.uploadFile.name,
      type: this.uploadFile.name.split('.').pop() || '',
      size: this.uploadFile.size,
      uploadedBy: 'Current User',
      uploadedAt: new Date().toISOString(),
      version: 1,
      project: this.selectedProject,
      tags: this.uploadTags ? this.uploadTags.split(',').map(t => t.trim()) : [],
      url: '#'
    };
    setTimeout(() => {
      this.documents.unshift(newDoc);
      this.filterDocuments();
      this.closeUploadModal();
      this.isUploading = false;
    }, 1000);
  }

  filterDocuments() {
    this.filteredDocuments = this.documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.project.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }

  onSearchChange() {
    this.filterDocuments();
  }

  getRecentDocuments(): DocumentFile[] {
    return this.documents.slice(0, 5);
  }

  formatSize(size: number): string {
    if (size > 1e6) return (size / 1e6).toFixed(1) + ' MB';
    if (size > 1e3) return (size / 1e3).toFixed(1) + ' KB';
    return size + ' B';
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
} 