import { listFamilies } from '@/api/list-families'
import { ErrorContainer } from '../../../(public)/(landing-page)/_components/error-container'
import Card from './card'
import HeaderCadastroFamilia from './header'
import SearchCadastroFamilia from './search'

export default async function CadastroFamiliaPage() {
  const { data, message, result } = await listFamilies({
    pageSize: 4,
  })

  if (result === 1) {
    return (
      <>
        <HeaderCadastroFamilia />
        <div className="container mx-auto px-4 py-12">
          <SearchCadastroFamilia />

          {data.map((family) => (
            <Card key={family.familyId} family={family} />
          ))}
        </div>
      </>
    )
  }

  return <ErrorContainer message={message} />
}
