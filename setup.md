# Setup Guide - Civil Spark Workflow Hub (Angular)

## Quick Start

### 1. Install Angular CLI (if not already installed)
```bash
npm install -g @angular/cli
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

### 4. Open Browser
Navigate to `http://localhost:4200`

## What's Been Converted

### ✅ Configuration Files
- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration for Angular
- `tailwind.config.ts` - Updated for Angular project structure
- `postcss.config.js` - PostCSS configuration
- `package.json` - Angular dependencies and scripts

### ✅ Core Application Files
- `src/main.ts` - Angular bootstrap file
- `src/index.html` - Main HTML template
- `src/styles.css` - Global styles with Tailwind CSS
- `src/app/app.module.ts` - Main Angular module with routing
- `src/app/app.component.ts` - Root component

### ✅ Layout Components
- `src/app/components/layout/` - Main layout with sidebar toggle
- `src/app/components/header/` - Header with navigation
- `src/app/components/sidebar/` - Navigation sidebar

### ✅ Page Components
- `src/app/pages/dashboard/` - Dashboard with stats and activities
- `src/app/pages/projects/` - Projects management
- `src/app/pages/inspections/` - Site inspections
- `src/app/pages/issues/` - Issue tracking
- `src/app/pages/documents/` - Document management
- `src/app/pages/reports/` - Reports and analytics
- `src/app/pages/not-found/` - 404 page

### ✅ Features Converted
- **Routing**: Angular Router with child routes
- **Animations**: Angular Animations for sidebar and content
- **Responsive Design**: Tailwind CSS responsive classes
- **TypeScript**: Full type safety
- **Component Architecture**: Modular component structure
- **Styling**: Tailwind CSS with custom design system

## Key Differences from React Version

### Component Structure
- **React**: Functional components with hooks
- **Angular**: Class-based components with decorators

### State Management
- **React**: useState, useEffect hooks
- **Angular**: Component properties and lifecycle hooks

### Routing
- **React**: React Router with JSX routes
- **Angular**: Angular Router with TypeScript configuration

### Styling
- **React**: Same Tailwind CSS classes
- **Angular**: Same Tailwind CSS classes (no changes needed)

### Animations
- **React**: Framer Motion
- **Angular**: Angular Animations with triggers

## Next Steps

1. **Install Angular CLI globally** (if not already installed)
2. **Run the development server**
3. **Start building additional features**
4. **Add services for data management**
5. **Implement authentication**
6. **Add more UI components**

## Troubleshooting

### Common Issues

1. **Angular CLI not found**
   ```bash
   npm install -g @angular/cli
   ```

2. **Port 4200 already in use**
   ```bash
   ng serve --port 4201
   ```

3. **TypeScript errors**
   ```bash
   npm install
   ng build
   ```

4. **Tailwind CSS not working**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Build for development
npm run build:dev

# Run tests
npm test

# Run linting
npm run lint

# Generate new component
ng generate component components/my-component

# Generate new service
ng generate service services/my-service
```

## Project Structure

```
civil-spark-workflow-hub/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── layout/
│   │   │   └── sidebar/
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   ├── documents/
│   │   │   ├── inspections/
│   │   │   ├── issues/
│   │   │   ├── not-found/
│   │   │   ├── projects/
│   │   │   └── reports/
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── angular.json
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

The Angular version maintains the same visual design and functionality as the React version while using Angular's architecture and patterns. 