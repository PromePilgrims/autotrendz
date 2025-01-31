import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useAdminListQuestionnaireContacts } from '@/services/hooks/ymh-questionnaire/useAdminListQuestionnaireContacts'
import { useAdminShowQuestionnaireForm } from '@/services/hooks/ymh-questionnaire/useAdminShowQuestionnaireForm'
import { useAdminListRegionsSummary } from '@/services/hooks/ymh-questionnaire/useAdminListRegionsSummary'
import { CaretLeftIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import React from 'react'
import { BiCheckCircle } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import ContactFormButton from './src/ContactFormButton'

const AdminQuestionnaire: React.FC = () => {
  const { questionnaireId } = useParams()
  const { data: questionnaireData } = useAdminShowQuestionnaireForm(questionnaireId!)
  const { data: contacts = [] } = useAdminListQuestionnaireContacts(questionnaireId!)
  const { data: regionsSummary } = useAdminListRegionsSummary()

  const localeName = questionnaireData?.title

  if (!questionnaireData || !regionsSummary) return null

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between h-[90px] px-12 border-b-[1px] border-b-zinc-300 md:px-4 sm:flex-col sm:w-full sm:py-4 sm:h-auto sm:gap-2"
      >
        <div className="flex flex-col justify-center">
          <span className="text-4xl font-semibold">Região de {localeName}</span>
        </div>
      </motion.div>
      <div className="container mt-12">
        <div className="flex justify-start mb-2">
          <Button variant={'ghost'} asChild>
            <Link to={'/questionnaires'}>
              <CaretLeftIcon className="w-6 h-6" />
              <span>Voltar</span>
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            {
              title: 'Total',
              description: 'Total de Entrevistas',
              value: regionsSummary[questionnaireData.title].total_interviews
            },
            {
              title: 'Completos',
              description: 'Questionários Realizados',
              value: regionsSummary[questionnaireData.title].completed
            },
            {
              title: 'Pendentes',
              description: 'Questionários Pendentes',
              value: regionsSummary[questionnaireData.title].pending
            },
            {
              title: 'Fez Revisão',
              description: 'Contatos que fizeram a revisão',
              value: regionsSummary[questionnaireData.title].made_revision
            },
            {
              title: 'Não Fez Revisão',
              description: 'Contatos que não fizeram a revisão',
              value: regionsSummary[questionnaireData.title].did_not_make_revision
            }
          ].map((item, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <div className="flex items-center justify-start mt-auto">
                  <span className="text-4xl font-semibold">{item.value}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-col pb-20">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Entrevistados</CardTitle>
              <CardDescription>
                Confira o progresso da sua equipe de entrevistadores em{' '}
                <strong>{localeName}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome Completo</TableHead>
                    <TableHead>Fez Revisão</TableHead>
                    <TableHead>Status da Entrevista</TableHead>
                    <TableHead>Entrevistador</TableHead>
                    <TableHead>Data da Entrevista</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact, c) => (
                    <TableRow key={c}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BiCheckCircle
                            className={cn(
                              'w-6 h-6 rounded-full',
                              contact.made_revision
                                ? 'text-success-foreground bg-success'
                                : 'text-destructive-foreground bg-destructive'
                            )}
                          />
                          <span
                            className={cn(
                              'text-sm',
                              contact.made_revision
                                ? 'text-success'
                                : 'text-destructive'
                            )}
                          >
                            {contact.made_revision ? 'Fez Revisão' : 'Não Fez'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs rounded-md px-2 py-1 bg-muted text-muted-foreground">
                          {!contact.questionnaire && 'Sem Questionário'}
                          {contact.questionnaire?.status === 'FINISHED' &&
                            'Finalizado com Sucesso'}
                          {contact.questionnaire?.status === 'IN_PROGRESS' &&
                            'Em Andamento'}
                          {contact.questionnaire?.status === 'NOT_REACHABLE' &&
                            'Marcado como Ausente'}
                          {contact.questionnaire?.status === 'SAVED' && 'Salvo'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {contact.interviewer ? (
                          <div className="flex flex-col">
                            <span className="text-sm">
                              {contact.interviewer.name ?? 'Sem Nome'}
                            </span>
                            <span className="text-xs">
                              {contact.interviewer.email}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-muted-foreground">
                            {'Sem Entrevistador'}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.questionnaire?.created_at
                          ? new Date(
                              contact.questionnaire?.created_at
                            ).toLocaleString()
                          : 'Sem Data'}
                      </TableCell>
                      <TableCell>
                        <ContactFormButton contact={contact} />
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
  )
}

export default AdminQuestionnaire
