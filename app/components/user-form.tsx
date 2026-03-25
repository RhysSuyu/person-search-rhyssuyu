// app/components/user-form.tsx
'use client'

import { UseFormReturn } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserFormData } from '../actions/schemas'


interface FormComponentProps {
  form: UseFormReturn<UserFormData>
}

export function UserForm({ form }: FormComponentProps) {
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} />
            </FormControl>
            <FormDescription>
              Enter first name.
            </FormDescription>
            {fieldState.error && (
                            <p className="text-red-600 text-sm mt-1">
                                {String(fieldState.error) || ''}
                            </p>
                        ) }
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Doe" {...field} />
            </FormControl>
            <FormDescription>
              Enter last name.
            </FormDescription>
            {fieldState.error && (
                            <p className="text-red-600 text-sm mt-1">
                                {String(fieldState.error) || ''}
                            </p>
                        ) }
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="john@example.com" {...field} />
            </FormControl>
            <FormDescription>
              Enter email address.
            </FormDescription>
            {fieldState.error && (
                            <p className="text-red-600 text-sm mt-1">
                                {String(fieldState.error) || ''}
                            </p>
                        ) }
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="age"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="29"
                value={field.value ?? ''}
                onChange={(event) => field.onChange(event.target.value)}
              />
            </FormControl>
            <FormDescription>
              Enter age (optional).
            </FormDescription>
            {fieldState.error && (
                            <p className="text-red-600 text-sm mt-1">
                                {String(fieldState.error) || ''}
                            </p>
                        ) }
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="city"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input placeholder="Sydney" value={field.value ?? ''} onChange={field.onChange} />
            </FormControl>
            <FormDescription>
              Enter city (optional).
            </FormDescription>
            {fieldState.error && (
                            <p className="text-red-600 text-sm mt-1">
                                {String(fieldState.error) || ''}
                            </p>
                        ) }
          </FormItem>
        )}
      />
    </Form>
  )
}