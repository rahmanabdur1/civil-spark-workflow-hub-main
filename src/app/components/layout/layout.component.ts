import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('closed', style({
        transform: 'translateX(-300px)',
        opacity: 0
      })),
      transition('closed => open', [
        animate('300ms ease-in-out')
      ]),
      transition('open => closed', [
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('contentAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class LayoutComponent {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
} 