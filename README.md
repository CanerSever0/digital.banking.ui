# Digital Banking UI

A modern, responsive digital banking web application built with React, featuring comprehensive customer management, account operations, and transaction processing capabilities.

## 🏦 Overview

Digital Banking UI is a full-featured banking management system that provides an intuitive interface for managing customers, accounts, and transactions. The application features a clean, modern design built with React and Tailwind CSS, offering real-time data visualization and seamless user interactions.

## ✨ Features

### Core Functionality
- **Dashboard Analytics**: Real-time overview of bank operations with key performance indicators
- **Customer Management**: Create, view, and manage customer profiles with detailed information
- **Account Management**: Handle various account types with balance tracking and account operations
- **Transaction Processing**: Process transfers, deposits, withdrawals with comprehensive transaction history
- **Real-time Updates**: Live data updates across all modules

### User Interface
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Modern UI Components**: Clean, intuitive interface using Tailwind CSS
- **Interactive Dashboard**: Visual statistics and quick action buttons
- **Modal-based Forms**: User-friendly forms for creating customers, accounts, and transactions
- **Loading States**: Smooth loading indicators for better user experience

### Technical Features
- **API Integration**: RESTful API communication with error handling
- **Authentication**: Token-based authentication with automatic logout
- **Error Handling**: Comprehensive error management with user feedback
- **Performance Optimized**: Efficient data loading and component rendering

## 🚀 Technology Stack

### Frontend
- **React 19.1.0**: Modern React with hooks and functional components
- **React Router DOM 6.30.1**: Client-side routing and navigation
- **Axios 1.9.0**: HTTP client for API communication
- **Lucide React 0.511.0**: Modern icon library

### Styling & UI
- **Tailwind CSS 3.4.0**: Utility-first CSS framework
- **@tailwindcss/forms 0.5.10**: Enhanced form styling
- **PostCSS 8.5.4**: CSS post-processing
- **Autoprefixer 10.4.21**: Automatic vendor prefixing

### Development & Testing
- **React Scripts 5.0.1**: Create React App toolchain
- **Testing Library**: React, Jest DOM, User Event testing utilities
- **Web Vitals 2.1.4**: Performance monitoring

## 📁 Project Structure

```
digital.banking.ui/
├── public/                          # Static assets
│   ├── favicon.ico                  # Website favicon
│   ├── index.html                   # Main HTML template
│   ├── logo192.png                  # PWA icon (192x192)
│   ├── logo512.png                  # PWA icon (512x512)
│   ├── manifest.json                # PWA manifest
│   └── robots.txt                   # Search engine directives
├── src/                             # Source code
│   ├── components/                  # React components
│   │   ├── Accounts/               # Account management components
│   │   ├── Customers/              # Customer management components
│   │   ├── Dashboard/              # Dashboard and analytics components
│   │   │   └── Dashboard.js        # Main dashboard component (748 lines)
│   │   ├── Layout/                 # Layout components
│   │   │   ├── Header.js           # Application header
│   │   │   └── Sidebar.js          # Navigation sidebar
│   │   └── Transactions/           # Transaction management components
│   ├── services/                   # API services and utilities
│   │   ├── accountService.js       # Account-related API calls
│   │   ├── api.js                  # Axios instance and interceptors
│   │   ├── customerService.js      # Customer-related API calls
│   │   ├── index.js                # Service exports
│   │   └── transactionService.js   # Transaction-related API calls
│   ├── utils/                      # Utility functions
│   │   └── apiTest.js              # API testing utilities
│   ├── App.css                     # Application-specific styles
│   ├── App.js                      # Main application component
│   ├── App.test.js                 # Application tests
│   ├── index.css                   # Global styles and Tailwind imports
│   ├── index.js                    # Application entry point
│   ├── logo.svg                    # React logo
│   ├── reportWebVitals.js          # Performance monitoring
│   └── setupTests.js               # Test configuration
├── .gitignore                      # Git ignore rules
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── README.md                       # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Git (for version control)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital.banking.ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (if needed)
   ```bash
   # Create .env file for production API URL
   REACT_APP_API_URL=https://your-api-url.com
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will open in your browser at `http://localhost:3000`.

## 📜 Available Scripts

### Development
- `npm start`: Runs the app in development mode with hot reloading
- `npm test`: Launches the test runner in interactive watch mode
- `npm run build`: Builds the app for production to the `build` folder
- `npm run eject`: Ejects from Create React App (irreversible)

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build` folder.

## 🔧 Configuration

### API Configuration
The application uses a proxy configuration for development:
- **Development**: Proxies API calls to `http://localhost:8080`
- **Production**: Uses `REACT_APP_API_URL` environment variable

### Tailwind CSS Configuration
Custom theme extensions include:
- **Primary Colors**: Blue color palette (50-700)
- **Animations**: Fade-in and slide-up animations
- **Forms Plugin**: Enhanced form styling

### Browser Support
- Production: >0.2%, not dead, not op_mini all
- Development: Latest Chrome, Firefox, and Safari versions

## 🏗️ Architecture & Components

### Component Architecture
The application follows a modular component architecture:

#### Layout Components
- **Header**: Top navigation bar with branding and user information
- **Sidebar**: Navigation menu with active state management

#### Feature Components
- **Dashboard**: Central hub with statistics, charts, and quick actions
- **Customer Management**: CRUD operations for customer data
- **Account Management**: Account creation and management functionality
- **Transaction Management**: Transfer and transaction processing

#### Service Layer
- **API Client**: Centralized Axios instance with interceptors
- **Service Modules**: Dedicated services for each business domain
- **Error Handling**: Consistent error management across services

### State Management
- **React Hooks**: useState and useEffect for local component state
- **Tab Navigation**: Centralized active tab state in main App component
- **Modal Management**: Local modal state with success callbacks

### API Integration
- **RESTful APIs**: Integration with backend banking services
- **Authentication**: Bearer token authentication with automatic refresh
- **Error Handling**: Global error handling with user notifications
- **Request/Response Logging**: Development-friendly API logging

## 🎨 UI/UX Features

### Design System
- **Modern Interface**: Clean, professional banking application design
- **Responsive Layout**: Mobile-first responsive design
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Loading States**: Smooth loading indicators and transitions

### Interactive Elements
- **Hover Effects**: Subtle hover animations on interactive elements
- **Modal Dialogs**: Clean modal interfaces for forms and confirmations
- **Form Validation**: Client-side validation with user feedback
- **Quick Actions**: One-click actions for common operations

## 🔒 Security Features

- **Token-based Authentication**: Secure API authentication
- **Automatic Logout**: Session management with automatic logout on token expiry
- **Input Validation**: Form validation for data integrity
- **Error Handling**: Secure error messages without sensitive information exposure

## 🚀 Deployment

### Development Deployment
```bash
npm start
```

### Production Deployment
```bash
npm run build
npm install -g serve
serve -s build
```

### Environment Variables
Set the following environment variables for production:
- `REACT_APP_API_URL`: Backend API URL
- `NODE_ENV`: Set to 'production' for production builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


**Built with ❤️ using React and Tailwind CSS** 