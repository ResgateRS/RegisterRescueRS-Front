import { ListDonationsResponse } from '@/api/list-donations'
import HomeIcon from '@/assets/home-icon.svg'
import Image from 'next/image'

type Props = {
  donation: ListDonationsResponse[number]
}

export function DonationItem({ donation }: Props) {
  return (
    <div className="flex h-56 w-[500px] flex-col gap-4 rounded-2xl px-4 py-10 shadow-lg 2xl:h-60 2xl:w-[630px]">
      <div className="flex gap-6">
        <div className="flex size-10 items-center justify-center rounded-full bg-celeste/45 2xl:size-12">
          <Image
            src={HomeIcon}
            alt="Ícone de uma casa."
            className="size-4 2xl:size-5"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold uppercase 2xl:text-2xl">
            {donation.shelterName}
          </h2>
          <p className="text-sm 2xl:text-base">{donation.address}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 pl-16 2xl:pl-[72px]">
        <span className="text-sm font-light uppercase 2xl:text-base">
          Precisam de:
        </span>
        <span className="text-sm 2xl:text-base">
          {donation.donationDescription}
        </span>
      </div>
    </div>
  )
}
