import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  time: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  statCards: StatCard[] = [
    {
      title: 'Total Projects',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'folder'
    },
    {
      title: 'Active Inspections',
      value: '8',
      change: '+3',
      changeType: 'positive',
      icon: 'clipboard-check'
    },
    {
      title: 'Open Issues',
      value: '15',
      change: '-5',
      changeType: 'negative',
      icon: 'alert-triangle'
    },
    {
      title: 'Completed Tasks',
      value: '156',
      change: '+23%',
      changeType: 'positive',
      icon: 'check-circle'
    }
  ];

  recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'inspection',
      title: 'Site Inspection Completed',
      description: 'Building A - Foundation inspection passed',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'issue',
      title: 'New Issue Reported',
      description: 'Safety concern identified in Zone 3',
      time: '4 hours ago',
      status: 'pending'
    },
    {
      id: '3',
      type: 'project',
      title: 'Project Milestone Reached',
      description: 'Phase 1 construction completed',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: '4',
      type: 'document',
      title: 'Document Updated',
      description: 'Safety protocols revised and uploaded',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
} 