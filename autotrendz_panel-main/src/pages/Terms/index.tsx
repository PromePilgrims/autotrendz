import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

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
import { TermActions } from '@/components/TermActions'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import TermApi from '@/services/TermApi'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@/contexts/AuthContext'

export const Terms: React.FC = () => {
  const { isAdmin } = useAuth()
  const queryClient = useQueryClient()

  const [name, setName] = useState('')
  const [section, setSection] = useState('')
  const [code, setCode] = useState('')

  const [createIsOpen, setCreateIsOpen] = useState(false)
  const [createIsLoading, setCreateIsLoading] = useState(false)

  const { data: terms } = useQuery<App.TermsProps[]>({
    queryKey: ['list-terms'],
    queryFn: async () => {
      const res = await TermApi.list()
      return res.data
    }
  })

  const handleCreate = () => {
    if (name === '' || section === '' || code === '') {
      return toast({
        title: 'Erro',
        description: 'Preencha todos os campos',
        variant: 'destructive'
      })
    }

    setCreateIsLoading(true)

    TermApi.create({ name, section, code })
      .then(() => {
        setCreateIsOpen(false)
        queryClient.invalidateQueries({ queryKey: ['list-terms'] })
      })
      .finally(() => setCreateIsLoading(false))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between h-[90px] px-12 border-b-[1px] border-b-zinc-300 sm:flex-col sm:w-full sm:py-4 sm:h-auto sm:gap-2"
      >
        <div className="flex flex-col justify-center">
          <span className="text-4xl font-semibold">Termos</span>
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
                  <Label className="w-28" htmlFor="code">
                    Sigla do país
                  </Label>
                  <Input
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    id="code"
                    placeholder="Sigla (ex: br, us, etc)"
                    value={code}
                  />
                </div>
                <div className="flex items-center">
                  <Label className="w-28" htmlFor="section">
                    Seção
                  </Label>
                  <Input
                    onChange={(e) => setSection(e.target.value)}
                    type="text"
                    id="section"
                    value={section}
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
              <TableHead className="font-bold">Seção</TableHead>
              <TableHead className="font-bold">Nome</TableHead>
              <TableHead className="font-bold">Completo?</TableHead>
              <TableHead className="w-32 font-bold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {terms?.map((term) => {
              return (
                <TableRow key={term.id}>
                  <TableCell>{term.section}</TableCell>
                  <TableCell>{term.name}</TableCell>
                  <TableCell className="w-32 pl-8">
                    {term.completed ? (
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
                    <TermActions term={term} />
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
