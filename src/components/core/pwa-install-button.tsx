'use client'

import { usePWAInstallPrompt } from '@/hooks/use-pwa-install-prompt'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import { CheckIcon } from '../icons/check'
import { Button } from '../ui/button'

export function PwaInstallButton() {
  const { installPromptEvent, setInstallPromptEvent } = usePWAInstallPrompt()
  const [isVisible, setIsVisible] = useState(true)

  const handleInstallClick = async () => {
    if (installPromptEvent) {
      await installPromptEvent.prompt()
      const choiceResult = await installPromptEvent.userChoice

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      setInstallPromptEvent(null)
    }
  }

  const handleDismissClick = () => {
    setIsVisible(false)
  }

  if (!isVisible || !installPromptEvent) {
    return null
  }

  return (
    <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 flex-col items-center gap-2 rounded-lg bg-zinc-50 p-2 text-zinc-950 shadow-2xl sm:p-4 ">
      <h1 className="text-center text-xs sm:text-sm">
        Deseja instalar este aplicativo?
      </h1>
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
  )
}
