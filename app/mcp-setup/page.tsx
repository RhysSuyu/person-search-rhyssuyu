import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const claudeConfig = `{
  "mcpServers": {
    "person-crud": {
      "command": "node",
      "args": ["C:/path/to/person-search-rhyssuyu/mcp-server/person-crud-server.mjs"],
      "env": {
        "DATABASE_URL": "postgresql://<user>:<password>@<host>/<db>?sslmode=require",
        "AUTH_SECRET": "<your-auth-secret>"
      }
    }
  }
}`

const demoPrompt = `Use person_list to show all people, then person_create for John Doe, then person_update to set city to Sydney, and finally person_delete for that id.`

export default function McpSetupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">MCP Setup Guide</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step-by-Step Claude Desktop Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>1. Clone this repository locally.</p>
          <p>2. Run <code>pnpm install</code>.</p>
          <p>3. Ensure your <code>DATABASE_URL</code> works against the Person table.</p>
          <p>4. Add the MCP server config shown below to Claude Desktop config.</p>
          <p>5. Restart Claude Desktop and verify the <code>person-crud</code> server is connected.</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Claude Desktop MCP Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">{claudeConfig}</pre>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>MCP Tools Provided By This Server</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><code>person_list</code>: List people with optional query filter.</p>
          <p><code>person_create</code>: Create a person record.</p>
          <p><code>person_update</code>: Update any person fields by id.</p>
          <p><code>person_delete</code>: Delete a person by id.</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Claude Desktop Test Prompt Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">{demoPrompt}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expected CRUD Response Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">{`{
  "tool": "person_create",
  "output": {
    "id": "ck...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 29,
    "city": "Sydney"
  }
}`}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
