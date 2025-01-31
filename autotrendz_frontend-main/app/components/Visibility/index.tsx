import React from 'react'
import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF, FaInstagram, FaWaze } from 'react-icons/fa'

export const Visibility: React.FC = () => {
  return (
    <section className="flex flex-col items-center py-24">
      <h1 className="text-5xl font-extralight my-6 text-center lg:w-full">
        Que tipo de preços coletamos?
      </h1>
      <div className="mt-16 grid grid-cols-2 gap-8 w-full lg:flex lg:flex-col lg:items-center">
        <div className="border border-zinc-200 rounded-md p-6 flex h-52 sm:h-auto sm:flex-col sm:items-center sm:text-center">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg">Preços de varejo</span>
            <p className="font-medium">
              Somos capazes de coletar o preço sugerido pela montadora ou fabricante,
              ou o preço efetivamente praticado no varejo em diversos canais
              (autopeças, concessionárias, oficinas, lojas de pneus, supertrocas de
              óleo, postos de combustíveis, centros automotivos, hipermercados, etc.)
            </p>
          </div>
        </div>
        <div className="border border-zinc-200 rounded-md p-6 flex h-52 sm:h-auto sm:flex-col sm:items-center sm:text-center">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg">Preços de atacado</span>
            <p className="font-medium">
              Coletamos os preços de venda de atacado, dos distribuidores para
              concessionárias, autopeças, oficinas, postos de combustíveis e centros
              automotivos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
