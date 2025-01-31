import React, { useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
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
import { useQuery, useQueryClient } from '@tanstack/react-query'
import LanguageApi from '@/services/LanguageApi'
import TermApi from '@/services/TermApi'

interface TermActionsProps {
  term: App.TermsProps
}

export const TermActions: React.FC<TermActionsProps> = ({ term }) => {
  const queryClient = useQueryClient()

  const [openEdit, setOpenEdit] = useState(false)

  const [languageValues, setLanguageValues] = useState<Record<string, string>>({})

  const { data: languages } = useQuery<App.LanguageProps[]>({
    queryKey: ['list-languages'],
    queryFn: async () => {
      const res = await LanguageApi.list()
      return res.data
    }
  })

  useEffect(() => {
    if (term.translations) {
      const initialLanguageValues = term.translations.reduce(
        (acc, { language, translation }) => {
          acc[language] = translation
          return acc
        },
        {} as Record<string, string>
      )

      setLanguageValues(initialLanguageValues)
    }
  }, [term.translations])

  const handleInputChange = (languageId: string, value: string) => {
    setLanguageValues((prevState) => ({
      ...prevState,
      [languageId]: value
    }))
  }

  const handleSave = async () => {
    const data = Object.entries(languageValues).map(
      ([language_id, translation]) => ({
        language_id,
        translation
      })
    )

    try {
      await TermApi.manage({
        data: data as [{ translation: string; language_id: string }],
        id: term.id
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['list-terms'] })
        setOpenEdit(false)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MdKeyboardArrowDown size={32} className="text-colorPrimary-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Gerenciar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerenciar</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {languages?.map((language) => {
              return (
                <div key={language.id} className="flex items-center">
                  <Label className="w-32" htmlFor={`name-${language.id}`}>
                    {language.name}
                  </Label>
                  <Input
                    type="text"
                    id={`name-${language.id}`}
                    value={languageValues[language.id] || ''}
                    onChange={(e) => handleInputChange(language.id, e.target.value)}
                  />
                </div>
              )
            })}
          </div>
          <DialogFooter>
            <Button className="sm:w-full" onClick={handleSave}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
