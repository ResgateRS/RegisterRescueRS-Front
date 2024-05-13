type Props = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function AppLayout({ children, modal }: Props) {
  return (
    <>
      {modal}
      {children}
    </>
  )
}
