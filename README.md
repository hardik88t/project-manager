# 🚀 Project Manager

## 📋 Project Overview

- **Type**: WEBAPP
- **Tech Stack**: Next.js 15, TypeScript, PostgreSQL (Cloud), Prisma, Tailwind CSS, shadcn/ui
- **Status**: ACTIVE
- **Live URL**: Coming soon
- **Repository**: [hardik88t/project-manager](https://github.com/hardik88t/project-manager)

## 🎯 What This Project Does

A modern, full-stack project management webapp designed to be the central hub for managing software development projects. It provides an intuitive interface to track everything from high-level features to granular tasks, bugs, and research notes, with developer-centric metadata like tech stack, priority, and repository links.

## ✨ Key Features

- [x] **Two-Panel Interface**: Clean project list + detailed project view
- [x] **Project Management**: Create, read, update, delete projects with full metadata
- [x] **Item Tracking**: Manage features, bugs, improvements, tasks, research, and documentation
- [x] **Smart Filtering**: Filter by type, status, priority with real-time search
- [x] **Priority System**: LOW, MEDIUM, HIGH, URGENT priority levels
- [x] **Status Tracking**: Complete workflow from TODO to COMPLETED
- [x] **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- [x] **Database**: SQLite with Prisma ORM and automatic migrations
- [x] **State Management**: Zustand for efficient client-side state
- [x] **Validation**: Zod schemas for runtime type safety
- [x] **Responsive Design**: Works perfectly on desktop and tablet
- [x] **AI Integration Ready**: CLI-friendly database queries for AI assistance

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL (Cloud) + Prisma ORM
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand
- **Validation**: Zod
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hardik88t/project-manager.git
   cd project-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file with your database URL
   echo "DATABASE_URL=your_database_url_here" > .env
   ```

4. **Set up the database**
   ```bash
   npx prisma generate --no-engine
   npx prisma db push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Projects Table
- **Metadata**: name, type, status, priority, descriptions
- **Links**: live URL, GitHub URL, local path
- **Organization**: tech stack, tags, timestamps
- **Relationships**: One-to-many with project items

### Project Items Table
- **Core**: name, description, type (feature/bug/improvement/etc.)
- **Workflow**: status, priority, labels
- **Tracking**: creation and update timestamps
- **Relationships**: Belongs to project

## 🎨 UI Components

### Project List Panel
- **Add Project**: Quick project creation dialog
- **Search**: Real-time project search
- **Filters**: Type and status filtering
- **Project Cards**: Compact view with key information

### Project Details Panel
- **Project Header**: Name, description, links, metadata
- **Tech Stack & Tags**: Visual organization
- **Items Management**: Add, view, and manage project items
- **Status Tracking**: Visual status and priority indicators

## 🤖 AI Integration

The database is designed for easy AI integration with cloud PostgreSQL:

```bash
# Use Prisma Studio to explore data
npx prisma studio

# Or use direct database queries through Prisma Client
# Check high-priority items programmatically
```

## 📝 Usage Examples

### Creating a Project
1. Click "Add Project" in the left panel
2. Fill in project details (name, type, description, etc.)
3. Add tech stack and tags (comma-separated)
4. Set priority and status
5. Save to create the project

### Managing Items
1. Select a project from the list
2. Click "Add Item" in the project details
3. Choose type (Feature, Bug, Improvement, etc.)
4. Set priority and status
5. Add labels for organization

### Filtering & Search
- Use the search bar for quick project lookup
- Filter by project type (Web App, CLI, API, etc.)
- Filter by status (Planning, Active, Completed, etc.)

## 🔧 Development

### Database Operations
```bash
# Generate Prisma Client
npx prisma generate --no-engine

# Push schema changes
npx prisma db push

# Seed database
npm run db:seed

# View database
npx prisma studio
```

### Building for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
project-manager/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── project-list.tsx
│   │   ├── project-details.tsx
│   │   └── create-*.tsx   # Dialog components
│   ├── lib/               # Utilities
│   │   ├── db.ts          # Prisma client
│   │   ├── utils.ts       # shadcn utils
│   │   └── validations.ts # Zod schemas
│   ├── store/             # Zustand store
│   └── types/             # TypeScript types
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
└── package.json
```

## 🎯 Roadmap

### Phase 2 Features
- [ ] Search functionality enhancement
- [ ] Import/Export (JSON)
- [ ] Dashboard with analytics
- [ ] Bulk operations
- [ ] File attachments
- [ ] Project templates
- [ ] Time tracking
- [ ] Advanced filtering

### Future Enhancements
- [ ] Real-time collaboration
- [ ] Project dependencies
- [ ] Gantt chart view
- [ ] API documentation
- [ ] Mobile app

## 🤝 Contributing

This is primarily a personal project management tool, but suggestions and feedback are welcome:

1. **Issues**: Report bugs or suggest improvements
2. **Discussions**: Share ideas for new features
3. **Pull Requests**: Improvements to documentation or fixes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **GitHub Repository**: [hardik88t/project-manager](https://github.com/hardik88t/project-manager)
- **Live Demo**: Coming soon
- **Documentation**: This README

---

## 📚 Development Documentation

For development workflow, coding practices, and project management integration, see:
- **[DEV.md](./DEV.md)** - Development guide and project manager integration
- **[PLAN.md](./PLAN.md)** - Project planning and feature tracking
- **[DEVLOG.md](./DEVLOG.md)** - Detailed development progress log

---

⭐ **Star this repository** if you find it useful!

🚀 **Built with modern web technologies** for efficient project management!
