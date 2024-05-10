import Image from 'next/image'
import house from './house.svg'
import { ListFamiliesResponse } from '@/api/global-list-families'

type Props = {
  family: ListFamiliesResponse[number]
}

export default function Card({ family }: Props) {
  const date = new Date(family.updatedAt)
  const day = date.getDate()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')

  return (
    <div className="mt-5 flex flex-col gap-3">
      <div className="hover:shadow-4xl rounded-[30px] bg-white">
        <div className="flex flex-row px-[25px] py-[15px] md:px-[55px] md:py-[35px]">
          <div className="w-[150px] pt-[10px] md:w-[100px]">
            <Image src={house} width={50} height={50} alt="casa" />
          </div>
          <div className="w-full">
            <h2 className="text-primary font-poppins font-bold uppercase">
              {family?.responsable}
            </h2>
            <p className="text-gray text-sm">{family?.cellphone}</p>
            <p className="text-gray text-sm">
              {family?.totalPeopleNumber} pessoa
              {family?.totalPeopleNumber > 1 ? 's' : ''}
            </p>
            <p className="text-lightgray mt-[15px] text-sm text-xs">
              atualizado em {day}/{month} às {hour}Hrs
            </p>
          </div>
          <div className="w-[400px] md:w-[220px]">
            <button className="border-primary text-primary rounded-full border-2 px-8 py-[12px]">
              Saiba Mais
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
