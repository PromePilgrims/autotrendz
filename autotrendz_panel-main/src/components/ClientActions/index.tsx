import React, { FormEvent, useEffect, useRef, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'

import { Checkbox } from '@/components/ui/checkbox'
import { FaRegImage } from 'react-icons/fa6'

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
import { Avatar, AvatarImage } from '../ui/avatar'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import ClientApi from '@/services/ClientApi'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useAuth } from '@/contexts/AuthContext'

interface ClientActionsProps {
  client: App.ClientsProps
}

export const ClientActions: React.FC<ClientActionsProps> = ({ client }) => {
  const { roleName } = useAuth()
  const [openDialog, setOpenDialog] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const queryClient = useQueryClient()

  const [name, setName] = useState(client.name)
  const [email, setEmail] = useState(client.email)
  const [role, setRole] = useState(client.role)
  const [active, setIsActive] = useState(client.active)

  const [newImage, setNewImage] = useState<any>(null)

  const validEmail = /\S+@\S+\.\S+/
  const validName = /[A-z][ ][A-z]/

  const inputImageRef = useRef<any>(null)

  const animatedComponents = makeAnimated()

  const handleImageChange = (e: any) => {
    const selectedNewImage = e.target.files[0]
    setNewImage(selectedNewImage)
  }

  const handleAvatarClick = () => {
    if (inputImageRef.current) {
      inputImageRef.current.click()
    }
  }

  const handleEditValidations = () => {
    if (name === '') {
      toast({
        title: 'Erro no formulário',
        description: 'O campo Nome não pode ser vazio',
        variant: 'destructive'
      })

      return false
    }

    if (!validName.test(name)) {
      toast({
        variant: 'destructive',
        title: 'Erro no campo Nome completo',
        description: 'Nome inválido'
      })

      return false
    }

    if (!validEmail.test(email)) {
      toast({
        variant: 'destructive',
        title: 'Erro no campo E-mail',
        description: 'E-mail inválido'
      })

      return false
    }

    return true
  }

  const handleEdit = (e: FormEvent) => {
    e.preventDefault()

    const isValid = handleEditValidations()

    if (isValid) {
      if (newImage) {
        ClientApi.edit({
          name,
          email,
          active,
          role,
          id: client.id,
          image: newImage
        }).then(() => {
          queryClient.invalidateQueries({ queryKey: ['list-clients'] })
        })
      } else {
        ClientApi.edit({ name, email, active, role, id: client.id }).then(() => {
          queryClient.invalidateQueries({ queryKey: ['list-clients'] })
        })
      }
    }
  }

  const handleDelete = () => {
    ClientApi.delete({ id: client.id }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['list-clients'] })
    })
  }

  useEffect(() => {
    if (!openEdit) {
      setNewImage(null)
    }
  }, [openEdit])

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
          <DropdownMenuSeparator />
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
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="grid gap-4 pt-4">
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
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                value={email}
              />
            </div>
            <div className="flex items-center">
              <Label className="w-16" htmlFor="role">
                Função
              </Label>
              <Select
                placeholder="Selecione a função do usuário"
                components={animatedComponents}
                value={{ label: roleName(role), value: role } as any}
                onChange={(selected: any) => setRole(selected.value)}
                options={[
                  { label: 'Admin', value: 0 },
                  { label: 'Cliente', value: 1 },
                  { label: 'Supervisor de Questionários', value: 2 },
                  { label: 'Entrevistador', value: 3 }
                ]}
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
                onClick={() => setIsActive(!active)}
              />
            </div>
            <div>
              <Label
                className="flex text-center items-center justify-center mx-auto mb-2"
                htmlFor="image"
              >
                Imagem de perfil
              </Label>
              {newImage !== null ? (
                <Avatar
                  className="w-20 h-20 mx-auto cursor-pointer"
                  id="image"
                  onClick={handleAvatarClick}
                >
                  <AvatarImage src={URL.createObjectURL(newImage)} alt="avatar" />
                </Avatar>
              ) : client.image !== null ? (
                <Avatar
                  className="w-20 h-20 mx-auto cursor-pointer"
                  id="image"
                  onClick={handleAvatarClick}
                >
                  <AvatarImage src={client.image} alt="avatar" />
                </Avatar>
              ) : (
                <Avatar
                  className="w-20 h-20 mx-auto flex justify-center items-center cursor-pointer border border-dashed border-primary"
                  id="image"
                  onClick={handleAvatarClick}
                >
                  <FaRegImage className="fill-primary" size={28} />
                </Avatar>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                ref={inputImageRef}
              />
            </div>
            <DialogFooter>
              <Button
                className="sm:w-full"
                onClick={(e) => {
                  handleEdit(e)
                  setOpenEdit(false)
                }}
                type="submit"
              >
                Atualizar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
