import React, { useState } from 'react'
import HamburgerMenu from 'hamburger-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUser } from '@/contexts/UserContext'
import { useAuth } from '@/contexts/AuthContext'
import { NavLink } from 'react-router-dom'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { BiPowerOff } from 'react-icons/bi'
import { Button } from '../ui/button'
import { useSidebarLinks } from '@/lib/hooks/useSidebarLinks'
import { cn } from '@/lib/utils'

export const Hamburger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const { logout } = useAuth()
  const links = useSidebarLinks()

  return (
    <div className="hidden lg:flex">
      <div className="z-20">
        <HamburgerMenu
          size={28}
          color="#f05718"
          toggled={isOpen}
          toggle={setIsOpen}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="absolute overflow-y-auto w-72 z-10 bg-muted min-h-screen top-0 bottom-0 right-0 pt-16 flex flex-col items-center"
          >
            <div className="flex flex-col justify-between h-[100%]">
              <nav className={''}>
                <ul className="flex flex-col gap-[1px] py-[1px]">
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
                        <span className={cn('text-sm font-semibold')}>
                          {link.text}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex items-center justify-between px-10">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user?.image || ''} alt="avatar" />
                  </Avatar>
                  <span className="font-semibold">{user?.name}</span>
                </div>
                <Button
                  onClick={logout}
                  variant="ghost"
                  className="hover:bg-destructive hover:text-white"
                >
                  <BiPowerOff size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
