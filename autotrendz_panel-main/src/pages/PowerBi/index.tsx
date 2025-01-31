import { Loader } from '@/components/Loader'
import { Dashboard } from './Dashboard'
import PowerBiApi from '@/services/PowerBiApi'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type EmbedTokenOutput = { token: string; reportId: string; embedUrl: string }

const minDelayMs = 5000

export const PowerBi: React.FC = () => {
  const { workspaceId, reportId } = useParams<{
    workspaceId: string
    reportId: string
  }>()
  const [tokenData, setTokenData] = useState<EmbedTokenOutput | null>(null)
  const [isError, setIsError] = useState(false)

  if (!workspaceId || !reportId) {
    return <></>
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = (await PowerBiApi.embedToken({ workspaceId, reportId }))
          .data
        await new Promise((resolve) => setTimeout(resolve, minDelayMs))
        setTokenData(data)
        setIsError(data.statusCode === 400)
      } catch (error) {
        console.error('Erro ao obter o token de incorporação:', error)
      }
    }

    fetchData()
  }, [workspaceId, reportId])

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>Erro ao carregar o relatório</p>
      </div>
    )
  }

  if (!tokenData || !tokenData.token) {
    return Loader({
      message: 'Carregando o relatório, aguarde um momento por favor...'
    })
  }

  return <Dashboard params={{ ...tokenData, workspaceId }} />
}
