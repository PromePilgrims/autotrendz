import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import Select from 'react-select'

import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import ClientApi from '@/services/ClientApi'
import FolderApi from '@/services/FolderApi'

import makeAnimated from 'react-select/animated'

interface LinkClientProps {
  folder: App.FoldersProps
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
}

export const LinkClient: React.FC<LinkClientProps> = ({
  folder,
  onOpenChange,
  open
}) => {
  const [selectedClients, setSelectedClients] = useState<any>([])

  const animatedComponents = makeAnimated()

  const { data: clients, isLoading } = useQuery<App.ClientsProps[]>({
    queryKey: ['list-clients'],
    queryFn: async () => {
      const res = await ClientApi.list()
      return res.data
    }
  })

  const clientsData = clients?.map((client) => {
    return { label: client.name, value: client.id }
  })

  const handleSubmit = () => {
    FolderApi.linkClients({
      folderId: folder.id,
      client_ids: selectedClients.map((c: any) => c.value)
    }).then(() => {
      onOpenChange(false)
    })
  }

  useEffect(() => {
    const selected = folder?.clients?.map((client) => {
      return { label: client.name, value: client.id }
    })
    setSelectedClients(selected)
  }, [folder])

  if (isLoading) {
    return <></>
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vincular cliente</DialogTitle>
        </DialogHeader>

        <Select
          placeholder="Selecione os clientes que terão acesso"
          isMulti
          components={animatedComponents}
          value={selectedClients as any}
          onChange={(selected) => setSelectedClients(selected)}
          closeMenuOnSelect={false}
          options={clientsData}
        />
        {/* <MultiSelect
          overrideStrings={{
            search: 'Pesquisar cliente',
            selectSomeItems: 'Selecione os clientes que terão acesso',
            noOptions: 'Nenhum cliente encontrado',
            selectAll: 'Selecionar todos',
            allItemsAreSelected: 'Selecionar todos'
          }}
          options={clientsData!}
          value={selectedClients}
          onChange={setSelectedClients}
          labelledBy="Select"
          className="h-9 w-[full] max-w-[465px] rouded-md border-input text-sm"
        /> */}

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Vincular
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
