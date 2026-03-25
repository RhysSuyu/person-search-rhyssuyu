// app/actions/schemas.ts

import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  age: z.preprocess(
    (value) => {
      if (value === '' || value === undefined || value === null) {
        return null
      }
      return Number(value)
    },
    z.number().int().min(0).max(130).nullable()
  ),
  city: z.preprocess(
    (value) => {
      if (value === '' || value === undefined || value === null) {
        return null
      }
      return String(value)
    },
    z.string().min(2).nullable()
  ),
})

export type User = z.infer<typeof userSchema>

export const userFormSchema = userSchema.omit({ id: true })
export type UserFormData = z.infer<typeof userFormSchema>
