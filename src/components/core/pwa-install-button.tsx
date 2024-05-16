'use client'

import { useLocalStorageStore } from '@/hooks/use-local-storage-store'
import { usePWAInstallPrompt } from '@/hooks/use-pwa-install-prompt'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import { CheckIcon } from '../icons/check'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

export function PwaInstallButton() {
  const { displayPwaButton } = useLocalStorageStore()
  const [isVisible, setIsVisible] = useState(displayPwaButton)
  const [doNotShowAgain, setDoNotShowAgain] = useState(false)
  const { installPromptEvent } = usePWAInstallPrompt()

  const handleInstallClick = async () => {
    if (installPromptEvent) {
      await installPromptEvent.prompt()

      setIsVisible(false)
      if (doNotShowAgain) {
        useLocalStorageStore.setState((state) => ({
          ...state,
          displayPwaButton: false,
        }))
      }
    }
  }

  const handleDismissClick = () => {
    setIsVisible(false)
    if (doNotShowAgain) {
      useLocalStorageStore.setState((state) => ({
        ...state,
        displayPwaButton: false,
      }))
    }
  }

  if (!isVisible || !installPromptEvent || !displayPwaButton) {
    return null
  }

  return (
    <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 flex-col items-center gap-4 rounded-lg bg-zinc-50 p-2 text-zinc-950 shadow-2xl sm:p-4 ">
      <h1 className="text-center text-xs font-medium sm:text-sm">
        Deseja instalar este aplicativo?
      </h1>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={doNotShowAgain}
            onCheckedChange={(choice) => {
              if (typeof choice === 'boolean') {
                setDoNotShowAgain(choice)
              }
            }}
            id="doNotShowAgain"
            className="size-4"
          />
          <Label
            htmlFor="doNotShowAgain"
            className="text-xs font-medium leading-none text-zinc-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm"
          >
            Não perguntar novamente
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleDismissClick}
            className="rounded-lg border-none bg-red-600 px-2 py-1 text-xs uppercase text-zinc-50 hover:bg-red-700 hover:text-zinc-50 sm:px-4 sm:text-sm"
          >
            <XIcon className="mr-1 size-4 sm:mr-2" />
            Não
          </Button>
          <Button
            size="sm"
            onClick={handleInstallClick}
            className="rounded-lg border-none bg-green-600 px-2 py-1 text-xs uppercase text-zinc-50 hover:bg-green-700 hover:text-zinc-50 sm:px-4 sm:text-sm"
          >
            <CheckIcon className="mr-1 size-4 sm:mr-2" />
            Sim
          </Button>
        </div>
      </div>
    </div>
  )
}
