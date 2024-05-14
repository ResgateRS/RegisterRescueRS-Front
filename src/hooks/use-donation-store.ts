import { SearchDonationSchema } from '@/schemas/search-donation-schema'
import { create } from 'zustand'

type DonationState = SearchDonationSchema

export const useDonationStore = create<DonationState>(() => ({
  searchTerm: '',
}))
