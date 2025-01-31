import Image from 'next/image'
import React from 'react'

export const Companies: React.FC = () => {
  return (
    <section className="flex flex-col items-center w-full py-24">
      <span className="text-zinc-400 mb-4 text-center">
        Quais segmentos a AutoTrendz atende?
      </span>
      <div className="flex items-center justify-between mt-4 w-full gap-4 xl:flex-wrap xl:justify-center">
        <span className="font-bold w-48 text-center">LUBRIFICANTES</span>
        <span className="font-bold w-48 text-center">
          PEÇAS AFTERMARKET DE TODOS OS SEGMENTOS
        </span>
        <span className="font-bold w-48 text-center">PEÇAS ORIGINAIS</span>
        <span className="font-bold w-48 text-center">PNEUS</span>
        <span className="font-bold w-48 text-center">TINTAS</span>
        <span className="font-bold w-48 text-center">SERVIÇOS</span>
      </div>
    </section>
  )
}
