/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion'
import { RiUploadCloud2Line } from 'react-icons/ri'
import ReactLoading from 'react-loading'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import PriceApi from '@/services/PriceApi'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'

export const Prices: React.FC = () => {
  const [_, setFile] = useState<File | null>(null)
  const [sendFileIsLoading, setSendFileIsLoading] = useState(false)

  const { data, refetch } = useQuery<App.PriceProps[]>({
    queryKey: ['audatex-prices'],
    queryFn: async () => {
      const res = await PriceApi.list()
      return res.data
    }
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch()
    }, 20000)

    return () => clearInterval(intervalId)
  }, [refetch, data])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setSendFileIsLoading(true)
      await PriceApi.file(selectedFile)
        .then(() => {
          refetch()
        })
        .catch(() => {
          toast({
            title: 'Erro',
            description: 'Ocorreu um erro no envio do arquivo, tente novamente.',
            variant: 'destructive'
          })
        })
        .finally(() => setSendFileIsLoading(false))
    }
  }

  if (!data) return <></>

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between h-[90px] px-12 border-b-[1px] border-b-zinc-300 md:px-4 sm:h-full sm:py-4 sm:gap-2 sm:flex-col"
      >
        <div className="flex flex-col justify-center">
          <span className="text-4xl font-semibold">
            Audatex - Extração de Preços
          </span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: '300px' }}
        animate={{ opacity: 1, x: '0' }}
        className="px-12 mt-6 md:px-4 md:w-full md:overflow-x-auto"
      >
        <input
          hidden
          onChange={handleFileChange}
          accept=".xlsx"
          type="file"
          id="file"
        />
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              {!sendFileIsLoading ? (
                <label
                  className="bg-colorPrimary-500 flex items-center mb-6 w-52 gap-4 transition-all justify-between py-2 px-3 rounded text-white hover:cursor-pointer hover:brightness-90 group"
                  htmlFor="file"
                >
                  <span>Selecionar arquivo</span>
                  <RiUploadCloud2Line
                    size={26}
                    className="transition-transform duration-200 ease-in-out group-hover:scale-110"
                  />
                </label>
              ) : (
                <button
                  className="bg-colorPrimary-500 opacity-70 flex justify-center items-center mb-6 gap-4 w-52 transition-all py-2 px-3 rounded text-white disabled:cursor-not-allowed hover:cursor-pointer hover:brightness-90 group"
                  disabled
                >
                  <ReactLoading type="spin" width={24} height={24} color="white" />
                </button>
              )}
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-colorPrimary-400">
              <p>
                Selecione o arquivo XLSX com os campos "PN" e "Marca" preenchidos.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Table className="md:w-[760px] md:overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Arquivo</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Data de envio</TableHead>
              <TableHead className="font-bold">Data de finalização</TableHead>
              <TableHead className="font-bold">Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow className="h-14" key={item.id}>
                  <TableCell>{item.source_file_name}</TableCell>
                  <TableCell>
                    {item.status === 'completed' ? (
                      <span className="p-1 bg-success rounded-sm text-white">
                        Finalizado
                      </span>
                    ) : (
                      <span className="p-1 bg-cyan-600 rounded-sm text-white">
                        Em andamento
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.triggered_at !== null &&
                      new Date(item.triggered_at).toLocaleDateString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                  </TableCell>
                  <TableCell>
                    {item.completed_at !== null &&
                      new Date(item.completed_at).toLocaleDateString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                  </TableCell>
                  <TableCell>
                    {item.output_file_url && (
                      <a
                        target="_blank"
                        href={item.output_file_url}
                        className="bg-colorPrimary-500 my-1 py-2 px-4 rounded text-white transition-all hover:brightness-90"
                        rel="noreferrer"
                      >
                        Baixar
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}
