import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DatabasePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Database Structure</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Prisma Schema Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>This app uses Prisma ORM with PostgreSQL via <code>DATABASE_URL</code>.</p>
          <pre className="overflow-x-auto rounded bg-muted p-4">
{`model Person {
  id        String   @id @default(cuid())
  firstName String
  lastName  String
  email     String   @unique
  age       Int?
  city      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Migrations and Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Prisma schema file: <code>prisma/schema.prisma</code></p>
          <p>Prisma config file: <code>prisma.config.ts</code></p>
          <p>Use <code>pnpm prisma migrate dev --name init</code> to create migrations.</p>
          <p>Use <code>pnpm prisma db seed</code> (if configured) to load sample data.</p>
        </CardContent>
      </Card>
    </div>
  )
}
