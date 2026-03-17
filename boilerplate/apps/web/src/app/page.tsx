import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Ticket, Users, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Ticket className="h-6 w-6" />
              <span className="font-bold">Ticketing Platform</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-16 md:pt-24">
          <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">
              Open Source Ticketing Platform
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Self-hosted, modern, and type-safe ticketing solution for events of all sizes.
              Built with Next.js, Fastify, and Prisma.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/register">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" size="lg">
                Browse Events
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Event Management</h3>
              <p className="text-muted-foreground">
                Create and manage events with customizable ticket types, pricing, and availability.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">QR Code Tickets</h3>
              <p className="text-muted-foreground">
                Generate secure QR code tickets with built-in validation and check-in system.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border p-6 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Analytics</h3>
              <p className="text-muted-foreground">
                Track sales, attendance, and revenue with detailed analytics and reporting.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/50">
          <div className="container flex flex-col items-center gap-4 py-16 text-center">
            <h2 className="text-3xl font-bold">Ready to get started?</h2>
            <p className="max-w-[600px] text-muted-foreground">
              Create your account today and start selling tickets in minutes.
            </p>
            <Link href="/register">
              <Button size="lg">Create Account</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ticketing Platform. Open source under MIT license.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://github.com/yourusername/ticketing-platform"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              GitHub
            </Link>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
