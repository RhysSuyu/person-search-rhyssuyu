'use client'

import { updateUser } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState } from '@/components/mutable-dialog'

interface UserEditDialogProps {
  user: User
}

export function UserEditDialog({ user }: UserEditDialogProps) {
  const handleEditUser = async (data: UserFormData): Promise<ActionState<User>> => {
    try {
      const updatedUser = await updateUser(user.id, data)
      return {
        success: true,
        message: `User ${updatedUser.firstName} ${updatedUser.lastName} updated successfully`,
        data: updatedUser,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user' + (error instanceof Error ? error.message : String(error)),
      }
    }
  }

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleEditUser}
      triggerButtonLabel="Edit"
      editDialogTitle={`Edit ${user.firstName} ${user.lastName}`}
      dialogDescription={`Update the details of ${user.firstName} ${user.lastName} below.`}
      submitButtonLabel="Save Changes"
      defaultValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        city: user.city,
      }}
    />
  )
}
