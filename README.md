# 🚀 Project Manager

A modern, full-stack project management webapp built with Next.js, TypeScript, and SQLite. Designed to manage and track development projects with features, bugs, improvements, and comprehensive metadata.

## ✨ Features

### 🎯 Core Functionality
- **Two-Panel Interface**: Clean project list + detailed project view
- **Project Management**: Create, read, update, delete projects with full metadata
- **Item Tracking**: Manage features, bugs, improvements, tasks, research, and documentation
- **Smart Filtering**: Filter by type, status, priority with real-time search
- **Priority System**: LOW, MEDIUM, HIGH, URGENT priority levels
- **Status Tracking**: Complete workflow from TODO to COMPLETED

### 🛠️ Technical Features
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Database**: SQLite with Prisma ORM and automatic migrations
- **State Management**: Zustand for efficient client-side state
- **Validation**: Zod schemas for runtime type safety
- **Responsive Design**: Works perfectly on desktop and tablet
- **AI Integration Ready**: CLI-friendly database queries for AI assistance

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: SQLite + Prisma ORM
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

3. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
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

The database is designed for easy AI integration:

```bash
# Check high-priority items
sqlite3 prisma/dev.db "
  SELECT p.name as project, pi.name as item, pi.type, pi.priority
  FROM ProjectItem pi
  JOIN Project p ON pi.projectId = p.id
  WHERE pi.priority IN ('HIGH', 'URGENT')
  AND pi.status = 'TODO';
"

# Update item status
sqlite3 prisma/dev.db "
  UPDATE ProjectItem
  SET status='IN_PROGRESS'
  WHERE id='[item-id]';
"
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
# Create new migration
npx prisma migrate dev --name description

# Reset database
npx prisma migrate reset

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

⭐ **Star this repository** if you find it useful!

🚀 **Built with modern web technologies** for efficient project management!
