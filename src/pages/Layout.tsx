import { ThemeToggle } from "@/components/ThemeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="container mx-auto px-4 py-4 flex justify-end">
        <ThemeToggle />
      </header>
      <main className="container mx-auto py-4">{children}</main>
    </div>
  );
}
