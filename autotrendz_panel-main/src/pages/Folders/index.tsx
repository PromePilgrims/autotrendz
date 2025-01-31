/* eslint-disable prettier/prettier */
import { Folder } from '@/components/Folders/Folder'
import { Button } from '@/components/ui/button'
import { FaArrowLeftLong } from 'react-icons/fa6'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import FolderApi from '@/services/FolderApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import React, { FormEvent, useEffect, useState } from 'react'
import { Files } from '@/components/Folders/Files'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAuth } from '@/contexts/AuthContext'

interface FolderHistory {
  id: string
  name: string
}

export const Folders: React.FC = () => {
  const { isAdmin } = useAuth()
  const queryClient = useQueryClient()

  const [name, setName] = useState('')
  const [createFolderIsOpen, setCreateFolderIsOpen] = useState(false)
  const [createFileIsOpen, setCreateFileIsOpen] = useState(false)

  // const [subFolders, setSubFolders] = useState<App.SubFoldersProps>()
  const [selectedFolderId, setSelectedFolderId] = useState('')
  const [file, setFile] = useState<any>()

  const [isSubFolder, setIsSubFolder] = useState(false)

  const [foldersHistory, setFoldersHistory] = useState<FolderHistory[]>([])

  const [createFileIsLoading, setCreateFileIsLoading] = useState(false)
  const [createFolderIsLoading, setCreateFolderIsLoading] = useState(false)

  const { data: folders } = useQuery<App.FoldersProps[]>({
    queryKey: ['folders-list'],
    queryFn: async () => {
      const res = await FolderApi.list()
      return res.data
    },
    enabled: foldersHistory.length < 1
  })

  const { data: subFolders } = useQuery<App.FoldersProps>({
    queryKey: ['sub-folders-list', selectedFolderId],
    queryFn: async () => {
      const res = await FolderApi.subFolderList({ folderId: selectedFolderId })
      return res.data
    },
    enabled: selectedFolderId !== ''
  })

  const selectFolder = (
    folderId: string,
    folderName: string,
    isBack?: boolean
  ) => {
    setSelectedFolderId(folderId)
    setIsSubFolder(true)
    if (!isBack) {
      setFoldersHistory((prevState) => [
        ...prevState,
        { id: folderId, name: folderName }
      ])
    }
  }

  const back = () => {
    if (foldersHistory.length === 0) return
    if (foldersHistory.length === 1) {
      setIsSubFolder(false)
      setFoldersHistory([])
    }
    if (foldersHistory.length > 1) {
      const item = foldersHistory[foldersHistory.length - 2]
      const newArray = foldersHistory.slice(0, -1)
      setFoldersHistory(newArray)
      selectFolder(item.id, item.name, true)
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setName(e.target.files[0].name)
    }
  }

  const handleCreateFile = (e: FormEvent) => {
    e.preventDefault()

    if (name === '') {
      return toast({
        title: 'Erro',
        variant: 'destructive',
        description: 'O campo nome não pode ser vazio',
        className: cn('bottom-4 right-4 flex fixed w-[420px]')
      })
    }

    setCreateFileIsLoading(true)

    FolderApi.generatePresignedUrl({ key: `folders/${selectedFolderId}/${name}`, file })
      .then((res) => {
        FolderApi.putPresignedUrl({ file, presigned_url: res.data.presigned_url })
          .then(() => {
            FolderApi.createFile({
              name,
              parent_id: selectedFolderId,
              file
            })
              .then(() => {
                queryClient.invalidateQueries({ queryKey: ['sub-folders-list'] })
                setCreateFileIsOpen(false)
              })
              .catch(() => {
                toast({
                  title: 'Erro',
                  variant: 'destructive',
                  description: 'Erro ao criar arquivo',
                  className: cn('bottom-4 right-4 flex fixed w-[420px]')
                })
              })
              .finally(() => setCreateFileIsLoading(false))
          }).catch(() => setCreateFileIsLoading(false))
      }).catch(() => setCreateFileIsLoading(false))
  }

  const handleCreateFolder = (e: FormEvent) => {
    e.preventDefault()

    if (name === '') {
      return toast({
        title: 'Erro',
        variant: 'destructive',
        description: 'O campo nome não pode ser vazio',
        className: cn('bottom-4 right-4 flex fixed w-[420px]')
      })
    }

    setCreateFolderIsLoading(true)
    if (!isSubFolder) {
      FolderApi.create({ name })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['folders-list'] })
          setCreateFolderIsOpen(false)
        })
        .catch(() => {
          toast({
            title: 'Erro',
            variant: 'destructive',
            description: 'Erro ao criar pasta',
            className: cn('bottom-4 right-4 flex fixed w-[420px]')
          })
        })
        .finally(() => setCreateFolderIsLoading(false))
    } else {
      FolderApi.createSubFolder({
        name,
        parentId: selectedFolderId
      })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['sub-folders-list'] })
          queryClient.invalidateQueries({ queryKey: ['folders-list'] })
          setCreateFolderIsOpen(false)
        })
        .catch(() => {
          toast({
            title: 'Erro',
            variant: 'destructive',
            description: 'Erro ao criar pasta',
            className: cn('bottom-4 right-4 flex fixed w-[420px]')
          })
        })
        .finally(() => setCreateFolderIsLoading(false))
    }
  }

  useEffect(() => {
    setName('')
    setFile(undefined)
  }, [createFileIsOpen])

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-items justify-between h-[90px] md:px-4 px-12 border-b-[1px] border-b-zinc-300 sm:h-auto sm:py-4"
      >
        <div className="flex items-center justify-between w-full sm:flex-col sm:py-2">
          <span className="text-4xl font-semibold">Pastas</span>
          <div className="flex items-center gap-4">
            <Dialog open={createFolderIsOpen} onOpenChange={setCreateFolderIsOpen}>
              <DialogTrigger asChild>
                {isAdmin && (
                  <Button className="bg-colorPrimary-500 hover:bg-colorPrimary-700">
                    Criar pasta
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Criar pasta</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateFolder} className="grid gap-4 py-4">
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
                  <DialogFooter>
                    <Button isLoading={createFolderIsLoading} type="submit">Criar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog open={createFileIsOpen} onOpenChange={setCreateFileIsOpen}>
              <DialogTrigger asChild>
                {isAdmin && isSubFolder && (
                  <Button className="bg-colorPrimary-500 hover:bg-colorPrimary-700">
                    Criar arquivo
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Criar arquivo</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateFile} className="grid gap-4 py-4">
                  <div className="flex items-center">
                    <Label className="w-28" htmlFor="file">
                      Arquivo
                    </Label>
                    <Input onChange={handleFile} type="file" id="file" />
                  </div>
                  {file && (
                    <div className="flex items-center">
                      <Label className="w-28" htmlFor="name">
                        Nome
                      </Label>
                      <Input
                        disabled={true}
                        // onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="name"
                        value={name}
                      />
                    </div>
                  )}
                  <DialogFooter>
                    <Button isLoading={createFileIsLoading} type="submit">Criar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>
      <div className="mx-12 mt-6 flex items-center gap-2 md:mx-4">
        <button onClick={back}>
          <FaArrowLeftLong size={20} />
        </button>
        <div className="border px-2 h-8 rounded-sm w-full font-semibold">
          {foldersHistory.map((folder) => `${folder.name}/`)}
        </div>
      </div>
      <TooltipProvider delayDuration={100}>
        <motion.div
          initial={{ opacity: 0, x: '300px' }}
          animate={{ opacity: 1, x: '0' }}
          className="px-12 mt-6 h-96 flex flex-wrap gap-8 md:px-4"
        >
          {!isSubFolder
            ? folders?.map((folder, index) => {
              return (
                <Folder
                  onClick={() => selectFolder(folder.id, folder.name)}
                  key={index}
                  folder={folder}
                />
              )
            })
            : <>
              {subFolders?.sub_folders.map((folder, index) => {
                return (
                  <Folder
                    onClick={() => selectFolder(folder.id, folder.name)}
                    key={index}
                    folder={folder}
                  />
                )
              })}
              {subFolders?.files.map((file, index) => {
                return (
                  <Files
                    key={index}
                    file={file}
                  />
                )
              })}
            </>}
        </motion.div>
      </TooltipProvider>
    </div>
  )
}
