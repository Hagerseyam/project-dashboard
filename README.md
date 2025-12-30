# project-dashboard

# 📊 Project Dashboard

A feature-rich Project Dashboard Web App built with Next.js, featuring real-time updates, advanced filtering, role-based access control, and beautiful pastel UI design.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript] (https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-purple?style=flat-square&logo=redux)

## 🌐 Live Demo

[View Live Demo](https://your-vercel-url.vercel.app)

---

## ✨ Features

### 🔐 Authentication & Role Management
- **JWT-based authentication** with secure login system
- **Three user roles** with different access levels:
  | Role | Permissions |
  |------|-------------|
  | **Admin** | Full access - manage users, projects, and all settings |
  | **Project Manager** | Manage projects, assign tasks, view analytics |
  | **Developer** | View assigned projects, update task status |
- **Role-based route protection** using Next.js middleware
- **Persistent sessions** with Redux state management

### 📋 Dashboard Page
- **Project listing** with comprehensive data display
- **Pagination** for handling large datasets
- **Multi-column sorting** (Name, Status, Date, Progress, Budget)
- **Advanced filtering** by status, priority, and assigned user
- **Inline editing** for quick field updates
- **Responsive table** with horizontal scroll on mobile

### 📁 Project Details Page
- **Detailed project view** with all project information
- **Task management** system:
  - ✅ Add new tasks
  - ✏️ Toggle task completion
  - 🗑️ Delete tasks
  - 📊 Task progress tracking
- **Visual progress indicators** with gradient progress bars
- **Status and priority badges** with color coding

### 🔍 Search & Advanced Filtering
- **Real-time search** by project name
- **Multi-filter support**:
  - Status: Pending, In Progress, Completed
  - Priority: High, Medium, Low
  - Assigned User: Filter by team member
- **Filter reset** functionality
- **Memoized filtering** for optimal performance

### 📊 Analytics & Visualization
- **Interactive charts** powered by Recharts:
  - 📈 **Progress Chart** - Bar chart showing project completion
  - 🥧 **Status Pie Chart** - Distribution of project statuses
  - 🎯 **Radar Chart** - Multi-dimensional project metrics
  - 📉 **Scatter Chart** - Budget vs Progress correlation
- **Key Performance Indicators (KPIs)**:
  - Total Projects
  - Completed Projects
  - Pending Projects
  - Average Progress
- **Filtered analytics** - Charts update based on applied filters

### 👥 User Management (Admin Only)
- **User listing** with search and filters
- **Role management** - Change user roles inline
- **Status control** - Activate/deactivate users
- **User deletion** with confirmation

### 🎨 UI/UX Features
- **Modern pastel design** with calming color palette
- **Glassmorphism effects** with backdrop blur
- **Smooth animations** and hover transitions
- **Fully responsive** - Mobile, tablet, and desktop
- **Skeleton loaders** for loading states
- **Accessible components** following WCAG guidelines

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **TailwindCSS** | Utility-first styling |
| **Redux Toolkit** | Global state management |
| **Recharts** | Data visualization |
| **React Hooks** | Component logic (useMemo, useState, useEffect) |

---

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page
│   ├── login/              # Authentication page
│   ├── dashboard/          # Main dashboard
│   ├── projects/           # Project listing
│   │   └── [id]/           # Dynamic project details
│   ├── users/              # User management
│   ├── analytics/          # Charts and KPIs
│   ├── api/                # API routes
│   ├── hooks/              # Custom hooks
│   └── utils/              # Mock data and helpers
├── components/             # Reusable components
│   ├── ProjectTable.tsx    # Main project table
│   ├── ProgressChart.tsx   # Bar chart component
│   ├── StatusPieChart.tsx  # Pie chart component
│   ├── RadarChartExample.tsx # Radar chart
│   ├── BubbleChart.tsx     # Scatter/bubble chart
│   ├── Users.tsx           # User management table
│   ├── ProjectSkeleton.tsx # Loading skeleton
│   └── UserSkeleton.tsx    # User loading skeleton
├── redux/                  # State management
│   ├── store.ts            # Redux store configuration
│   └── authSlice.ts        # Authentication state
├── styles/
│   └── globals.css         # Global styles
└── middleware.ts           # Route protection
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/project-dashboard.git
   cd project-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## 🔑 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Project Manager | manager | manager123 |
| Developer | developer | dev123 |

---

## 📱 Responsive Breakpoints

| Breakpoint | Screen Size | Layout |
|------------|-------------|--------|
| Mobile | < 640px | Single column, collapsible sidebar |
| Tablet | 640px - 1024px | Two columns, compact navigation |
| Desktop | > 1024px | Full layout with sidebar |

---

## 🎯 Feature Checklist

### Core Requirements
- [x] Authentication with JWT
- [x] Role-based access (Admin, ProjectManager, Developer)
- [x] Dashboard with project listing
- [x] Pagination and sorting
- [x] Advanced filtering
- [x] Inline editing
- [x] Project details page
- [x] Task management (add, edit, delete)
- [x] Search functionality
- [x] Responsive design
- [x] Skeleton loaders

### Bonus Features
- [x] Charts with Recharts (4 chart types)
- [x] Beautiful pastel UI design
- [x] Glassmorphism effects
- [x] Smooth animations
- [x] KPI dashboard
- [ ] PWA support (optional)
- [ ] WebSocket real-time updates (optional)
- [ ] Form validation with Zod (optional)

---

## 📊 Performance

Target Lighthouse scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
