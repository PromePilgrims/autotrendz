import React from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { AiFillStar } from 'react-icons/ai'
import Image from 'next/image'

export const Banner: React.FC = () => {
  return (
    <section className="w-full py-20 flex relative mt-24 lg:flex-col lg-items-center">
      <div className="w-1/2 flex flex-col space-y-4 lg:w-full lg:mb-12">
        <div className="flex items-center gap-3 lg:justify-center">
          <BsArrowRightCircle size={18} color="#3F3F46" />
          <span>Especialistas em Precificação Automotiva Sob Medida</span>
        </div>
        <h1 className="w-[600px] leading-tight text-5xl font-extralight text-zinc-800 xl:w-[400px] lg:w-full lg:text-center lg:flex lg:flex-col lg:items-center">
          Personalizando Soluções de Precificação para o seu{' '}
          <span className="font-bold text-primary-500">Projeto Automotivo</span>
        </h1>
        <h2 className="text-lg w-[600px] xl:w-[400px] lg:w-full lg:text-center">
          A <strong className="text-primary-500">AutoTrendz</strong> é especializada
          em preços automotivos, por isso, dedicamos todo nosso know-how às pesquisas
          de preços ad hoc, planejadas sob medida para atender cada detalhe do seu
          projeto.
        </h2>
        <div className="flex items-center gap-2 lg:w-full lg:justify-center sm:flex-col">
          {/* <a
            className="flex justify-center items-center bg-primary-500 rounded-full text-white font-semibold px-4 h-14 transition-all hover:bg-primary-100 hover:text-primary-500"
            href="#"
            role="button"
          >
            FALE COM UM ESPECIALISTA
          </a> */}
          {/* <div className="flex items-center">
            <FcGoogle size={56} />
            <div>
              <div className="flex">
                <AiFillStar color="#F0AD4E" />
                <AiFillStar color="#F0AD4E" />
                <AiFillStar color="#F0AD4E" />
                <AiFillStar color="#F0AD4E" />
                <AiFillStar color="#F0AD4E" />
              </div>
              <span className="text-zinc-600">Clientes satisfeitos</span>
            </div>
          </div> */}
        </div>
        <span className="lg:flex lg:justify-center lg:text-center">
          Ligue agora:{' '}
          <a
            className="text-primary-500 hover:text-primary-700 transition-colors underline"
            href="https://wa.me/5511994494998"
            target="_blank"
            role="button"
          >
            (11) 99449-4998
          </a>
        </span>
      </div>
      <div className="w-1/2 lg:w-full">
        <Image
          width={600}
          height={410}
          src="/assets/banner/banner.jpg"
          alt="banner"
        />
      </div>
    </section>
  )
}
