import { Loader } from '@/components/Loader'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useAdminListQuestionnairesForms } from '@/services/hooks/ymh-questionnaire/useAdminListQuestionnairesForms'
import { useAdminListRegionsSummary } from '@/services/hooks/ymh-questionnaire/useAdminListRegionsSummary'
import YmhQuestionnaire from '@/services/YmhQuestionnaire'
import { motion } from 'framer-motion'
import React from 'react'
import { IoMdCloudDownload } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const AdminQuestionnaires: React.FC = () => {
  const { data: questionnairesData = [], isLoading } =
    useAdminListQuestionnairesForms()
  const { data: regionsSummary } = useAdminListRegionsSummary()
  const [isLoadingDownload, setIsLoadingDownload] = React.useState(false)

  if (!regionsSummary || isLoading) {
    return Loader({ message: 'Carregando questionários...' })
  }

  const downloadQuestionnaires = async (made_revision: boolean) => {
    setIsLoadingDownload(true)
    const { url } = await YmhQuestionnaire.exportQuestionnaires({
      made_revision
    })
    setIsLoadingDownload(false)
    window.open(url, '_blank')
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between h-[90px] px-12 border-b-[1px] border-b-zinc-300 md:px-4 sm:flex-col sm:w-full sm:py-4 sm:h-auto sm:gap-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-4xl font-semibold">Questionários</span>
          </div>
          <div
            className={cn(
              'flex items-center justify-between',
              isLoadingDownload && 'opacity-40 pointer-events-none'
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button asChild>
                  <Link to={'#'}>
                    <MdKeyboardArrowDown
                      size={32}
                      className="text-colorPrimary-500"
                    />{' '}
                    Exportar questionários
                  </Link>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => downloadQuestionnaires(true)}>
                  <IoMdCloudDownload
                    size={25}
                    className="text-colorPrimary-500 mr-1"
                  />{' '}
                  Revisão
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => downloadQuestionnaires(false)}>
                  <IoMdCloudDownload
                    size={25}
                    className="text-colorPrimary-500 mr-1"
                  />{' '}
                  Não revisão
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
        <div className="container">
          <div className="flex flex-col pt-12">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de questionários</CardTitle>
                <CardDescription>
                  Veja cotas e entrevistas realizadas abaixo
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <Table className="max-w-full overflow-x-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Localização</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Fez Revisão</TableHead>
                      <TableHead>Não Fez</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questionnairesData.map((questionnaire, index) => (
                      <TableRow key={`q.${index}`}>
                        <TableCell>
                          <Button asChild>
                            <Link to={`/questionnaires/${questionnaire.id}`}>
                              {questionnaire.title}
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell>
                          {regionsSummary[questionnaire.title]?.total_interviews}
                        </TableCell>
                        <TableCell>
                          {regionsSummary[questionnaire.title]?.made_revision}
                        </TableCell>
                        <TableCell>
                          {
                            regionsSummary[questionnaire.title]
                              ?.did_not_make_revision
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminQuestionnaires
