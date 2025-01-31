import { Button } from '@/components/ui/button'
import React, { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import ReactPaginate from 'react-paginate'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { IoIosEye, IoIosEyeOff, IoMdClose } from 'react-icons/io'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { ClientActions } from '@/components/ClientActions'
import UserApi from '@/services/UserApi'
import { toast } from '@/components/ui/use-toast'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ClientApi from '@/services/ClientApi'
import { FaCheck } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'
import { GeneratePassword } from 'js-generate-password'

export const Clients: React.FC = () => {
  const { isAdmin, roleName } = useAuth()
  const queryClient = useQueryClient()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState<any>()
  const [imageSrc, setImageSrc] = useState('')

  const [passwordIsHide, setPasswordIsHide] = useState(true)

  const [createUserIsOpen, setCreateUserIsOpen] = useState(false)

  const [createUserIsLoading, setCreateUserIsLoading] = useState(false)

  const validEmail = /\S+@\S+\.\S+/
  const validName = /[A-z][ ][A-z]/

  const { data: clients } = useQuery<App.ClientsProps[]>({
    queryKey: ['list-clients'],
    queryFn: async () => {
      const res = await ClientApi.list()
      return res.data
    }
  })

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0]

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage)
      setImageSrc(imageUrl)
      setImage(selectedImage)
    }
  }

  const itemsPerPage = 10

  const [search, setSearch] = useState('')

  const [itemOffset, setItemOffset] = useState(0)

  const endOffset = itemOffset + itemsPerPage
  const currentItems = clients?.slice(itemOffset, endOffset)
  const pageCount = clients ? Math.ceil(clients.length / itemsPerPage) : 0

  const handlePageClick = (event: any) => {
    if (clients) {
      const newOffset = (event.selected * itemsPerPage) % clients?.length
      setItemOffset(newOffset)
    }
  }

  const handleCreateValidations = () => {
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

    if (password.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Erro no campo Senha',
        description: 'A senha deve conter pelo menos 6 dígitos'
      })

      return false
    }

    return true
  }

  const clearData = () => {
    setName('')
    setEmail('')
    setPassword('')
    setImageSrc('')
    setImage(undefined)
  }

  const generatePassword = () => {
    const password = GeneratePassword({
      length: 10,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      minLengthLowercase: 1,
      minLengthUppercase: 1,
      minLengthNumbers: 1,
      minLengthSymbols: 1
    })

    setPassword(password)
  }

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()

    const isValid = handleCreateValidations()
    if (isValid) {
      setCreateUserIsLoading(true)
      if (image) {
        UserApi.create({ name, email, password, image })
          .then(() => {
            queryClient.invalidateQueries({ queryKey: ['list-clients'] })
            clearData()
            setCreateUserIsOpen(false)
          })
          .finally(() => setCreateUserIsLoading(false))
      } else {
        UserApi.create({ name, email, password })
          .then(() => {
            queryClient.invalidateQueries({ queryKey: ['list-clients'] })
            clearData()
            setCreateUserIsOpen(false)
          })
          .finally(() => setCreateUserIsLoading(false))
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between h-[90px] px-12 border-b-[1px] border-b-zinc-300 md:px-4 sm:flex-col sm:w-full sm:py-4 sm:h-auto sm:gap-2"
      >
        <div className="flex flex-col justify-center">
          <span className="text-4xl font-semibold">Clientes</span>
        </div>
        <div className="flex items-center gap-4 sm:flex-col sm:gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-40"
            type="text"
            placeholder="Pesquisar"
          />

          {isAdmin && (
            <Dialog open={createUserIsOpen} onOpenChange={setCreateUserIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-colorPrimary-500 hover:bg-colorPrimary-700">
                  Cadastrar cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Criar usuário</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="grid gap-4 py-4">
                  <div className="flex items-center">
                    <Label className="w-28" htmlFor="name">
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
                    <Label className="w-28" htmlFor="email">
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
                    <Label className="w-28" htmlFor="password">
                      Senha
                    </Label>
                    <div className="flex w-full items-center justify-between gap-4">
                      <div className="flex items-center border rounded w-full border-input">
                        <Input
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-[90%] border-none focus-visible:ring-0"
                          type={passwordIsHide ? 'password' : 'text'}
                          id="password"
                          value={password}
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordIsHide(!passwordIsHide)}
                          className="w-[10%] flex items-center justify-center"
                        >
                          {passwordIsHide ? (
                            <IoIosEye size={20} />
                          ) : (
                            <IoIosEyeOff size={20} />
                          )}
                        </button>
                      </div>
                      <button
                        className="hover:underline"
                        type="button"
                        onClick={() => generatePassword()}
                      >
                        Gerar
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Label className="w-28" htmlFor="image">
                      Imagem
                    </Label>
                    <Input onChange={handleImageChange} type="file" id="image" />
                  </div>
                  {imageSrc && (
                    <Avatar className="w-20 h-20 mx-auto">
                      <AvatarImage src={imageSrc} alt="avatar" />
                    </Avatar>
                  )}
                  <DialogFooter>
                    <Button isLoading={createUserIsLoading} type="submit">
                      Criar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: '300px' }}
        animate={{ opacity: 1, x: '0' }}
        className="px-12 mt-6 md:px-4 md:w-full md:overflow-x-auto"
      >
        <Table className="md:w-[760px] md:overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Nome</TableHead>
              <TableHead className="font-bold">E-mail</TableHead>
              <TableHead className="font-bold">Último Acesso</TableHead>
              <TableHead className="w-32 font-bold">Função</TableHead>
              <TableHead className="w-32 font-bold">Ativo</TableHead>
              <TableHead className="w-32 font-bold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems
              ?.filter((client) => {
                if (search === '') {
                  return true
                } else {
                  const lowerCaseSearch = search.toLowerCase()
                  return (
                    String(client.id).includes(lowerCaseSearch) ||
                    client.name.toLowerCase().includes(lowerCaseSearch) ||
                    client.email.toLowerCase().includes(lowerCaseSearch)
                  )
                }
              })
              .map((client) => {
                return (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>
                      {client.last_login_at !== null &&
                        new Date(client.last_login_at).toLocaleDateString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                    </TableCell>
                    <TableCell>{roleName(client.role)}</TableCell>
                    <TableCell className="w-32 pl-4">
                      {client.active ? (
                        <div className="bg-emerald-500 w-5 h-5 rounded-sm flex justify-center items-center">
                          <FaCheck className="text-white" />
                        </div>
                      ) : (
                        <div className="bg-destructive w-5 h-5 rounded-sm flex justify-center items-center">
                          <IoMdClose className="text-destructive-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="w-32">
                      <ClientActions client={client} />
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        <ReactPaginate
          className="flex justify-center items-center gap-4 w-full mt-12"
          activeLinkClassName="font-extrabold text-colorPrimary-500"
          pageLinkClassName=""
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          nextLinkClassName="text-white font-bold bg-colorPrimary-500 rounded-full w-8 h-8 text-xl select-none pb-1 flex items-center justify-center hover:bg-colorPrimary-700 transition-all"
          previousLinkClassName="text-white font-bold bg-colorPrimary-500 rounded-full w-8 h-8 text-xl select-none pb-1 flex items-center justify-center hover:bg-colorPrimary-700 transition-all"
        />
      </motion.div>
    </div>
  )
}
