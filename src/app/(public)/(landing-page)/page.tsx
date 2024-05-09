import SearchAndList from '@/assets/search-and-list.png'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowDownIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <>
      <section
        id="home"
        className="flex flex-1 items-center justify-between gap-32 bg-celeste px-44 text-zinc-50"
      >
        <div className="flex max-w-xl flex-col gap-5">
          <h1 className="text-5xl font-bold">
            Apoie abrigos e pessoas resgatadas!
          </h1>
          <p className="text-xl font-light">
            Faça a diferença na vida das pessoas e ajude abrigos a fornecer
            cuidados essenciais. Saiba o que os abrigos estão precisando e como
            doar da forma correta!
          </p>

          <Link
            href={'#doacoes'}
            className={cn(
              buttonVariants({ size: 'sm' }),
              'uppercase text-xl px-11 flex items-center gap-2 group',
            )}
          >
            <ArrowDownIcon className="size-5 duration-300 group-hover:mt-1.5" />
            Saiba mais
          </Link>
        </div>

        <Image
          src={SearchAndList}
          className="size-[500px] 2xl:size-[600px]"
          alt="Desenho colorido de uma mulher com uma lupa na mão e uma lista de pessoas à sua frente."
        />
      </section>
    </>
  )
}
