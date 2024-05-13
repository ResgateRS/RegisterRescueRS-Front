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
import { RegisterFamilyForm } from './register-family-form'

type Props = {
  authToken: string
}

export function RegisterFamilyDialog({ authToken }: Props) {
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
        className="max-w-2xl"
      >
        <DialogClose
          onClick={onDismiss}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400"
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Registrar família</DialogTitle>
          <DialogDescription>
            Preencha o formulário para adicionar uma família ao abrigo.
          </DialogDescription>
        </DialogHeader>
        <RegisterFamilyForm authToken={authToken} />
      </DialogContent>
    </Dialog>
  )
}
