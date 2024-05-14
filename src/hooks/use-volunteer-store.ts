import { SearchVolunteerSchema } from '@/schemas/search-volunteer-schema'
import { create } from 'zustand'

type VolunteerState = SearchVolunteerSchema

export const useVolunteerStore = create<VolunteerState>(() => ({
  searchTerm: '',
}))
