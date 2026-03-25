import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function GitHubPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">GitHub Repository</h1>
      <Card>
        <CardHeader>
          <CardTitle>Person App + MCP Server Source Code</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-muted-foreground">
            This repository contains both the Person app and the MCP CRUD server.
          </p>
          <Link
            href="https://github.com/RhysSuyu/person-search-rhyssuyu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            https://github.com/RhysSuyu/person-search-rhyssuyu
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            MCP server file: <code>mcp-server/person-crud-server.mjs</code>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
