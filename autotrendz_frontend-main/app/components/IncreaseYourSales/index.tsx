import Image from 'next/image'
import React from 'react'
import { BsCheckLg } from 'react-icons/bs'

export const IncreaseYourSales: React.FC = () => {
  return (
    <section className="flex gap-16 mt-32 lg:flex-col-reverse lg:items-center lg:text-center">
      <Image
        width={525}
        height={500}
        src="/assets/segments/banner.jpg"
        alt="banner"
        className="object-contain xl:max-h-[400px] lg:max-h-[auto]"
      />
      <div>
        <h1 className="text-5xl font-extralight my-4">
          Quais segmentos a autotrendz atende?
        </h1>
        <span>
          A AutoTrendz é especialista em Automóveis, Caminhões, Motos, Equipamentos
          de Construção e Máquinas Agrícolas, desenvolvendo estudos de preços para os
          seguintes itens:
        </span>
        <div className="mt-8 flex flex-col gap-8">
          <div className="flex items-center lg:text-left">
            <div className="w-12">
              <BsCheckLg className="mr-4" color="#f05718" size={32} />
            </div>
            <p className="font-semibold text-lg lg:text-left">Lubrificantes</p>
          </div>
          <div className="flex items-center">
            <div className="w-12">
              <BsCheckLg className="mr-4" color="#f05718" size={32} />
            </div>
            <p className="font-semibold text-lg lg:text-left">
              Peças aftermarket de todos os segmentos
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-12">
              <BsCheckLg className="mr-4" color="#f05718" size={32} />
            </div>
            <p className="font-semibold text-lg lg:text-left">Peças originais</p>
          </div>
          <div className="flex items-center">
            <div className="w-12">
              <BsCheckLg className="mr-4" color="#f05718" size={32} />
            </div>
            <p className="font-semibold text-lg lg:text-left">Pneus</p>
          </div>
          <div className="flex items-center">
            <div className="w-12">
              <BsCheckLg className="mr-4" color="#f05718" size={32} />
            </div>
            <p className="font-semibold text-lg lg:text-left">Tintas</p>
          </div>
          <div className="flex items-center">
            <div className="w-12">
              <BsCheckLg className="mr-4" color="#f05718" size={32} />
            </div>
            <p className="font-semibold text-lg lg:text-left">Serviços</p>
          </div>
        </div>
      </div>
    </section>
  )
}
