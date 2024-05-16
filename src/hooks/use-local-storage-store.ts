import { localStorageNames } from '@/config/storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LocalStorageState = {
  displayPwaButton: boolean
}

export const useLocalStorageStore = create<LocalStorageState>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set) => ({
      displayPwaButton: true,
    }),
    {
      name: localStorageNames.generalStorage,
    },
  ),
)
