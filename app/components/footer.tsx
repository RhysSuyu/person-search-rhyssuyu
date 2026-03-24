import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="border-t bg-background py-6 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center">
        <nav aria-label="Footer" className="flex items-center gap-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/directory" className="hover:text-primary">
            Directory
          </Link>
        </nav>
        <p>&copy; {currentYear} Rhys Suyu. All rights reserved.</p>
      </div>
    </footer>
  )
}

