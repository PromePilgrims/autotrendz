import React from 'react'
import { BsWhatsapp, BsTelephone } from 'react-icons/bs'
import Image from 'next/image'
import './style.css'
import { CiUser } from 'react-icons/ci'
import { FaWhatsapp } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa6'
import { RxTwitterLogo } from 'react-icons/rx'

export const Footer: React.FC = () => {
  return (
    <section className="bg-cyan-950 w-full pt-52 clip flex justify-center clip ">
      <div className="w-2/3 flex text-white flex-col items-center 2xl:w-[90%]">
        <div className="flex flex-col h-[100px] justify-between w-full pb-8 border-b border-b-zinc-200">
          {/* <div className="flex flex-col items-center gap-8">
            <h1 className="text-white text-4xl font-extralight text-center w-[550px] sm:w-full">
              Leve sua empresa para o próximo nível com a{' '}
              <span className="font-bold text-4xl">autotrendz</span>
            </h1>
            <span className="text-center">
              Nossos especialistas de marketing estão prontos para atender você.
            </span>
            <a
              className="flex justify-center w-80 items-center gap-3 bg-lime-500 rounded-full text-white font-semibold px-6 h-14 transition-all hover:bg-lime-700 sm:w-full"
              href="#"
              role="button"
            >
              <BsWhatsapp />
              <span>FALAR POR WHATSAPP</span>
            </a>
          </div> */}
          <div className="flex items-center w-full">
            <Image width={200} height={100} src="/assets/logo.png" alt="logo" />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full py-12 text-zinc-300">
          <div className="flex items-center justify-between sm:flex-col">
            <span className="sm:text-center">
              © 2023 Todos os Direitos Reservados
            </span>
            <div className="flex items-center gap-6 sm:flex-col sm:mt-4">
              <a href="#">Termos e condições</a>
              <a href="#">Política de Privacidade</a>
              <a href="#">Trabalhe conosco</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://twitter.com/AutoTrendz_br"
              target="_blank"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#3f3f3f] text-white"
            >
              <RxTwitterLogo size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/autotrendz_brazil/"
              target="_blank"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#3f3f3f] text-white"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <CiUser size={14} />
              <span className="font-semibold">RODRIGO GARCIA MARIOTTI</span>
            </div>
            <div className="flex items-center gap-2">
              <BsTelephone size={14} />
              <span className="font-semibold">(11) 3804-5469</span>
            </div>
            <div className="flex items-center gap-2">
              <FaWhatsapp size={14} />
              <span className="font-semibold">(11) 99449-4998</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
