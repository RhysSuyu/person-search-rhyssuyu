//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { User, userFormSchema, userSchema } from './schemas'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

function toActionErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof ZodError) {
        return error.issues[0]?.message ?? fallback
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            const target = Array.isArray(error.meta?.target)
                ? (error.meta?.target as string[])
                : []

            if (target.includes('email')) {
                return 'A user with this email already exists.'
            }

            return 'A record with these details already exists.'
        }

        if (error.code === 'P2025') {
            return 'The user was not found.'
        }
    }

    if (error instanceof Error && error.message.trim().length > 0) {
        return error.message
    }

    return fallback
}

export async function searchUsers(query: string): Promise<User[]> {
    if (!query.trim()) {
        return []
    }

    const users = await prisma.person.findMany({
        where: {
            OR: [
                { firstName: { contains: query, mode: 'insensitive' } },
                { lastName: { contains: query, mode: 'insensitive' } },
                { email: { contains: query, mode: 'insensitive' } },
            ],
        },
        orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
        take: 20,
    })

    return users.map((user) => userSchema.parse(user))
}

export async function addUser(data: Omit<User, 'id'>): Promise<User> {
    try {
        const validatedInput = userFormSchema.parse(data)

        const createdUser = await prisma.person.create({
            data: validatedInput,
        })

        revalidatePath('/')
        revalidatePath('/directory')
        return userSchema.parse(createdUser)
    } catch (error) {
        throw new Error(toActionErrorMessage(error, 'Failed to add user.'))
    }
}

export async function deleteUser(id: string): Promise<void> {
    try {
        await prisma.person.delete({ where: { id } })
        revalidatePath('/')
        revalidatePath('/directory')
    } catch (error) {
        throw new Error(toActionErrorMessage(error, 'Failed to delete user.'))
    }

}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    try {
        const validatedInput = userFormSchema.parse(data)
        const updatedUser = await prisma.person.update({
            where: { id },
            data: validatedInput,
        })

        revalidatePath('/')
        revalidatePath('/directory')

        return userSchema.parse(updatedUser)
    } catch (error) {
        throw new Error(toActionErrorMessage(error, 'Failed to update user.'))
    }
}

export async function getAllUsers(): Promise<User[]> {
    const users = await prisma.person.findMany({
        orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    })
    return users.map((user) => userSchema.parse(user))
}

export const getUserById = cache(async (id: string) => {
    const user = await prisma.person.findUnique({ where: { id } })
    return user ? userSchema.parse(user) : null
})
