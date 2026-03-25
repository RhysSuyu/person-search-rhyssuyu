'use server'

import { addUser, deleteUser, getAllUsers, getUserById, updateUser } from '@/app/actions/actions'
import type { User } from '@/app/actions/schemas'

export interface McpDemoResult {
  tool: string
  input: Record<string, unknown>
  output: unknown
  timestamp: string
}

function buildResult(tool: string, input: Record<string, unknown>, output: unknown): McpDemoResult {
  return {
    tool,
    input,
    output,
    timestamp: new Date().toISOString(),
  }
}

export async function mcpListPeopleAction(query?: string): Promise<McpDemoResult> {
  const people = await getAllUsers()
  const filtered = query
    ? people.filter((person) => {
        const haystack = `${person.firstName} ${person.lastName} ${person.email}`.toLowerCase()
        return haystack.includes(query.toLowerCase())
      })
    : people

  return buildResult('person_list', { query: query ?? '' }, filtered)
}

export async function mcpCreatePersonAction(input: Omit<User, 'id'>): Promise<McpDemoResult> {
  const created = await addUser(input)
  return buildResult('person_create', input as Record<string, unknown>, created)
}

export async function mcpUpdatePersonAction(
  id: string,
  patch: Partial<Omit<User, 'id'>>
): Promise<McpDemoResult> {
  const existing = await getUserById(id)

  if (!existing) {
    throw new Error(`Person with id ${id} not found`)
  }

  const merged = {
    firstName: patch.firstName ?? existing.firstName,
    lastName: patch.lastName ?? existing.lastName,
    email: patch.email ?? existing.email,
    age: patch.age ?? existing.age,
    city: patch.city ?? existing.city,
  }

  const updated = await updateUser(id, merged)
  return buildResult('person_update', { id, ...patch }, updated)
}

export async function mcpDeletePersonAction(id: string): Promise<McpDemoResult> {
  const existing = await getUserById(id)

  if (!existing) {
    throw new Error(`Person with id ${id} not found`)
  }

  await deleteUser(id)
  return buildResult('person_delete', { id }, { deleted: true, id })
}
