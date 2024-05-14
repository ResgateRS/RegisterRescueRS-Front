import { SearchFamilySchema } from '@/schemas/search-family-schema'
import { create } from 'zustand'

type FamilyState = {
  searchValues: SearchFamilySchema
}

export const useFamilyStore = create<FamilyState>(() => ({
  searchValues: {
    searchTerm: '',
    scope: 'local',
  },
}))
