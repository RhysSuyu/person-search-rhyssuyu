import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function GitHubPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">GitHub Repository</h1>
      <Card>
        <CardHeader>
          <CardTitle>Public Source Code</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-muted-foreground">
            This project is publicly available at the repository below.
          </p>
          <Link
            href="https://github.com/RhysSuyu/person-search-rhyssuyu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            https://github.com/RhysSuyu/person-search-rhyssuyu
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
