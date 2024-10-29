import { SidebarLayout } from "./sidebar/sidebar";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full h-full grid grid-cols-[70px_200px_repeat(10,1fr)] grid-rows-[80px_repeat(5,1fr)] gap-2 p-2">
      <aside className="[grid-area:1_/_1_/_7_/_3]"><SidebarLayout /></aside>
      <header className="[grid-area:1_/_3_/_2_/_13] bg-card border rounded">Header</header>
      <main className="[grid-area:2_/_3_/_7_/_13] bg-card border rounded">{children}</main>
    </div>
  )
}