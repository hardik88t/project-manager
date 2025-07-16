import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default user
  const hashedPassword = await bcrypt.hash('admin123', 12)

  const defaultUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@avinya.it',
      name: 'Administrator',
      password: hashedPassword
    }
  })

  console.log('✅ Created default user:')
  console.log(`- Username: admin`)
  console.log(`- Password: admin123`)
  console.log(`- Email: admin@avinya.it`)

  // Create the Vibin project
  const vibinProject = await prisma.project.create({
    data: {
      name: 'Vibin',
      type: 'WEBAPP',
      status: 'ACTIVE',
      priority: 'HIGH',
      briefDescription: 'A Next.js vibe coding tool with AI integration for project management',
      detailedDescription: 'Vibin is the ultimate vibe coding tool with AI integration. Built with Next.js, TypeScript, Prisma, and shadcn/ui, it helps developers manage projects, track progress, and stay in the flow with intelligent assistance.',
      githubUrl: 'https://github.com/hardik88t/project-manager',
      liveUrl: 'https://vibin.avinya.it',
      localPath: 'vibin',
      userId: defaultUser.id, // Associate with default user
      techStack: JSON.stringify(['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'shadcn/ui', 'Tailwind CSS', 'Zustand', 'Zod', 'AI Integration']),
      tags: JSON.stringify(['vibin', 'ai-integration', 'project-management', 'webapp', 'nextjs', 'typescript', 'coding-tool']),
      items: {
        create: [
          {
            name: 'Implement authentication system',
            description: 'Add user authentication with login, protected routes, and user management',
            type: 'FEATURE',
            status: 'COMPLETED',
            priority: 'HIGH',
            labels: JSON.stringify(['authentication', 'security', 'login'])
          },
          {
            name: 'Add AI integration features',
            description: 'Implement AI-powered coding assistance and project insights',
            type: 'FEATURE',
            status: 'TODO',
            priority: 'HIGH',
            labels: JSON.stringify(['ai', 'integration', 'assistance'])
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
  console.log(`Created project:`)
  console.log(`- ${vibinProject.name}`)

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
