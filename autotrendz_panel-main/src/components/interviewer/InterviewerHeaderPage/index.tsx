import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useUser } from '@/contexts/UserContext'
import { cn } from '@/lib/utils'
import { AvatarIcon } from '@radix-ui/react-icons'
import React from 'react'

interface InterviewerHeaderPageProps {
  className?: string
}

const InterviewerHeaderPage: React.FC<InterviewerHeaderPageProps> = ({
  className
}) => {
  const { user } = useUser()
  const { logout } = useAuth()

  return (
    <div
      className={cn('w-full h-14 bg-brand text-brand-foreground mb-20', className)}
    >
      <div className="container h-full">
        <div className="flex items-center h-full justify-between">
          <div className="flex flex-col">
            <span className="font-bold">AutoTRENDZ</span>
            <span className="text-xs uppercase font-medium">Pesquisas</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 px-2 py-1 rounded-lg bg-white/20 border border-border/20">
              <Avatar className="w-8 h-8 rounded-xl bg-brand-foreground">
                <AvatarFallback className="bg-transparent rounded-xl">
                  <AvatarIcon className="w-7 h-7 text-brand" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{user?.name}</span>
                <span className="text-xs">{user?.email}</span>
              </div>
              <Button
                variant={'outline'}
                size={'sm'}
                className="px-6"
                onClick={logout}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewerHeaderPage
