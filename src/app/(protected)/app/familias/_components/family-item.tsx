import { ListFamiliesResponse } from '@/api/list-families'
import { HomeIcon } from '@/components/icons/home'
import { buttonVariants } from '@/components/ui/button'
import { siteRoutes } from '@/config/site'
import { cellphoneMask } from '@/functions/cellphone-mask'
import { truncateText } from '@/functions/truncate-text'
import { cn } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { forwardRef } from 'react'

type Props = {
  family: ListFamiliesResponse[number]
  showShelter?: boolean
}

export const FamilyItem = forwardRef<HTMLDivElement, Props>(
  ({ family, showShelter = false }, ref) => {
    const phoneNumber = family.cellphone
      ? cellphoneMask(family.cellphone)
      : family.cellphone
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
            {showShelter && (
              <p className="text-sm 2xl:text-base">
                <span className="mr-1 font-bold">Abrigo:</span>
                {truncateText(family.shelter, 80)}
              </p>
            )}
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
          href={`${siteRoutes.protected.registerFamily}/${family.familyId}`}
          className={cn(
            buttonVariants({ variant: 'outlineSecondary' }),
            'text-xl self-center lg:self-auto',
          )}
          scroll={false}
        >
          <EyeIcon className="mr-2 size-5" />
          Ver mais
        </Link>
      </div>
    )
  },
)

FamilyItem.displayName = 'FamilyItem'
