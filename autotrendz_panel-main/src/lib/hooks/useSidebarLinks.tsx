import { useAuth } from '@/contexts/AuthContext'
import { LuPenSquare, LuNewspaper } from 'react-icons/lu'
import { TbZoomMoney } from 'react-icons/tb'

import { useMemo } from 'react'
import { AiFillFolderOpen, AiOutlineMenu } from 'react-icons/ai'
import { CiFlag1 } from 'react-icons/ci'
import { FaUsers } from 'react-icons/fa'

export function useSidebarLinks() {
  const auth = useAuth()
  const links = useMemo(() => {
    if (!auth) return []

    if (auth.isUser) {
      return [
        {
          path: '/report',
          icon: <LuNewspaper className="w-5 h-5" />,
          text: 'Relatórios'
        },
        {
          path: '/folders',
          icon: <AiFillFolderOpen className="w-5 h-5" />,
          text: 'Pastas'
        }
      ]
    }

    if (auth.isSupervisor) {
      return [
        {
          path: '/questionnaires',
          icon: <LuPenSquare className="w-5 h-5" />,
          text: 'Questionários'
        }
      ]
    }

    return [
      {
        path: '/clients',
        icon: <FaUsers className="w-5 h-5" />,
        text: 'Clientes'
      },
      {
        path: '/folders',
        icon: <AiFillFolderOpen className="w-5 h-5" />,
        text: 'Pastas'
      },
      {
        path: '/report',
        icon: <LuNewspaper className="w-5 h-5" />,
        text: 'Relatórios'
      },
      {
        path: '/questionnaires',
        icon: <LuPenSquare className="w-5 h-5" />,
        text: 'Questionários'
      },
      {
        path: '/audatex-prices',
        icon: <TbZoomMoney className="w-5 h-5" />,
        text: 'Audatex - Preços'
      },
      {
        path: '/languages',
        icon: <CiFlag1 className="w-5 h-5" />,
        text: 'Idiomas'
      },
      {
        path: '/terms',
        icon: <AiOutlineMenu className="w-5 h-5" />,
        text: 'Termos'
      }
    ]
  }, [auth])

  return links
}
