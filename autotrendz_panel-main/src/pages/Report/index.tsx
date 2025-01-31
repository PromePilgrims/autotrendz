import React, { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import ReactPaginate from 'react-paginate'

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

import { ReportActions } from '@/components/ReportActions'

import { Button } from '@/components/ui/button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import ClientApi from '@/services/ClientApi'
import ReportApi from '@/services/ReportApi'
import { toast } from '@/components/ui/use-toast'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useAuth } from '@/contexts/AuthContext'

export const Report: React.FC = () => {
  const { isAdmin } = useAuth()
  const queryClient = useQueryClient()

  const [createReportIsOpen, setCreateReportIsOpen] = useState(false)

  const [selectedClients, setSelectedClients] = useState<any>([])

  const [name, setName] = useState('')
  const [workspaceId, setWorkspaceId] = useState('')
  const [reportId, setReportId] = useState('')

  const [search, setSearch] = useState('')

  const animatedComponents = makeAnimated()

  const { data: clients, isLoading } = useQuery<App.ClientsProps[]>({
    queryKey: ['list-clients'],
    queryFn: async () => {
      const res = await ClientApi.list()
      return res.data
    },
    enabled: isAdmin
  })

  const { data: reports } = useQuery<App.ReportProps[]>({
    queryKey: ['list-reports'],
    queryFn: async () => {
      const res = await ReportApi.list()
      return res.data
    }
  })

  const itemsPerPage = 10

  const [itemOffset, setItemOffset] = useState(0)

  const endOffset = itemOffset + itemsPerPage
  const currentItems = reports?.slice(itemOffset, endOffset)
  const pageCount = reports ? Math.ceil(reports.length / itemsPerPage) : 0

  const handlePageClick = (event: any) => {
    if (reports) {
      const newOffset = (event.selected * itemsPerPage) % reports.length
      setItemOffset(newOffset)
    }
  }

  const clientsData = clients?.map((client) => {
    return {
      label: client.name,
      value: client.id
    }
  })

  const clearData = () => {
    setName('')
    setWorkspaceId('')
    setReportId('')
    setSelectedClients([])
  }

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()

    const data = {
      name,
      workspace_id: workspaceId,
      report_id: reportId,
      client_ids: selectedClients.map((client: any) => client.value)
    }
    ReportApi.create(data)
      .then(() => {
        clearData()
        queryClient.invalidateQueries({ queryKey: ['list-reports'] })
        setCreateReportIsOpen(false)
      })
      .catch((e) => {
        toast({
          title: 'Erro',
          description: e.response.data.message[0],
          variant: 'destructive'
        })
      })
  }

  if (isLoading) {
    return <></>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between h-[90px] px-12 border-b-[1px] border-b-zinc-300 md:px-4 sm:h-full sm:py-4 sm:gap-2 sm:flex-col"
      >
        <div className="flex flex-col justify-center">
          <span className="text-4xl font-semibold">Relatórios</span>
        </div>
        <div className="flex items-center gap-4 sm:flex-col sm:gap-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-40"
            type="text"
            placeholder="Pesquisar"
          />
          <Dialog open={createReportIsOpen} onOpenChange={setCreateReportIsOpen}>
            <DialogTrigger asChild>
              {isAdmin && (
                <Button className="bg-colorPrimary-500 hover:bg-colorPrimary-700">
                  Cadastrar relatório
                </Button>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar relatório</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="grid gap-4 py-4 sm:w-full">
                <div className="flex items-center sm:w-full">
                  <Label className="w-28" htmlFor="name">
                    Nome
                  </Label>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    value={name}
                    className="sm:w-full"
                  />
                </div>
                <div className="flex items-center">
                  <Label className="w-28" htmlFor="workspaceId">
                    ID do workspace
                  </Label>
                  <Input
                    onChange={(e) => setWorkspaceId(e.target.value)}
                    type="text"
                    id="workspaceId"
                    value={workspaceId}
                    className="sm:w-full"
                  />
                </div>
                <div className="flex items-center">
                  <Label className="w-28" htmlFor="workspaceId">
                    ID do relatório
                  </Label>
                  <Input
                    onChange={(e) => setReportId(e.target.value)}
                    type="text"
                    id="reportId"
                    value={reportId}
                    className="sm:w-full"
                  />
                </div>
                <div className="flex items-center">
                  <Label className="w-28" htmlFor="workspaceId">
                    Clientes
                  </Label>
                  <div className="w-full">
                    <Select
                      placeholder="Selecione os clientes que terão acesso"
                      isMulti
                      components={animatedComponents}
                      onChange={(selected) => setSelectedClients(selected)}
                      value={selectedClients}
                      closeMenuOnSelect={false}
                      options={clientsData}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="sm:w-full" type="submit">
                    Criar
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
              <TableHead className="font-bold">Workspace</TableHead>
              <TableHead className="font-bold">Relatório</TableHead>
              <TableHead className="font-bold">Data de criação</TableHead>
              <TableHead className="w-32 font-bold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems
              ?.filter((report) => {
                if (search === '') {
                  return true
                } else {
                  const lowerCaseSearch = search.toLowerCase()
                  return (
                    String(report.id).includes(lowerCaseSearch) ||
                    report.name.toLowerCase().includes(lowerCaseSearch) ||
                    report.workspace_id.toLowerCase().includes(lowerCaseSearch) ||
                    report.report_id.toLowerCase().includes(lowerCaseSearch)
                  )
                }
              })
              .map((report) => {
                return (
                  <TableRow key={report.id}>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.workspace_id}</TableCell>
                    <TableCell>{report.report_id}</TableCell>
                    <TableCell>
                      {report.created_at !== null &&
                        new Date(report.created_at).toLocaleDateString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                    </TableCell>
                    <TableCell className="w-32">
                      <ReportActions clientList={clients} report={report} />
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
