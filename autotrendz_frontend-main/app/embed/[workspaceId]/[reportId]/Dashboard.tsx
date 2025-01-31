'use client'

import dynamic from 'next/dynamic'

import React, { useCallback, useEffect, useState } from 'react'

const PowerBIEmbed = dynamic(
  () => import('powerbi-client-react').then((m) => m.PowerBIEmbed),
  { ssr: false }
)

type DashboardParams = {
  params: {
    token: string
    workspaceId: string
    reportId: string
    embedUrl: string
  }
}

const registerActivityInterval = 1 // In minutes

export const Dashboard: React.FC<DashboardParams> = ({ params }) => {
  const [reportLoaded, setReportLoaded] = useState<boolean>(false)

  function onReportLoaded() {
    console.log('report just loaded, registering the activity...')
    sendRegisterActivityRequest()
    setReportLoaded(true)
  }

  const sendRegisterActivityRequest = useCallback(() => {
    fetch('https://apps.landersonalmeida.dev/power-bi/register-activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workspaceId: params.workspaceId,
        reportId: params.reportId,
        userId: 'NONE'
      })
    })
      .then(() => {
        console.log('activity registered')
      })
      .catch((error) => {
        console.error('error registering activity', error)
      })
  }, [params])

  useEffect(() => {
    if (!reportLoaded) {
      return
    }

    const activityInterval = setInterval(
      () => {
        sendRegisterActivityRequest()
      },
      1000 * 60 * registerActivityInterval
    )

    return () => {
      clearInterval(activityInterval)
    }
  }, [reportLoaded, params, sendRegisterActivityRequest])

  return (
    <PowerBIEmbed
      cssClassName="w-screen h-screen"
      embedConfig={{
        type: 'report',
        id: params.reportId,
        tokenType: 1,
        accessToken: params.token,
        embedUrl: params.embedUrl,
        permissions: 0,
        viewMode: 0,
        settings: {
          filterPaneEnabled: true,
          navContentPaneEnabled: true
        }
      }}
      eventHandlers={new Map([['loaded', onReportLoaded]])}
    />
  )
}
