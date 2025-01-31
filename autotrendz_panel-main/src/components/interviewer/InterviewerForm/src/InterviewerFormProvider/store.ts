import { create } from 'zustand'
import { type InterviewerForm } from '../../types'

type Store = {
  fields: InterviewerForm.Config.Field[]
  addFields: (fields: InterviewerForm.Config.Field[]) => void
  reset: () => void
}

export const useInterfiewFieldsStore = create<Store>((set) => ({
  fields: [],
  addFields: (fields) => {
    set((state) => ({
      fields: [
        ...state.fields.filter((f) => {
          return !fields.some((ff) => ff.name === f.name)
        }),
        ...fields
      ]
    }))
  },
  reset: () => {
    set({
      fields: []
    })
  }
}))
