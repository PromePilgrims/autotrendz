import { useQuery } from '@tanstack/react-query'
import { Api } from '../../types'

export function useListCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      return [
        {
          id: 'sp',
          name: 'São Paulo'
        },
        {
          id: 'rj',
          name: 'Rio de Janeiro'
        }
      ] as Api.City[]
    }
  })
}
