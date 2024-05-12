import { Header } from '@/components/core/header'

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header routeType="protected" />
      {children}
    </div>
  )
}
