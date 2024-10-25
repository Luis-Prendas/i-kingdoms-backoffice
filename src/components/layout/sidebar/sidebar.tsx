import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-4 w-80 h-full bg-zinc-50 border border-zinc-300 rounded p-2 text-zinc-700">
      <Link to="/home" className="flex gap-2 items-center w-full justify-center">
        <img src="/icon.svg" alt="Logo Imaginary Kingdoms Backoffice" className="h-8" />
        <h1 className="text-2xl font-bold">I-Kingdoms</h1>
      </Link>

      <nav className="flex flex-col gap-2 w-full h-full">
        <section className="flex flex-col gap-2">
          <label className="text-xs font-light ml-2 text-black uppercase">Razas</label>

          <div className="flex flex-col">
            <Link to="/home" className="flex px-4 py-2 items-center transition-colors duration-300 transform rounded-lg hover:bg-zinc-500 hover:text-zinc-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
              </svg>
              <span className="mx-2 text-sm font-medium">Lista de razas</span>
            </Link>

            <Link to="/in-construction" className="flex px-4 py-2 items-center transition-colors duration-300 transform rounded-lg hover:bg-zinc-500 hover:text-zinc-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.04 16.5.5-1.5h6.42l.5 1.5H8.29Zm7.46-12a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm-3 2.25a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V9Zm-3 2.25a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z" clipRule="evenodd" />
              </svg>
              <span className="mx-2 text-sm font-medium">Estadisticas</span>
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <label className="text-xs font-light ml-2 text-black uppercase">Test</label>

          <div className="flex flex-col">
            <Link to="/in-construction" className="flex px-4 py-2 items-center transition-colors duration-300 transform rounded-lg hover:bg-zinc-500 hover:text-zinc-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
              <span className="mx-2 text-sm font-medium">En contrucción</span>
            </Link>

            <Link to="/not-found" className="flex px-4 py-2 items-center transition-colors duration-300 transform rounded-lg hover:bg-zinc-500 hover:text-zinc-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
              </svg>
              <span className="mx-2 text-sm font-medium">404</span>
            </Link>
          </div>
        </section>
      </nav>
    </aside>
  )
}