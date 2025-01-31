import React, { useState } from 'react'
import { IoFolder } from 'react-icons/io5'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  // ContextMenuSeparator,
  ContextMenuTrigger
} from '@/components/ui/context-menu'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

import { Rename } from '../Rename'
import { CreateSubFolder } from '../CreateSubFolder'
import { LinkClient } from '../LinkClient'
import { useAuth } from '@/contexts/AuthContext'

interface FolderProps {
  folder: App.FoldersProps
  onClick: () => void
}

export const Folder: React.FC<FolderProps> = ({ folder, onClick }) => {
  const { isAdmin } = useAuth()
  const [openRename, setOpenRename] = useState(false)
  const [openSubFolder, setOpenSubFolder] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openLink, setOpenLink] = useState(false)

  return (
    <ContextMenu>
      <button onClick={onClick} className="flex flex-col items-center gap-3 h-32">
        <ContextMenuTrigger className="hover:brightness-75 transitions-all">
          <Tooltip>
            <div>
              <IoFolder className="h-[70px] w-full" />
            </div>
            <TooltipTrigger>
              <span className="w-24 line-clamp-2">{folder.name}</span>
            </TooltipTrigger>
            <TooltipContent className="w-52 select-none">
              <p>{folder.name}</p>
            </TooltipContent>
          </Tooltip>
        </ContextMenuTrigger>
      </button>
      {isAdmin && (
        <ContextMenuContent className="w-auto">
          <ContextMenuItem onClick={() => setOpenRename(true)}>
            Renomear
          </ContextMenuItem>
          {folder.parent_id === null && (
            <>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => setOpenLink(true)}>
                Vincular clientes
              </ContextMenuItem>
              <ContextMenuSeparator />
            </>
          )}
          {/* <ContextMenuItem onClick={() => setOpenLink(true)}>Vincular clientes</ContextMenuItem> */}
          {/* <ContextMenuSeparator />
        <ContextMenuItem onClick={() => setOpenDelete(true)}>Excluir</ContextMenuItem> */}
        </ContextMenuContent>
      )}
      <LinkClient folder={folder} open={openLink} onOpenChange={setOpenLink} />
      <Rename
        open={openRename}
        folderId={folder.id}
        name={folder.name}
        onOpenChange={setOpenRename}
      />
      <CreateSubFolder open={openSubFolder} onOpenChange={setOpenSubFolder} />
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir a pasta {folder.name}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ContextMenu>
  )
}
