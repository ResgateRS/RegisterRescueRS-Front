import { ListDonationsResponse } from '@/api/list-donations'
import { HomeIcon } from '@/components/icons/home'
import { buttonVariants } from '@/components/ui/button'
import { truncateText } from '@/functions/truncate-text'
import { cn } from '@/lib/utils'
import { MapPinIcon } from 'lucide-react'
import Link from 'next/link'
import { forwardRef } from 'react'

type Props = {
  donation: ListDonationsResponse[number]
}

export const DonationItem = forwardRef<HTMLDivElement, Props>(
  ({ donation }, ref) => {
    const updatedAt = new Date(donation.updatedAt)
    const hour = updatedAt.toLocaleTimeString('pt-br').split(':')[0]
    const day = updatedAt.toLocaleDateString('pt-br').split('/')[0]
    const month = updatedAt.toLocaleDateString('pt-br').split('/')[1]

    return (
      <div
        ref={ref}
        className="flex h-72 w-full flex-col items-start justify-between gap-2 rounded-lg bg-zinc-50 p-4 shadow-lg lg:p-10"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 lg:gap-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-celeste/45 2xl:size-12">
              <HomeIcon className="size-4 2xl:size-5" />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold uppercase 2xl:text-2xl">
                {donation.shelterName}
              </h2>
              <p className="text-sm 2xl:text-base">{donation.address}</p>
            </div>
          </div>

          {donation.donationDescription && (
            <div className="flex flex-col gap-2 pl-0 lg:pl-16 2xl:pl-[72px]">
              <span className="text-sm font-light uppercase 2xl:text-base">
                Precisam de:
              </span>

              <span className="block text-wrap text-sm 2xl:text-base">
                {truncateText(donation.donationDescription, 250)}
              </span>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col items-end justify-between gap-2 pl-0 sm:flex-row sm:items-center lg:pl-16 2xl:pl-[72px]">
          <p className="text-sm font-light text-zinc-400 2xl:text-base">
            {`atualizado em ${day}/${month} às ${hour}h`}
          </p>
          <Link
            href={`https://www.google.com/maps/place/${donation.latitude},${donation.longitude}`}
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
    )
  },
)

DonationItem.displayName = 'DonationItem'
