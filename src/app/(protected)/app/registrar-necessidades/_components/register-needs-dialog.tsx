'use client'

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
import { RegisterNeedsForm } from '../../registrar-necessidades/_components/register-needs-form'

type Props = {
  shelterId: string
  authToken: string
}

export function RegisterNeedsDialog({ shelterId, authToken }: Props) {
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
      >
        <DialogClose
          onClick={onDismiss}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400"
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Registrar necessidades</DialogTitle>
          <DialogDescription>
            Preencha o formulário para salvar as necessidades do abrigo.
          </DialogDescription>
        </DialogHeader>
        <RegisterNeedsForm shelterId={shelterId} authToken={authToken} />
      </DialogContent>
    </Dialog>
  )
}
