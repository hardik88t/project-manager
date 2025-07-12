import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

<<<<<<< HEAD
  // Create a default user
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJQhK6u', // password: admin123
    },
  })
=======
  // Create a default user for seeding
  const defaultUser = await prisma.user.upsert({
    where: { email: 'admin@projectmanager.com' },
    update: {},
    create: {
      email: 'admin@projectmanager.com',
      name: 'Admin User',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.i8mG', // password: admin123
      emailVerified: true,
    },
  });
>>>>>>> origin/main

  // Create the actual project-manager project
  const projectManager = await prisma.project.create({
    data: {
      userId: user.id,
      name: 'Project Manager',
      type: 'WEBAPP',
      status: 'ACTIVE',
      priority: 'HIGH',
      briefDescription: 'A Next.js project management webapp to track and manage development projects',
      detailedDescription: 'This is the current project - a comprehensive project management system built with Next.js, TypeScript, Prisma, and shadcn/ui. It allows tracking of projects with features, bugs, improvements, and other items.',
      githubUrl: 'https://github.com/hardik88t/project-manager',
      localPath: 'project-manager',
      userId: defaultUser.id,
      techStack: JSON.stringify(['Next.js 15', 'TypeScript', 'Prisma', 'SQLite', 'shadcn/ui', 'Tailwind CSS', 'Zustand', 'Zod']),
      tags: JSON.stringify(['project-management', 'webapp', 'nextjs', 'typescript', 'prisma']),
      items: {
        create: [
          {
            name: 'Remove dummy data and add actual project data',
            description: 'Clean up seed file to only contain real project-manager data',
            type: 'TASK',
            status: 'COMPLETED',
            priority: 'HIGH',
            labels: JSON.stringify(['cleanup', 'data', 'seed'])
          },
          {
            name: 'Add search functionality',
            description: 'Implement advanced search across projects and items',
            type: 'FEATURE',
            status: 'TODO',
            priority: 'MEDIUM',
            labels: JSON.stringify(['search', 'ui', 'enhancement'])
          },
          {
            name: 'Fix responsive layout on mobile',
            description: 'The two-panel layout needs better mobile responsiveness',
            type: 'BUG',
            status: 'TODO',
            priority: 'HIGH',
            labels: JSON.stringify(['mobile', 'responsive', 'ui'])
          },
          {
            name: 'Add project templates',
            description: 'Create quick-start templates for different project types',
            type: 'FEATURE',
            status: 'TODO',
            priority: 'LOW',
            labels: JSON.stringify(['templates', 'productivity'])
          },
          {
            name: 'Add import/export functionality',
            description: 'Allow importing and exporting projects in JSON format',
            type: 'FEATURE',
            status: 'TODO',
            priority: 'MEDIUM',
            labels: JSON.stringify(['import', 'export', 'json', 'data'])
          },
          {
            name: 'Add dashboard with analytics',
            description: 'Create a dashboard showing project statistics and progress',
            type: 'FEATURE',
            status: 'TODO',
            priority: 'LOW',
            labels: JSON.stringify(['dashboard', 'analytics', 'statistics'])
          }
        ]
      }
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log(`Created user: ${defaultUser.email}`)
  console.log(`Created project: ${projectManager.name}`)

  // Count total items
  const totalItems = await prisma.projectItem.count()
  console.log(`- Total items created: ${totalItems}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
