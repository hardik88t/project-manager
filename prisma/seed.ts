import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Project Manager',
      type: 'WEBAPP',
      status: 'ACTIVE',
      priority: 'HIGH',
      briefDescription: 'A Next.js project management webapp to track and manage development projects',
      detailedDescription: 'This is the current project - a comprehensive project management system built with Next.js, TypeScript, Prisma, and shadcn/ui. It allows tracking of projects with features, bugs, improvements, and other items.',
      githubUrl: 'https://github.com/hardik88t/project-manager',
      localPath: 'project-manager',
      techStack: JSON.stringify(['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'shadcn/ui', 'Tailwind CSS', 'Zustand']),
      tags: JSON.stringify(['project-management', 'webapp', 'nextjs', 'typescript']),
      items: {
        create: [
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
          }
        ]
      }
    }
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'Portfolio Website',
      type: 'WEBSITE',
      status: 'PLANNING',
      priority: 'MEDIUM',
      briefDescription: 'Personal portfolio website showcasing projects and skills',
      detailedDescription: 'A modern, responsive portfolio website built with React and styled with Tailwind CSS. Features project showcases, blog, and contact form.',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/hardik88t/portfolio',
      localPath: 'websites/portfolio-react-shadcn',
      techStack: JSON.stringify(['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'MDX']),
      tags: JSON.stringify(['portfolio', 'personal', 'showcase']),
      items: {
        create: [
          {
            name: 'Design hero section',
            description: 'Create an engaging hero section with animation',
            type: 'FEATURE',
            status: 'IN_PROGRESS',
            priority: 'HIGH',
            labels: JSON.stringify(['design', 'hero', 'animation'])
          },
          {
            name: 'Add blog functionality',
            description: 'Implement MDX-based blog with categories and tags',
            type: 'FEATURE',
            status: 'TODO',
            priority: 'MEDIUM',
            labels: JSON.stringify(['blog', 'mdx', 'content'])
          }
        ]
      }
    }
  })

  const project3 = await prisma.project.create({
    data: {
      name: 'CLI Task Manager',
      type: 'CLI',
      status: 'COMPLETED',
      priority: 'LOW',
      briefDescription: 'Command-line task management tool built with Node.js',
      detailedDescription: 'A simple but powerful CLI tool for managing tasks and todos from the terminal. Features include adding, listing, completing, and deleting tasks with priority levels.',
      githubUrl: 'https://github.com/hardik88t/cli-task-manager',
      localPath: 'cli-tools/task-manager',
      techStack: JSON.stringify(['Node.js', 'Commander.js', 'Chalk', 'JSON']),
      tags: JSON.stringify(['cli', 'productivity', 'tasks']),
      items: {
        create: [
          {
            name: 'Basic CRUD operations',
            description: 'Add, list, update, delete tasks',
            type: 'FEATURE',
            status: 'COMPLETED',
            priority: 'HIGH',
            labels: JSON.stringify(['core', 'crud'])
          },
          {
            name: 'Add due dates',
            description: 'Support for task due dates and reminders',
            type: 'IMPROVEMENT',
            status: 'COMPLETED',
            priority: 'MEDIUM',
            labels: JSON.stringify(['dates', 'reminders'])
          },
          {
            name: 'Export to JSON',
            description: 'Allow exporting tasks to JSON format',
            type: 'FEATURE',
            status: 'COMPLETED',
            priority: 'LOW',
            labels: JSON.stringify(['export', 'json'])
          }
        ]
      }
    }
  })

  const project4 = await prisma.project.create({
    data: {
      name: 'E-commerce API',
      type: 'API',
      status: 'ON_HOLD',
      priority: 'MEDIUM',
      briefDescription: 'RESTful API for e-commerce platform with authentication and payments',
      detailedDescription: 'A comprehensive e-commerce API built with Node.js and Express. Features user authentication, product management, shopping cart, order processing, and Stripe payment integration.',
      githubUrl: 'https://github.com/hardik88t/ecommerce-api',
      localPath: 'apis/ecommerce-nodejs',
      techStack: JSON.stringify(['Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe', 'Joi']),
      tags: JSON.stringify(['api', 'ecommerce', 'backend']),
      items: {
        create: [
          {
            name: 'User authentication system',
            description: 'JWT-based auth with registration, login, password reset',
            type: 'FEATURE',
            status: 'COMPLETED',
            priority: 'URGENT',
            labels: JSON.stringify(['auth', 'jwt', 'security'])
          },
          {
            name: 'Product management endpoints',
            description: 'CRUD operations for products with categories and inventory',
            type: 'FEATURE',
            status: 'COMPLETED',
            priority: 'HIGH',
            labels: JSON.stringify(['products', 'crud', 'inventory'])
          },
          {
            name: 'Shopping cart functionality',
            description: 'Add to cart, update quantities, remove items',
            type: 'FEATURE',
            status: 'IN_PROGRESS',
            priority: 'HIGH',
            labels: JSON.stringify(['cart', 'shopping'])
          },
          {
            name: 'Payment processing',
            description: 'Integrate Stripe for secure payment processing',
            type: 'FEATURE',
            status: 'BLOCKED',
            priority: 'HIGH',
            labels: JSON.stringify(['payments', 'stripe', 'integration'])
          }
        ]
      }
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log(`Created projects:`)
  console.log(`- ${project1.name}`)
  console.log(`- ${project2.name}`)
  console.log(`- ${project3.name}`)
  console.log(`- ${project4.name}`)

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
