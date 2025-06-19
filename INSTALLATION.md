# Installation Guide - Civil Spark Workflow Hub

## Prerequisites

Before installing, make sure you have:
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 17 or higher)

## Step-by-Step Installation

### 1. Install Angular CLI (if not already installed)
```bash
npm install -g @angular/cli
```

### 2. Clear npm cache (if you encounter issues)
```bash
npm cache clean --force
```

### 3. Install dependencies
```bash
npm install
```

### 4. If you encounter any errors, try these steps:

#### Option A: Delete node_modules and reinstall
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

#### Option B: Install Angular packages individually
```bash
npm install @angular/core@^17.0.0
npm install @angular/common@^17.0.0
npm install @angular/compiler@^17.0.0
npm install @angular/platform-browser@^17.0.0
npm install @angular/platform-browser-dynamic@^17.0.0
npm install @angular/forms@^17.0.0
npm install @angular/router@^17.0.0
npm install @angular/animations@^17.0.0
npm install @angular/cdk@^17.0.0
npm install @angular/material@^17.0.0
```

#### Option C: Use a specific npm version
```bash
npm install -g npm@latest
npm install
```

### 5. Start the development server
```bash
npm start
```

### 6. Open your browser
Navigate to `http://localhost:4200`

## Troubleshooting

### Common Issues

1. **"Invalid package name" error**
   - This was caused by an incorrect package reference in package.json
   - Fixed by removing `@angular/common/http` (it's included in `@angular/common`)

2. **TypeScript errors**
   - Make sure you have TypeScript 5.2.2 or higher
   - Run `npm install typescript@~5.2.2`

3. **Angular CLI not found**
   - Install globally: `npm install -g @angular/cli`

4. **Port 4200 already in use**
   - Use a different port: `ng serve --port 4201`

5. **Tailwind CSS not working**
   - Make sure PostCSS is installed: `npm install -D postcss autoprefixer`

## Verification

After successful installation, you should be able to:

1. **Access the application** at `http://localhost:4200`
2. **Navigate to login** at `http://localhost:4200/login`
3. **Navigate to register** at `http://localhost:4200/register`
4. **See the dashboard** with working navigation
5. **Use all features** including profile, settings, and logout

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
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   └── ... (other pages)
│   │   ├── services/
│   │   └── app.module.ts
│   ├── styles.css
│   └── main.ts
├── package.json
├── angular.json
├── tailwind.config.ts
└── tsconfig.json
```

## Next Steps

Once installation is complete:

1. **Test the authentication flow**:
   - Go to `/register` to create an account
   - Go to `/login` to sign in
   - Test the logout functionality

2. **Explore the features**:
   - Dashboard with statistics
   - Profile management
   - Settings configuration
   - Responsive navigation

3. **Start development**:
   - Add new components: `ng generate component components/my-component`
   - Add new services: `ng generate service services/my-service`
   - Add new pages: `ng generate component pages/my-page`

## Support

If you continue to encounter issues:

1. Check the Angular CLI version: `ng version`
2. Check Node.js version: `node --version`
3. Check npm version: `npm --version`
4. Ensure all versions are compatible with Angular 17 