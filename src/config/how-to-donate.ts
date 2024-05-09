import { CheckIcon } from '@/components/icons/check'
import { DeliverIcon } from '@/components/icons/deliver'
import { FoodIcon } from '@/components/icons/food'
import { MoneyIcon } from '@/components/icons/money'
import { PersonIcon } from '@/components/icons/person'
import { RestrictionIcon } from '@/components/icons/restriction'

export type DonationInfo = {
  title: string
  description: string
  icon: React.ElementType
}

export const donationInfos = [
  {
    title: 'O quê doar',
    description:
      'Roupas em bom estado, alimentos não perecíveis, produtos de higiene pessoal, materiais escolares, e outros itens essenciais.',
    icon: PersonIcon,
  },
  {
    title: 'Condição dos itens',
    description:
      'Certifique-se de que os itens doados estejam em boas condições de uso. Itens danificados ou vencidos não podem ser aceitos.',
    icon: CheckIcon,
  },
  {
    title: 'Restrições',
    description:
      'Não aceitamos doações de itens perecíveis, medicamentos, produtos químicos perigosos ou itens que não estejam em conformidade com os regulamentos de segurança.',
    icon: RestrictionIcon,
  },
  {
    title: 'Entrega',
    description:
      'As doações podem ser entregues nos pontos de coleta designados ou diretamente nos abrigos que estão aceitando.',
    icon: DeliverIcon,
  },
  {
    title: 'Doações monetárias',
    description:
      'Abrigos estão recebendo doações monetárias para suprir as necessidades das pessoas resgatadas e manter suas operações.',
    icon: MoneyIcon,
  },
  {
    title: 'Alimentos prontos',
    description:
      'Precisam estar datados, data e horário que foram feitos para consumo e evitar juntar as comidas velhas e novas.',
    icon: FoodIcon,
  },
] satisfies DonationInfo[]
