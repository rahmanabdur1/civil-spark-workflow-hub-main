import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
export class ProfileComponent {
  profileForm: FormGroup;
  isEditing = false;
  isLoading = false;
  activeTab = 'profile';

  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Construction Corp',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20T10:30:00Z'
  };

  tabs = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'preferences', label: 'Preferences', icon: 'settings' }
  ];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(2)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required]],
      company: [this.user.company, [Validators.required]],
      role: [this.user.role, [Validators.required]]
    });
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.profileForm.reset({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phone: this.user.phone,
        company: this.user.company,
        role: this.user.role
      });
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.user = { ...this.user, ...this.profileForm.value };
        this.isLoading = false;
        this.isEditing = false;
      }, 1000);
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least 2 characters`;
    }
    return '';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
} 