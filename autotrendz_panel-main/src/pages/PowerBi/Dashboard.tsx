import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useAuth } from '@/contexts/AuthContext'
import { useUser } from '@/contexts/UserContext'
import PowerBiApi from '@/services/PowerBiApi'

import { EnterFullScreenIcon } from '@radix-ui/react-icons'
import { PowerBIEmbed } from 'powerbi-client-react'
import React, { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'

type DashboardParams = {
  params: {
    token: string
    reportId: string
    workspaceId: string
    embedUrl: string
  }
}

const timeout = 1000 * 60 * 20
const promptBeforeIdle = 1000 * 30

export const Dashboard: React.FC<DashboardParams> = ({ params }) => {
  const { user } = useUser()
  const { logout } = useAuth()
  const [remaining, setRemaining] = useState<number>(timeout)
  const [idleOpen, setIdleOpen] = useState<boolean>(false)

  const closeIdle = () => {
    setIdleOpen(false)
    logout()
  }

  const onPrompt = () => {
    setIdleOpen(true)
  }

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle: closeIdle,
    onActive: closeIdle,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 500
  })

  const handleStillHere = () => {
    activate()
  }

  const handleFullScreen = () => {
    const elem = document.getElementById('powerbi-container')
    if (!elem) return

    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    }
  }

  useEffect(() => {
    const activityInterval = setInterval(async () => {
      await PowerBiApi.registerActivity({
        workspaceId: params.workspaceId,
        reportId: params.reportId,
        userId: user?.id!
      })
    }, 300000)

    const idleInterval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)

    return () => {
      clearInterval(activityInterval)
      clearInterval(idleInterval)
    }
  }, [])

  const embedConfig = {
    type: 'report',
    id: params.reportId,
    tokenType: 1,
    accessToken: params.token,
    embedUrl: params.embedUrl,
    permissions: 0,
    viewMode: 0,
    settings: {
      filterPaneEnabled: false
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Dialog open={idleOpen} onOpenChange={setIdleOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Você ainda está ai?</DialogTitle>
            </DialogHeader>
            <p>Você será desconectado em {remaining} segundos.</p>
            <Button onClick={handleStillHere}>Ainda estou aqui</Button>
          </DialogContent>
        </Dialog>

        <Button
          onClick={handleFullScreen}
          className="justify-end rounded-none bg-colorPrimary-700 text-end text-lg"
        >
          Full Screen <EnterFullScreenIcon />
        </Button>
        <div id="powerbi-container" style={{ width: '100%', height: '100vh' }}>
          <PowerBIEmbed cssClassName="w-full h-screen" embedConfig={embedConfig} />
        </div>
      </div>
    </>
  )
}
