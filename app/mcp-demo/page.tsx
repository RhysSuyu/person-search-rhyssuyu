import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import McpDemoClient from './mcp-demo-client'

export const dynamic = 'force-dynamic'

export default function McpDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">MCP Demo</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        This page runs live Person CRUD operations through MCP-style tool calls backed by your production database.
      </p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How To Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Run <code>person_list</code> to fetch records.</p>
          <p>2. Create a test record with <code>person_create</code>.</p>
          <p>3. Update a field with <code>person_update</code>.</p>
          <p>4. Clean up with <code>person_delete</code>.</p>
        </CardContent>
      </Card>

      <McpDemoClient />
    </div>
  )
}
