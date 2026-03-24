import { getAllUsers } from '@/app/actions/actions'
import { UserEditDialog } from '@/app/components/user-edit-dialog'
import DeleteButton from '@/app/components/delete-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function DirectoryPage() {
  const users = await getAllUsers()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Directory</h1>

      <Card>
        <CardHeader>
          <CardTitle>People ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-muted-foreground">No users found.</p>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-3 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email || 'No email'} | {user.phoneNumber}</p>
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
