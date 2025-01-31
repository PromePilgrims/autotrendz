import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { MdKeyboardArrowDown } from 'react-icons/md'

interface ClientActionsProps {
  client: { id: string; name: string }
}

export const ClientActions: React.FC<ClientActionsProps> = ({ client }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleDelete = () => {
    // ClientApi.delete({ id: client.id }).then(() => {
    //   queryClient.invalidateQueries({ queryKey: ['list-clients'] })
    // })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MdKeyboardArrowDown size={32} className="text-colorPrimary-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir o cliente {client.name}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
