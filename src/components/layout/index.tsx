import { SidebarLayout } from "./sidebar/sidebar";

export function Layout({ children }: React.PropsWithChildren) {
  return (
      <div className="w-full h-screen bg-background flex justify-start items-start gap-2 p-2">
        <SidebarLayout />
        <main className="flex flex-col w-full h-full gap-2">
          <header className="flex w-full h-16 bg-card border rounded">Header</header>
          <section className="flex w-full h-full bg-card border rounded">{children}</section>
        </main>
      </div>
  )
}