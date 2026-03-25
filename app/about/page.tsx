import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">About This App</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Architecture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            This is a full-stack Next.js App Router project with Prisma and PostgreSQL.
            CRUD operations are executed through Next.js server actions, then revalidated so UI updates immediately.
          </p>
          <p>
            The main interface is on <code>/</code> and <code>/directory</code>, where users can create, read, update,
            and delete person records.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Next.js 16 + React 19 + TypeScript</p>
          <p>Prisma 7 ORM + PostgreSQL database</p>
          <p>Tailwind CSS + shadcn/ui components</p>
          <p>Zod + React Hook Form for validation and form handling</p>
        </CardContent>
      </Card>
    </div>
  )
}
