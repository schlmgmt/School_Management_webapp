# School Management System - Frontend

A modern, responsive school management system built with React, Vite, Tailwind CSS, and React Router. Features role-based dashboards, dark/light theme support, and a clean, professional UI.

## 🎯 Features

- ✅ **Multi-Role Access Control**
  - Super Admin Dashboard
  - Admin Dashboard
  - Teacher Dashboard
  - Student Dashboard

- 🎨 **Modern UI/UX**
  - Responsive design for all screen sizes
  - Dark/Light theme toggle
  - Clean and intuitive interface
  - Smooth animations and transitions

- 🔐 **Authentication**
  - Protected routes
  - Role-based access control
  - Persistent login state

- ⚡ **Performance**
  - Built with Vite for fast development
  - Optimized production builds
  - Lazy loading support

## 📁 Project Structure

```
sch_frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── dashboards/
│   │       ├── SuperAdminDashboard.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── TeacherDashboard.jsx
│   │       └── StudentDashboard.jsx
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:3000`

## 🔑 Demo Login

You can login with any email and password by selecting the appropriate role:

1. Navigate to the login page
2. Enter any email (e.g., `admin@school.com`)
3. Enter any password
4. Select your role from the dropdown:
   - **Super Admin**: Full system access
   - **Admin**: School management access
   - **Teacher**: Teaching and student management
   - **Student**: Personal academic dashboard

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌓 Theme Support

The application includes a built-in dark/light theme toggle:
- Click the sun/moon icon in the navigation bar
- Theme preference is saved in localStorage
- Smooth transitions between themes

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1280px and up)

## 🛣️ Routes

| Route                      | Access      | Description              |
|---------------------------|-------------|--------------------------|
| `/`                       | Public      | Home page                |
| `/login`                  | Public      | Login page               |
| `/dashboard/super-admin`  | Super Admin | Super Admin dashboard    |
| `/dashboard/admin`        | Admin       | Admin dashboard          |
| `/dashboard/teacher`      | Teacher     | Teacher dashboard        |
| `/dashboard/student`      | Student     | Student dashboard        |

## 🔧 Technologies Used

- **React 19** - UI library
- **Vite 8** - Build tool
- **React Router 6** - Routing
- **Tailwind CSS 3** - Styling
- **Lucide React** - Icons
- **Context API** - State management

## 📦 Production Build

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` folder.

To preview the production build:

```bash
npm run preview
```

## 🎯 Next Steps

This is a foundational setup. You can extend it by:

1. **Backend Integration**
   - Connect to a REST API or GraphQL endpoint
   - Implement real authentication
   - Add data persistence

2. **Additional Features**
   - Student enrollment system
   - Grade management
   - Attendance tracking
   - Timetable management
   - Communication system
   - Report generation

3. **Enhanced UI**
   - Add charts and graphs
   - Implement data tables
   - Add notifications system
   - Create profile pages

## 📄 License

This project is created for educational purposes.

## 👨‍💼 Project Management

This project follows professional folder structure and best practices:
- Clean separation of concerns
- Reusable components
- Context-based state management
- Protected routes for security
- Responsive design patterns
- Scalable architecture

---

**Built with ❤️ for modern education management**
