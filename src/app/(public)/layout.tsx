import { Header } from '../../components/core/header'

export default function PublicLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header routeType="public" />
      {children}
    </div>
  )
}
