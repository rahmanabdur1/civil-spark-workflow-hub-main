import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { InspectionsComponent } from './pages/inspections/inspections.component';
import { IssuesComponent } from './pages/issues/issues.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// Auth Components
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  // Auth routes (no layout)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Protected routes (with layout)
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'inspections', component: InspectionsComponent },
      { path: 'issues', component: IssuesComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    ProjectsComponent,
    InspectionsComponent,
    IssuesComponent,
    DocumentsComponent,
    ReportsComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 