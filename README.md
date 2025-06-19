# Civil Spark Workflow Hub - Angular

A modern construction project management application built with Angular 17+ and Tailwind CSS.

## Features

- **Dashboard**: Overview of projects, inspections, issues, and recent activities
- **Projects**: Manage construction projects and track progress
- **Inspections**: Schedule and manage site inspections
- **Issues**: Track and resolve project issues and concerns
- **Documents**: Manage project documents and files
- **Reports**: Generate and view project reports and analytics
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and Angular Material
- **TypeScript**: Full type safety and better development experience

## Tech Stack

- **Frontend Framework**: Angular 17+
- **Styling**: Tailwind CSS
- **UI Components**: Angular Material
- **Routing**: Angular Router
- **Animations**: Angular Animations
- **Language**: TypeScript
- **Build Tool**: Angular CLI

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 17 or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd civil-spark-workflow-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the project for production
- `npm run build:dev` - Build the project for development
- `npm test` - Run unit tests
- `npm run lint` - Run linting

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── layout/
│   │   └── sidebar/
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── documents/
│   │   ├── inspections/
│   │   ├── issues/
│   │   ├── not-found/
│   │   ├── projects/
│   │   └── reports/
│   ├── services/
│   ├── models/
│   ├── utils/
│   ├── app.component.ts
│   └── app.module.ts
├── assets/
├── styles.css
├── main.ts
└── index.html
```

## Key Components

### Layout Component
- Main layout wrapper with header and sidebar
- Responsive design with collapsible sidebar
- Smooth animations for sidebar toggle

### Header Component
- Navigation header with logo and user controls
- Sidebar toggle button
- User profile and notification icons

### Sidebar Component
- Navigation menu with icons and badges
- Active route highlighting
- Collapsible design

### Dashboard Component
- Overview statistics cards
- Recent activity feed
- Quick action buttons

## Styling

This project uses **Tailwind CSS** for styling with a custom design system:

- **Color Scheme**: Blue-based primary colors with gray accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable component classes
- **Responsive**: Mobile-first responsive design

## Configuration Files

- `angular.json` - Angular CLI configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## Development

### Adding New Components

1. Generate a new component:
   ```bash
   ng generate component components/my-component
   ```

2. Add to the appropriate module in `app.module.ts`

3. Use in templates with the selector: `<app-my-component></app-my-component>`

### Adding New Pages

1. Generate a new page component:
   ```bash
   ng generate component pages/my-page
   ```

2. Add the route to `app.module.ts`:
   ```typescript
   { path: 'my-page', component: MyPageComponent }
   ```

3. Add navigation link to the sidebar

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the established color scheme
- Maintain consistent spacing
- Ensure responsive design
- Use semantic HTML elements

## Building for Production

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **The built files will be in the `dist/` folder**

3. **Deploy the contents of the `dist/` folder to your web server**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
