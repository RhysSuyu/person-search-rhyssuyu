'use client'

import { useTransition, useState } from 'react'
import {
  mcpCreatePersonAction,
  mcpDeletePersonAction,
  mcpListPeopleAction,
  mcpUpdatePersonAction,
  type McpDemoResult,
} from '@/app/actions/mcp-demo-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const initialCreateState = {
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  city: '',
}

export default function McpDemoClient() {
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('')
  const [personId, setPersonId] = useState('')
  const [updateCity, setUpdateCity] = useState('')
  const [createForm, setCreateForm] = useState(initialCreateState)
  const [result, setResult] = useState<McpDemoResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const run = (fn: () => Promise<McpDemoResult>) => {
    setError(null)
    startTransition(async () => {
      try {
        const response = await fn()
        setResult(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>MCP Tool: person_list</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Optional query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button disabled={isPending} onClick={() => run(() => mcpListPeopleAction(query || undefined))}>
            Run person_list
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MCP Tool: person_create</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="First name"
            value={createForm.firstName}
            onChange={(event) => setCreateForm((prev) => ({ ...prev, firstName: event.target.value }))}
          />
          <Input
            placeholder="Last name"
            value={createForm.lastName}
            onChange={(event) => setCreateForm((prev) => ({ ...prev, lastName: event.target.value }))}
          />
          <Input
            placeholder="Email"
            type="email"
            value={createForm.email}
            onChange={(event) => setCreateForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <Input
            placeholder="Age"
            type="number"
            value={createForm.age}
            onChange={(event) => setCreateForm((prev) => ({ ...prev, age: event.target.value }))}
          />
          <Input
            className="sm:col-span-2"
            placeholder="City"
            value={createForm.city}
            onChange={(event) => setCreateForm((prev) => ({ ...prev, city: event.target.value }))}
          />
          <Button
            className="sm:col-span-2"
            disabled={isPending}
            onClick={() =>
              run(() =>
                mcpCreatePersonAction({
                  firstName: createForm.firstName,
                  lastName: createForm.lastName,
                  email: createForm.email,
                  age: createForm.age ? Number(createForm.age) : null,
                  city: createForm.city || null,
                })
              )
            }
          >
            Run person_create
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MCP Tool: person_update</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Person id" value={personId} onChange={(event) => setPersonId(event.target.value)} />
          <Input
            placeholder="New city"
            value={updateCity}
            onChange={(event) => setUpdateCity(event.target.value)}
          />
          <Button disabled={isPending} onClick={() => run(() => mcpUpdatePersonAction(personId, { city: updateCity }))}>
            Run person_update
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>MCP Tool: person_delete</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Person id to delete"
            value={personId}
            onChange={(event) => setPersonId(event.target.value)}
          />
          <Button variant="destructive" disabled={isPending} onClick={() => run(() => mcpDeletePersonAction(personId))}>
            Run person_delete
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live MCP Response</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {result ? (
            <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
          ) : (
            <p className="text-sm text-muted-foreground">Run any MCP tool above to see real-time output.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
