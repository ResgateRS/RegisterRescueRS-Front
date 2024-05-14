'use client'

import { ListFamilyDetailsResponse } from '@/api/list-family-details'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { RegisterFamilyForm } from './register-family-form'

type Props = {
  authToken: string
  family?: ListFamilyDetailsResponse
}

export function RegisterFamilyDialog({ authToken, family }: Props) {
  const router = useRouter()
  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Dialog open>
      <DialogContent
        onEscapeKeyDown={onDismiss}
        onPointerDownOutside={onDismiss}
        hasCloseButton={false}
        className="max-w-2xl p-3 sm:p-6"
      >
        <DialogClose
          onClick={onDismiss}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400"
        >
          <XIcon className="size-4" />
          <span className="sr-only">Fechar</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>
            {family ? 'Informações da família' : 'Registrar família'}
          </DialogTitle>
          <DialogDescription>
            {family
              ? 'Você pode visualizar ou editar as informações desta família.'
              : 'Preencha o formulário para adicionar uma família ao abrigo.'}
          </DialogDescription>
        </DialogHeader>
        <RegisterFamilyForm authToken={authToken} family={family} />
      </DialogContent>
    </Dialog>
  )
}
