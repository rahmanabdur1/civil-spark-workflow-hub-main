import { Component } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

// Place these at the top, before @Component
type Settings = {
  general: { [key: string]: string };
  notifications: { [key: string]: boolean };
  security: { [key: string]: boolean | number };
  integrations: { [key: string]: boolean | string };
};
type Category = keyof Settings;
type SettingKey<C extends Category> = keyof Settings[C];

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class SettingsComponent {
  activeSection = 'general';
  isLoading = false;

  settings = {
    general: {
      companyName: 'Construction Corp',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      projectUpdates: true,
      inspectionReminders: true,
      issueAlerts: true,
      weeklyReports: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5
    },
    integrations: {
      slack: false,
      email: true,
      calendar: true,
      fileStorage: 'google-drive'
    }
  };

  sections = [
    { id: 'general', label: 'General', icon: 'settings' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'integrations', label: 'Integrations', icon: 'link' }
  ];

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  saveSettings() {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      // Show success message
    }, 1000);
  }

  toggleSetting<C extends Category, S extends SettingKey<C>>(category: C, setting: S) {
    const value = this.settings[category][setting];
    if (typeof value === 'boolean') {
      this.settings[category][setting] = !value as typeof value;
    }
  }
} 