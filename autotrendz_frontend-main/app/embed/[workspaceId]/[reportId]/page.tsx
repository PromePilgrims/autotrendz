import React from 'react'

import { Dashboard } from './Dashboard'

type EmbedTokenInput = { workspaceId: string; reportId: string }
type EmbedTokenOutput = { token: string; reportId: string; embedUrl: string }

async function getEmbedToken(input: EmbedTokenInput): Promise<EmbedTokenOutput> {
  const response = await fetch(
    'https://apps.landersonalmeida.dev/power-bi/embed-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input),
      cache: 'no-store'
    }
  )
  const data = await response.json()
  return data
}

interface EmbedPowerBiProps {
  params: {
    workspaceId: string
    reportId: string
  }
}

const Embed: React.FC<EmbedPowerBiProps> = async ({ params }) => {
  const data = await getEmbedToken(params)

  if (!data.token) {
    return (
      <div>
        <p>Erro ao carregar o relatório.</p>
      </div>
    )
  }

  return (
    <Dashboard
      params={{
        embedUrl: data.embedUrl,
        token: data.token,
        reportId: params.reportId,
        workspaceId: params.workspaceId
      }}
    />
  )
}

export default Embed
