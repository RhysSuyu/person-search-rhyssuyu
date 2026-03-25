import 'dotenv/config'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { z } from 'zod'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required to run the MCP server.')
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
  log: ['error', 'warn'],
})

const server = new McpServer({
  name: 'person-crud-mcp-server',
  version: '1.0.0',
})

server.registerTool(
  'person_list',
  {
    title: 'List People',
    description: 'List person records from the database. Optional text query filters first name, last name, or email.',
    inputSchema: {
      query: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional(),
    },
  },
  async ({ query, limit = 20 }) => {
    const people = await prisma.person.findMany({
      where: query
        ? {
            OR: [
              { firstName: { contains: query, mode: 'insensitive' } },
              { lastName: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
      take: limit,
    })

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(people, null, 2),
        },
      ],
    }
  }
)

server.registerTool(
  'person_create',
  {
    title: 'Create Person',
    description: 'Create a new person record.',
    inputSchema: {
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      email: z.string().email(),
      age: z.number().int().min(0).max(130).nullable().optional(),
      city: z.string().min(2).nullable().optional(),
    },
  },
  async ({ firstName, lastName, email, age = null, city = null }) => {
    const person = await prisma.person.create({
      data: {
        firstName,
        lastName,
        email,
        age,
        city,
      },
    })

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(person, null, 2),
        },
      ],
    }
  }
)

server.registerTool(
  'person_update',
  {
    title: 'Update Person',
    description: 'Update an existing person by id.',
    inputSchema: {
      id: z.string().min(1),
      firstName: z.string().min(2).optional(),
      lastName: z.string().min(2).optional(),
      email: z.string().email().optional(),
      age: z.number().int().min(0).max(130).nullable().optional(),
      city: z.string().min(2).nullable().optional(),
    },
  },
  async ({ id, firstName, lastName, email, age, city }) => {
    const person = await prisma.person.update({
      where: { id },
      data: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(age !== undefined ? { age } : {}),
        ...(city !== undefined ? { city } : {}),
      },
    })

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(person, null, 2),
        },
      ],
    }
  }
)

server.registerTool(
  'person_delete',
  {
    title: 'Delete Person',
    description: 'Delete a person by id.',
    inputSchema: {
      id: z.string().min(1),
    },
  },
  async ({ id }) => {
    const deleted = await prisma.person.delete({ where: { id } })

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              deleted: true,
              id: deleted.id,
              name: `${deleted.firstName} ${deleted.lastName}`,
            },
            null,
            2
          ),
        },
      ],
    }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
