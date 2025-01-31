import React from 'react'
import { FaFile } from 'react-icons/fa'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'

interface FilesProps {
  file: {
    id: string
    parent_id: string
    name: string
    src: string
    mimetype: string
    size: number
  }
}

export const Files: React.FC<FilesProps> = ({ file }) => {
  const ext = file.src.split('.').pop()

  return (
    <ContextMenu>
      <a
        href={file.src}
        target="_blank"
        className="flex flex-col items-center gap-3 h-32"
        rel="noreferrer"
      >
        <div className="w-20 relative">
          <span className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex items-center justify-center">
            {ext}
          </span>
          <FaFile className="h-[70px] w-full" />
        </div>
        <Tooltip>
          <TooltipTrigger>
            <ContextMenuTrigger className="hover:brightness-75 transitions-all">
              <span className="w-24 text-center line-clamp-2">{file.name}</span>
            </ContextMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="w-52 select-none">
            <p>{file.name}</p>
          </TooltipContent>
        </Tooltip>
      </a>

      {/* <ContextMenuContent className="w-auto">
        <ContextMenuItem onClick={() => setOpenRename(true)}>
          Renomear
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => setOpenDelete(true)}>
          Excluir
        </ContextMenuItem>
      </ContextMenuContent>
      <Rename
        onOpenChange={setOpenRename}
        folderId={files.id}
        name={files.name}
        open={openRename}
      /> */}
      {/* <CreateSubFolder open={openSubFolder} onOpenChange={setOpenSubFolder} />
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir a pasta {files.name}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </ContextMenu>
  )
}
