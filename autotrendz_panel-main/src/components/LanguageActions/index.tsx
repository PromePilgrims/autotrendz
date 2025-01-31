import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'

import { MdKeyboardArrowDown } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LanguageApi from '@/services/LanguageApi'
import { toast } from '../ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { Checkbox } from '../ui/checkbox'

interface ClientActionsProps {
  language: App.LanguageProps
}

export const LanguageActions: React.FC<ClientActionsProps> = ({ language }) => {
  const queryClient = useQueryClient()

  const [openEdit, setOpenEdit] = useState(false)

  const [name, setName] = useState(language.name)
  const [code, setCode] = useState(language.code)
  const [active, setActive] = useState(language.active)

  const handleEdit = () => {
    if (name !== '' && code !== '') {
      LanguageApi.edit({ name, code, active, id: language.id }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['list-languages'] })
        toast({
          title: 'Sucesso',
          description: 'Linguagem atualizada com sucesso',
          variant: 'success'
        })
      })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MdKeyboardArrowDown size={32} className="text-colorPrimary-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Editar
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            Excluir
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir o idioma {language.name}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center">
              <Label className="w-16" htmlFor="name">
                Nome
              </Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                value={name}
              />
            </div>
            <div className="flex items-center">
              <Label className="w-16" htmlFor="email">
                E-mail
              </Label>
              <Input
                onChange={(e) => setCode(e.target.value)}
                type="email"
                id="email"
                value={code}
              />
            </div>
            <div className="flex items-center">
              <Label className="w-[58px]" htmlFor="active">
                Ativo
              </Label>
              <Checkbox
                className="w-5 h-5"
                checked={active}
                id="active"
                onClick={() => setActive(!active)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="sm:w-full"
              onClick={() => {
                setOpenEdit(false)
                handleEdit()
              }}
              type="submit"
            >
              Atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
