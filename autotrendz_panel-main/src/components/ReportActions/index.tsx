import React, { FormEvent, useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import Select from 'react-select'

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
import { ClientList } from '../Modals/ClientList'
import ReportApi from '@/services/ReportApi'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import makeAnimated from 'react-select/animated'
import { useAuth } from '@/contexts/AuthContext'

interface ReportActionsProps {
  report: App.ReportProps
  clientList: App.ClientsProps[] | undefined
}

export const ReportActions: React.FC<ReportActionsProps> = ({
  report,
  clientList
}) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()

  const [openDialog, setOpenDialog] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openList, setOpenList] = useState(false)

  const [workspace, setWorkspace] = useState(report.workspace_id)
  const [localReport, setLocalReport] = useState(report.report_id)
  const [name, setName] = useState(report.name)
  const [selectedClients, setSelectedClients] = useState<any>()

  const animatedComponents = makeAnimated()

  const handleEditValidations = () => {
    if (name === '') {
      toast({
        title: 'Erro no formulário',
        description: 'O campo Nome não pode ser vazio',
        variant: 'destructive'
      })

      return false
    }

    if (workspace === '') {
      toast({
        title: 'Erro no formulário',
        description: 'O campo Nome não pode ser vazio',
        variant: 'destructive'
      })

      return false
    }

    if (localReport === '') {
      toast({
        title: 'Erro no formulário',
        description: 'O campo Nome não pode ser vazio',
        variant: 'destructive'
      })

      return false
    }

    return true
  }

  const navigateToReport = (workspaceId: string, reportId: string) => {
    navigate(`${workspaceId}/${reportId}`)
  }

  const handleEdit = (e: FormEvent) => {
    e.preventDefault()

    const isValid = handleEditValidations()

    if (isValid) {
      const localClients = selectedClients?.map((client: any) => client.value)
      ReportApi.edit({
        id: report.id,
        name,
        report_id: localReport,
        workspace_id: workspace,
        client_ids: localClients
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['list-reports'] })
        toast({
          title: 'Sucesso',
          description: 'Relatório atualizado com sucesso',
          className: cn('bottom-4 right-4 flex fixed w-[420px]')
        })
        setOpenEdit(false)
      })
    }
  }

  const handleDelete = () => {
    ReportApi.delete({ id: report.id }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['list-reports'] })
    })
  }

  const clientsData = clientList?.map((client) => {
    return { label: client.name, value: client.id }
  })

  useEffect(() => {
    const selected = report.clients.map((client) => {
      return { label: client.name, value: client.id }
    })

    setSelectedClients(selected)
  }, [])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MdKeyboardArrowDown size={32} className="text-colorPrimary-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isAdmin && (
            <DropdownMenuItem onClick={() => setOpenList(true)}>
              Ver clientes
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigateToReport(report.workspace_id, report.report_id)}
          >
            Ver relatório
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isAdmin && (
            <DropdownMenuItem onClick={() => setOpenEdit(true)}>
              Editar
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {isAdmin && (
            <DropdownMenuItem onClick={() => setOpenDialog(true)}>
              Excluir
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog modal open={openList} onOpenChange={setOpenList}>
        <DialogContent className="max-w-[500px] h-[500px]">
          <ClientList clients={report.clients} />
        </DialogContent>
      </Dialog>
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir o relatório {report.name}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center">
              <Label className="w-24" htmlFor="name">
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
              <Label className="w-24" htmlFor="workspace">
                Workspace
              </Label>
              <Input
                onChange={(e) => setWorkspace(e.target.value)}
                type="text"
                id="workspace"
                value={workspace}
              />
            </div>
            <div className="flex items-center">
              <Label className="w-24" htmlFor="report">
                Relatório
              </Label>
              <Input
                onChange={(e) => setLocalReport(e.target.value)}
                type="text"
                id="report"
                value={localReport}
              />
            </div>
            <div className="flex items-center">
              <Label className="w-24 mr-[6px]" htmlFor="clients">
                Clientes
              </Label>
              <div className="w-full">
                <Select
                  placeholder="Selecione os clientes que terão acesso"
                  isMulti
                  components={animatedComponents}
                  value={selectedClients as any}
                  onChange={(selected) => setSelectedClients(selected)}
                  closeMenuOnSelect={false}
                  options={clientsData}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="sm:w-full" onClick={handleEdit} type="submit">
              Atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
