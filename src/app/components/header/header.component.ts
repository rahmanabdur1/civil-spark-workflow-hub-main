import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() sidebarOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  showUserMenu = false;
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Mock user data - replace with actual auth service implementation
    this.currentUser = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    };
    
    // If using actual auth service:
    // this.authService.currentUser$.subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  onProfileClick() {
    this.showUserMenu = false;
    this.router.navigate(['/profile']);
  }

  onSettingsClick() {
    this.showUserMenu = false;
    this.router.navigate(['/settings']);
  }

  onLogoutClick() {
    this.showUserMenu = false;
    this.authService.logout();
  }

  getUserInitials(): string {
    if (this.currentUser) {
      return `${this.currentUser.firstName.charAt(0)}${this.currentUser.lastName.charAt(0)}`;
    }
    return 'U';
  }
}