import Link from 'next/link'

export default function HeaderCadastroFamilia() {
  return (
    <nav className="bg-primary flex flex-wrap items-center justify-between p-6">
      <div className="mr-6 flex shrink-0 items-center text-white">
        <span className="font-poppins text-xl font-semibold tracking-tight">
          <Link href="/">RESGATE RS</Link>
        </span>
      </div>
      <div className="block w-full grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:grow"></div>
        <div>
          <a
            href="#responsive-header"
            className="mr-4 mt-4 block font-poppins text-sm/[12px] text-teal-200 text-white lg:mt-0 lg:inline-block"
          >
            Cadastrar Necessidades
          </a>
          <a
            href="#"
            className="mt-4 inline-block rounded rounded-full border border-white px-4 py-2 font-poppins text-sm/[12px] leading-none text-white hover:border-transparent hover:text-teal-500 lg:mt-0"
          >
            Cadastrar Família
          </a>
        </div>
      </div>
    </nav>
  )
}
