import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import FolderApi from '@/services/FolderApi'
import { useQueryClient } from '@tanstack/react-query'

interface RenameProps {
  name: string
  folderId: string
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
}

export const Rename: React.FC<RenameProps> = ({
  name,
  folderId,
  onOpenChange,
  open
}) => {
  const queryClient = useQueryClient()
  const [value, setValue] = useState(name)

  const handleSubmit = () => {
    FolderApi.renameFolder({ folderId, name: value }).then(() => {
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: ['folders-list'] })
      queryClient.invalidateQueries({ queryKey: ['sub-folders-list'] })
    })
  }

  useEffect(() => {
    setValue(name)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Renomear pasta</DialogTitle>
        </DialogHeader>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Renomear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
