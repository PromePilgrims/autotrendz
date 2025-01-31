import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { LanguageActions } from '@/components/LanguageActions'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import LanguageApi from '@/services/LanguageApi'
import { toast } from '@/components/ui/use-toast'
import { FaCheck } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { useAuth } from '@/contexts/AuthContext'

export const Languages: React.FC = () => {
  const { isAdmin } = useAuth()
  const queryClient = useQueryClient()

  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  const [createIsOpen, setCreateIsOpen] = useState(false)
  const [createIsLoading, setCreateIsLoading] = useState(false)

  const { data: languages } = useQuery<App.LanguageProps[]>({
    queryKey: ['list-languages'],
    queryFn: async () => {
      const res = await LanguageApi.list()
      return res.data
    }
  })

  const handleCreate = () => {
    if (name !== '' && code !== '') {
      setCreateIsLoading(true)

      LanguageApi.create({ name, code })
        .then(() => {
          setName('')
          setCode('')
          queryClient.invalidateQueries({ queryKey: ['list-languages'] })
          toast({
            title: 'Sucesso',
            description: 'Linguagem criada com sucesso',
            variant: 'success'
          })
          setCreateIsOpen(false)
        })
        .finally(() => setCreateIsLoading(false))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between h-[90px] px-12 border-b-[1px] border-b-zinc-300 sm:flex-col sm:w-full sm:py-4 sm:h-auto sm:gap-2"
      >
        <div className="flex flex-col justify-center">
          <span className="text-4xl font-semibold">Idiomas</span>
        </div>
        <div className="flex items-center gap-4">
          <Dialog open={createIsOpen} onOpenChange={setCreateIsOpen}>
            <DialogTrigger asChild>
              {isAdmin && (
                <Button className="bg-colorPrimary-500 hover:bg-colorPrimary-700">
                  Adicionar idioma
                </Button>
              )}
            </DialogTrigger>
            <DialogContent onSubmit={handleCreate} className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar idioma</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
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
                  <Label className="w-28" htmlFor="acronym">
                    Sigla do país
                  </Label>
                  <Input
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    id="acronym"
                    placeholder="Sigla (ex: br, us, etc)"
                    value={code}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  isLoading={createIsLoading}
                  className="sm:w-full"
                  type="submit"
                  onClick={handleCreate}
                >
                  Criar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: '300px' }}
        animate={{ opacity: 1, x: '0' }}
        className="px-12 mt-6 h-96 md:px-4 md:w-full md:overflow-x-auto"
      >
        <Table className="md:w-[760px] md:overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Nome</TableHead>
              <TableHead className="font-bold">Sigla</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="w-32 font-bold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {languages?.map((language) => {
              return (
                <TableRow key={language.id}>
                  <TableCell>{language.name}</TableCell>
                  <TableCell>{language.code}</TableCell>
                  <TableCell className="w-32">
                    {language.active ? (
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
                    <LanguageActions language={language} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}
