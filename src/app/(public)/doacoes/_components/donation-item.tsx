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
    return (
      <div
        ref={ref}
        className="flex w-full flex-col items-start gap-2 rounded-lg bg-zinc-50 p-4 shadow-lg lg:p-10"
      >
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

        <div className="flex flex-col gap-4 pl-0 lg:pl-16 2xl:pl-[72px]">
          <span className="text-sm font-light uppercase 2xl:text-base">
            Precisam de:
          </span>

          <span className="block text-wrap text-sm 2xl:text-base">
            {truncateText(
              `${donation.donationDescription} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Tempora, velit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic cumque sapiente id eos! Placeat aspernatur dolorem distinctio dicta ex sunt reiciendis eaque maxime adipisci perferendis, quo cumque eligendi laboriosam facere ut quibusdam in consequatur consequuntur inventore at omnis. Vel reprehenderit fuga iusto qui nemo optio maiores quaerat sunt corporis. Delectus numquam fugit nulla cum iure repudiandae, eaque exercitationem illum labore itaque corporis inventore impedit nemo voluptatem iste cumque beatae sunt magnam tenetur nostrum aliquam deleniti. Blanditiis debitis repudiandae nesciunt error natus sunt vitae, aliquid eaque corporis earum aspernatur dolores consequatur incidunt repellendus fugiat totam commodi amet maxime atque illo aperiam?`,
              300,
            )}
          </span>
        </div>

        <div className="flex self-end">
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
