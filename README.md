# Church Management System

A comprehensive church management system designed to help religious organizations efficiently manage their congregations, events, finances, and administrative tasks.

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## ✨ Features

### Member Management
- **Member Registration**: Complete member profiles with personal information, contact details, and family relationships
- **Family Management**: Group members into families with hierarchical relationships
- **Member Directory**: Searchable directory with filtering and sorting capabilities
- **Attendance Tracking**: Record and track service attendance with statistical reporting

### Financial Management
- **Donation Tracking**: Record and categorize tithes, offerings, and special contributions
- **Pledge Management**: Track member pledges and fulfillment status
- **Financial Reporting**: Generate comprehensive financial reports and statements
- **Payment Integration**: Support for multiple payment gateways

### Event & Service Management
- **Service Scheduling**: Plan and schedule regular services and special events
- **Event Registration**: Allow members to register for events and activities
- **Resource Booking**: Manage church facilities and equipment reservations
- **Calendar Integration**: Unified calendar view for all church activities

### Communication Tools
- **Messaging System**: Send announcements and messages to members or groups
- **Email Integration**: Automated email notifications and newsletters
- **SMS Notifications**: Text message alerts for important updates
- **Bulletin Management**: Create and distribute digital church bulletins

### Administrative Features
- **User Role Management**: Different access levels for pastors, administrators, and members
- **Audit Trail**: Track all system changes and user activities
- **Data Backup**: Automated backup and restore functionality
- **Multi-branch Support**: Manage multiple church locations from one system

## 🚀 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **Redis** (v6 or higher)
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnoopGeorge418/Church-Management.git
   cd Church-Management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/church_management
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret_here
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Database Setup**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Web Interface: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`
   - Default Admin: `admin@church.com` / `admin123`

## 💻 Usage

### For Administrators

1. **Initial Setup**
   - Log in with admin credentials
   - Configure church information and settings
   - Set up user roles and permissions
   - Import existing member data (if applicable)

2. **Member Management**
   - Add new members through the Members section
   - Create family relationships
   - Update member information and status
   - Generate member reports

3. **Financial Tracking**
   - Record donations and offerings
   - Generate financial reports
   - Track pledges and commitments
   - Export data for accounting software

### For Members

1. **Profile Management**
   - Update personal information
   - View giving history
   - Register for events
   - Access church directory

2. **Online Giving**
   - Make donations online
   - Set up recurring gifts
   - View giving statements
   - Update payment methods

## ⚙️ Configuration

### Database Configuration

The system supports multiple database configurations:

```javascript
// config/database.js
module.exports = {
  development: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  production: {
    uri: process.env.MONGODB_URI,
    options: {
      ssl: true,
      authSource: 'admin'
    }
  }
};
```

### Email Configuration

Configure email settings for notifications:

```javascript
// config/email.js
module.exports = {
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  templates: {
    welcome: './templates/welcome.html',
    reminder: './templates/reminder.html'
  }
};
```

### Security Settings

```javascript
// config/security.js
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: '24h',
  bcryptRounds: 12,
  maxLoginAttempts: 5,
  lockoutTime: 30 * 60 * 1000 // 30 minutes
};
```

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Member Management

```http
GET    /api/members          # Get all members
POST   /api/members          # Create new member
GET    /api/members/:id      # Get member by ID
PUT    /api/members/:id      # Update member
DELETE /api/members/:id      # Delete member
```

### Financial Management

```http
GET    /api/donations        # Get all donations
POST   /api/donations        # Record new donation
GET    /api/donations/:id    # Get donation by ID
GET    /api/reports/financial # Get financial reports
```

### Events

```http
GET    /api/events           # Get all events
POST   /api/events           # Create new event
GET    /api/events/:id       # Get event by ID
POST   /api/events/:id/register # Register for event
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm test
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting
- Keep commits focused and atomic

### Code Style

This project uses ESLint and Prettier for code formatting:

```bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix

# Format code
npm run format
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## 📦 Deployment

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t church-management .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Manual Deployment

1. **Prepare the production environment**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
3. **Start the application**
   ```bash
   npm start
   ```

## 🔧 Troubleshooting

### Common Issues

**Database Connection Issues**
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure database user has proper permissions

**Email Not Sending**
- Verify email credentials
- Check firewall settings
- Ensure less secure app access is enabled (for Gmail)

**Performance Issues**
- Check database indexes
- Monitor memory usage
- Review query performance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help or have questions:

- **Documentation**: Check our [Wiki](https://github.com/AnoopGeorge418/Church-Management/wiki)
- **Issues**: Report bugs on [GitHub Issues](https://github.com/AnoopGeorge418/Church-Management/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/AnoopGeorge418/Church-Management/discussions)
- **Email**: Contact us at support@churchmanagement.com

## 🙏 Acknowledgments

- Thanks to all contributors who have helped make this project better
- Special thanks to the open-source community for inspiration and resources
- Built with love for religious communities worldwide

---

**Made with ❤️ for churches everywhere**
