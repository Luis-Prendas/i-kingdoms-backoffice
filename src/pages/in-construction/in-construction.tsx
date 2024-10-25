export function InConstruction() {
  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
      <div className="bg-caution-tape w-96 h-5 absolute rotate-[60deg] top-0 -right-32" />
      <div className="bg-caution-tape w-96 h-5 absolute rotate-[22deg] top-0 -right-5" />
      <div className="bg-caution-tape w-full h-5 absolute rotate-[8deg] bottom-0 -left-20" />

      <section className="flex justify-center items-center mb-28">
        <div className="flex flex-col gap-4">
          <p className="text-6xl">Esta página está<br />siendo construida</p>
          <span className="w-72 h-[2px] bg-zinc-700 rounded" />
          <p>Más información en las siguientes actualizaciones, gracias.</p>
        </div>
        <img src="/under-construntion.png" alt="Under Contruction" />
      </section>
    </div>
  )
}