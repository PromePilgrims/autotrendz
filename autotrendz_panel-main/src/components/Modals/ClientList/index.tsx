import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { ClientActions } from '@/components/Modals/ClientList/ClientActions'

interface ClientListProps {
  clients: [{ id: string; name: string }]
}

export const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between h-[90px] px-4 border-b-[1px] border-b-zinc-300 sm:flex-col sm:w-full sm:py-4 sm:h-auto sm:gap-2"
      >
        <div className="flex flex-col justify-center">
          <span className="text-4xl font-semibold">Clientes</span>
        </div>
        <div className="flex items-center gap-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-40"
            type="text"
            placeholder="Pesquisar"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: '300px' }}
        animate={{ opacity: 1, x: '0' }}
        className="px-4 mt-6"
      >
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Nome</TableHead>
              <TableHead className="w-32 font-bold">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients
              ?.filter((client) => {
                if (search === '') {
                  return true
                } else {
                  const lowerCaseSearch = search.toLowerCase()
                  return (
                    String(client.id).includes(lowerCaseSearch) ||
                    client.name.toLowerCase().includes(lowerCaseSearch)
                  )
                }
              })
              .map((client) => {
                return (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell className="w-32">
                      <ClientActions client={client} />
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
