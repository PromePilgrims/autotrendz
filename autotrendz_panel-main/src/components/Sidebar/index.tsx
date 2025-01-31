import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { FaSignOutAlt } from 'react-icons/fa'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useUser } from '@/contexts/UserContext'
import { useSidebarLinks } from '@/lib/hooks/useSidebarLinks'
import { cn } from '@/lib/utils'

export const Sidebar: React.FC = () => {
  const { user } = useUser()
  const { logout, isInterviewer } = useAuth()

  const links = useSidebarLinks()

  if (isInterviewer) {
    return null
  }

  return (
    <div className="w-[280px] h-screen flex flex-col fixed top-0 left-0 bg-muted border-r shadow-md lg:hidden">
      <div className="flex justify-center items-center h-[99px]">
        <img className="object-cover w-48 mr-8" src="/assets/logo.png" alt="logo" />
      </div>
      <div className="flex flex-col justify-between h-[100%]">
        <nav className={cn('p-4')}>
          <ul className="flex flex-col gap-1">
            {links.map((link, l) => (
              <li key={l}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-4 px-6 h-10 select-none rounded-lg',
                      isActive
                        ? 'bg-background text-foreground'
                        : 'bg-transparent text-muted-foreground'
                    )
                  }
                >
                  {link.icon}
                  <span className={cn('text-sm font-semibold')}>{link.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-between bg-background py-4 px-6 border-t">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.image || ''} alt="avatar" />
            </Avatar>
            <span className="font-semibold">{user?.name}</span>
          </div>
          <Button
            onClick={logout}
            variant="ghost"
            className="hover:text-destructive"
          >
            <FaSignOutAlt size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
