'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'

export function HowToDonateButton() {
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
    <div className="group flex flex-col items-center gap-0 2xl:gap-2">
      <Link
        href={'#como-doar'}
        className={cn(
          buttonVariants({ size: 'sm', variant: 'outlineSecondary' }),
          'text-xl px-11',
        )}
        onClick={(e) => handleClick(e)}
      >
        Saiba como doar
      </Link>
      <ChevronDownIcon className="size-10 text-celeste duration-300 group-hover:translate-y-2" />
    </div>
  )
}
