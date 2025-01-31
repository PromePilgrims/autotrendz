import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

interface CreateSubFolderProps {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateSubFolder: React.FC<CreateSubFolderProps> = ({
  open,
  onOpenChange
}) => {
  const [value, setValue] = useState('')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar subpasta</DialogTitle>
        </DialogHeader>
        <Input
          autoFocus
          type="text"
          value={value}
          placeholder="Nome da subpasta"
          onChange={(e) => setValue(e.target.value)}
        />
        <DialogFooter>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
