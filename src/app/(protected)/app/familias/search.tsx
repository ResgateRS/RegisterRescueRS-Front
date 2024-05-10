'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  searchItem: string
}

export default function SearchCadastroFamilia() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({})
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const watchSearchItem = watch('searchItem', '')

  const handleSubmitShelter = (data: any) => {
    console.log('Envia os dados para o request de abrigo:', data)
  }

  const handleSubmitGlobal = (data: any) =>
    console.log('Envia os dados para o request global:', data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[8px] md:flex-row md:gap-[12px]">
        <div className="flex w-full flex-col md:w-7/12">
          <input
            type="text"
            className={`w-full rounded-full border-DEFAULT placeholder:text-black ${errors.searchItem ? 'border-red focus:border-red focus:ring-transparent' : 'focus:border-primary border-black ring-transparent'}`}
            placeholder="Buscar abrigado (Nome ou Telefone)"
            {...register('searchItem')}
          />
          {errors.searchItem && (
            <span className="error-message">{errors.searchItem.message}</span>
          )}
        </div>
        <button
          className={`hover:border-primary hover:text-primary w-full rounded-full border-DEFAULT border-black p-2 md:w-2/12 ${watchSearchItem == '' ? 'disabled:text-lightgray disabled:border-lightgray disabled:cursor-not-allowed' : ''}`}
          onClick={handleSubmit(handleSubmitShelter)}
          type="button"
          disabled={watchSearchItem == ''}
        >
          Buscar no abrigo
        </button>
        <button
          className={`hover:border-primary hover:text-primary w-full rounded-full border-DEFAULT border-black p-2 md:w-3/12 ${watchSearchItem == '' ? 'disabled:text-lightgray disabled:border-lightgray disabled:cursor-not-allowed' : ''}`}
          onClick={handleSubmit(handleSubmitGlobal)}
          type="button"
          disabled={watchSearchItem == ''}
        >
          Buscar em Todos os Abrigos
        </button>
      </div>
    </form>
  )
}
