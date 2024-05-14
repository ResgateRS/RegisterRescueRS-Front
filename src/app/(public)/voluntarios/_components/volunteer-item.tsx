import { ListVolunteersResponse } from '@/api/list-volunteers'
import { HomeIcon } from '@/components/icons/home'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MapPinIcon } from 'lucide-react'
import Link from 'next/link'
import { forwardRef } from 'react'
import { VolunteerNeed } from '../../(landing-page)/_components/volunteers/volunteer-need'

type Props = {
  volunteer: ListVolunteersResponse[number]
}

export const VolunteerItem = forwardRef<HTMLDivElement, Props>(
  ({ volunteer }, ref) => {
    const updatedAt = new Date(volunteer.updatedAt)
    const hour = updatedAt.toLocaleTimeString('pt-br').split(':')[0]
    const day = updatedAt.toLocaleDateString('pt-br').split('/')[0]
    const month = updatedAt.toLocaleDateString('pt-br').split('/')[1]

    return (
      <div
        ref={ref}
        className="flex h-80 w-full flex-col items-start justify-between gap-2 rounded-lg bg-zinc-50 p-4 shadow-lg lg:p-10"
      >
        <div className="flex gap-3 xl:gap-6">
          <div className="flex size-10 items-center justify-center rounded-full bg-celeste/45 2xl:size-12">
            <HomeIcon className="size-4 2xl:size-5" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold uppercase 2xl:text-2xl">
              {volunteer.shelterName}
            </h2>
            <p className="text-sm 2xl:text-base">{volunteer.address}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 pl-0 xl:pl-16 2xl:pl-[72px]">
          <span
            data-available={volunteer.avaliable}
            className="text-sm font-extrabold data-[available=false]:text-red-500 data-[available=true]:text-green-500 2xl:text-base"
          >
            {volunteer.avaliable ? 'Abrigo disponível' : 'Abrigo indisponível'}
          </span>

          <div className="grid w-fit grid-cols-2 gap-2">
            <VolunteerNeed
              condition={volunteer.acceptingVolunteers}
              trueDescription="aceita voluntários"
              falseDescription="não aceita voluntários"
            />

            <VolunteerNeed
              condition={volunteer.acceptingDoctors}
              trueDescription="aceita médicos"
              falseDescription="não aceita médicos"
            />

            <VolunteerNeed
              condition={volunteer.acceptingDonations}
              trueDescription="aceita doações"
              falseDescription="não aceita doações"
            />

            <VolunteerNeed
              condition={volunteer.acceptingVeterinarians}
              trueDescription="aceita veterinários"
              falseDescription="não aceita veterinários"
            />
          </div>

          <div className="flex w-full flex-col items-end justify-between gap-2 sm:flex-row sm:items-center ">
            <p className="text-sm font-light text-zinc-400 2xl:text-base">
              {`atualizado em ${day}/${month} às ${hour}h`}
            </p>
            <Link
              href={`https://www.google.com/maps/place/${volunteer.latitude},${volunteer.longitude}`}
              target="_blank"
              className={cn(
                buttonVariants({ variant: 'link', size: 'link' }),
                'text-celeste flex gap-1 items-center',
              )}
            >
              <MapPinIcon className="size-4" />
              Ver no mapa
            </Link>
          </div>
        </div>
      </div>
    )
  },
)

VolunteerItem.displayName = 'VolunteerItem'
