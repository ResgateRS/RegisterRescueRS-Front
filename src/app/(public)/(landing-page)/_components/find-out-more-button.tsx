'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowDownIcon } from 'lucide-react'
import Link from 'next/link'

export function FindOutMoreButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    const href = e.currentTarget.href
    const sectionId = href.replace(/.*#/, '')
    const sectionElement = document.getElementById(sectionId)

    sectionElement?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Link
      href={'#doacoes'}
      className={cn(
        buttonVariants({ size: 'sm' }),
        'uppercase text-xl px-11 flex items-center gap-2 group',
      )}
      onClick={(e) => handleClick(e)}
    >
      <ArrowDownIcon className="size-5 duration-300 group-hover:mt-1.5" />
      Saiba mais
    </Link>
  )
}
