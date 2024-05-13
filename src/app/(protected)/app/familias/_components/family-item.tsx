import { ListFamiliesResponse } from '@/api/list-families'
import { HomeIcon } from '@/components/icons/home'
import { buttonVariants } from '@/components/ui/button'
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import parsePhoneNumber from 'libphonenumber-js'
import Link from 'next/link'
import { forwardRef } from 'react'

type Props = {
  family: ListFamiliesResponse[number]
}

export const FamilyItem = forwardRef<HTMLDivElement, Props>(
  ({ family }, ref) => {
    const phoneNumber = parsePhoneNumber(
      family.cellphone,
      'BR',
    )?.formatNational()
    const updatedAt = new Date(family.updatedAt)
    const hour = updatedAt.toLocaleTimeString('pt-br').split(':')[0]
    const day = updatedAt.toLocaleDateString('pt-br').split('/')[0]
    const month = updatedAt.toLocaleDateString('pt-br').split('/')[1]

    return (
      <div
        ref={ref}
        className="flex w-full flex-col items-start justify-between gap-2 rounded-lg bg-zinc-50 p-4 shadow-lg lg:flex-row lg:items-center lg:gap-0 lg:p-10"
      >
        <div className="flex gap-3 lg:gap-6">
          <div className="flex size-10 items-center justify-center rounded-full bg-celeste/45 2xl:size-12">
            <HomeIcon className="size-4 2xl:size-5" />
          </div>

          <div className="flex flex-col justify-between gap-1">
            <h2 className="text-xl font-bold uppercase 2xl:text-2xl">
              {family.responsable}
            </h2>
            <p className="text-sm 2xl:text-base">
              {phoneNumber ?? family.cellphone}
            </p>
            <p className="text-sm 2xl:text-base">{`${family.totalPeopleNumber} pessoas`}</p>
            <p className="text-sm font-light text-zinc-400 2xl:text-base">
              {`atualizado em ${day}/${month} às ${hour}h`}
            </p>
          </div>
        </div>

        <Link
          href={siteRoutes.protected.registerFamily}
          className={cn(
            buttonVariants({ variant: 'outlineSecondary' }),
            'text-xl self-center lg:self-auto',
          )}
        >
          Saiba mais
        </Link>
      </div>
    )
  },
)

FamilyItem.displayName = 'FamilyItem'
