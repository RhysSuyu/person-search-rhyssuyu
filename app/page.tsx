import { getAllUsers } from '@/app/actions/actions'
import { UserDialog } from '@/app/components/user-dialog'
import { UserEditDialog } from '@/app/components/user-edit-dialog'
import DeleteButton from '@/app/components/delete-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const users = await getAllUsers()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Person App</h1>
          <p className="text-sm text-muted-foreground">Production CRUD interface backed by Prisma + PostgreSQL.</p>
        </div>
        <UserDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Person Records ({users.length})</CardTitle>
          <CardDescription>Create, update, and delete records directly from this page.</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-muted-foreground">No person records found. Add your first person.</p>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-3 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email} | Age: {user.age ?? '-'} | {user.city ?? 'No city'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserEditDialog user={user} />
                    <DeleteButton userId={user.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
