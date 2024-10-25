import { Sidebar } from "./sidebar/sidebar";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full h-screen bg-zinc-100 flex justify-start items-start gap-2 p-2">
      <Sidebar />
      <main className="flex flex-col w-full h-full gap-2">
        <header className="flex w-full h-16 bg-zinc-50 border border-zinc-300 rounded">Header</header>
        <section className="flex w-full h-full bg-zinc-50 border border-zinc-300 rounded">{children}</section>
      </main>
    </div>
  )
}