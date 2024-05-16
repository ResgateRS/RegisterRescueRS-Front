import { ListDonationsResponse } from '@/api/list-donations'
import { HomeIcon } from '@/components/icons/home'
import { buttonVariants } from '@/components/ui/button'
import { truncateText } from '@/functions/truncate-text'
import { cn } from '@/lib/utils'
import { MapPinIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  donation: ListDonationsResponse[number]
}

export function DonationItem({ donation }: Props) {
  return (
    <div className="flex size-full flex-col gap-4 rounded-2xl bg-zinc-50 p-5 shadow-lg xl:w-[500px] xl:py-10 2xl:w-[630px]">
      <div className="flex gap-3 lg:gap-6">
        <div className="flex size-10 items-center justify-center rounded-full bg-celeste/45 2xl:size-12">
          <HomeIcon className="size-4 2xl:size-5" />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <h2 className="text-xl font-bold uppercase 2xl:text-2xl">
            {donation.shelterName}
          </h2>
          <p className="text-sm 2xl:text-base">{donation.address}</p>
        </div>
      </div>

      {donation.donationDescription && (
        <div className="flex flex-col gap-4 pl-0 lg:pl-16 2xl:pl-[72px]">
          <span className="text-sm font-light uppercase 2xl:text-base">
            Precisam de:
          </span>

          <span className="text-wrap text-sm 2xl:text-base">
            {truncateText(donation.donationDescription, 350)}
          </span>
        </div>
      )}

      <div className="flex justify-end">
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
}
