type Props = {
  title?: string
  message?: string
}

export function ErrorContainer({
  title = 'Algo deu errado! Tente recarregar a página.',
  message,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-red-500">
      <h1 className="text-2xl font-bold">{title}</h1>
      {message && <p>{message}</p>}
    </div>
  )
}
