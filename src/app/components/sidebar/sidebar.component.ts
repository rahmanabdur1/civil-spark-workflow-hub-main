import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  label?: string;
  icon?: string;
  route?: string;
  badge?: string;
  divider?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'home', route: '/' },
    { label: 'Projects', icon: 'folder', route: '/projects', badge: '12' },
    { label: 'Inspections', icon: 'clipboard-check', route: '/inspections', badge: '3' },
    { label: 'Issues', icon: 'alert-triangle', route: '/issues', badge: '5' },
    { label: 'Documents', icon: 'file-text', route: '/documents' },
    { label: 'Reports', icon: 'bar-chart', route: '/reports' },
    { divider: true },
    { label: 'Profile', icon: 'user', route: '/profile' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
} 