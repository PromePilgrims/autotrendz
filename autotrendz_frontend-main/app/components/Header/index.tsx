'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { BsWhatsapp } from 'react-icons/bs'
import Hamburger from 'react-hamburger-menu'
import { AnimatePresence, motion } from 'framer-motion'
import './style.css'

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const waLink =
    'https://wa.me/5511994494998?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20AutoTrendz.'

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      const header = document.getElementById('scroll-header')
      const logo = document.getElementById('logo')
      header!.classList.toggle('scrolled', window.scrollY > 10)
      logo!.classList.toggle('logo', window.scrollY > 10)
    })
  }

  return (
    <div
      id="scroll-header"
      className="flex items-center fixed justify-center w-full h-36 z-50 transitions duration-200"
    >
      <div className="flex items-center top-0 overflow-x-hidden justify-between w-2/3 2xl:w-[90%]">
        <Image
          id="logo"
          width={280}
          height={100}
          src="/assets/logo.png"
          alt="logo"
          className="sm:w-48"
        />
        <nav className="lg:hidden">
          <ul className="flex items-center justify-center gap-8 font-semibold">
            <li className="hover:text-primary-500 transition-colors">
              <a href="#">Início</a>
            </li>
            <li className="hover:text-primary-500 transition-colors">
              <a href="#">Quem somos</a>
            </li>
            <li className="hover:text-primary-500 transition-colors">
              <a href="#">Soluções</a>
            </li>
            <li className="hover:text-primary-500 transition-colors">
              <a href="#">Contato</a>
            </li>
          </ul>
        </nav>
        <a
          className="bg-green-600 border border-green-700 transition-all text-white font-medium flex justify-center items-center gap-3 px-3 h-14 rounded-full hover:bg-white hover:text-zinc-800 lg:hidden"
          href={waLink}
          target="_blank"
          title="Fale com a AutoTrendz pelo WhatsApp"
          role="button"
        >
          <BsWhatsapp className="group-hover:text-zinc-800" />
          (11) 99449-4998
        </a>
        <div className="hidden relative z-20 lg:flex">
          <Hamburger
            width={30}
            height={20}
            menuClicked={toggle}
            color="black"
            isOpen={isOpen}
          ></Hamburger>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ right: '-20rem' }}
            animate={{ right: '0' }}
            exit={{ right: '-20rem' }}
            className="bg-white hidden w-80 h-screen absolute right-0 top-0 z-10 shadow-2xl pt-24 lg:flex"
          >
            <div className="h-full w-full flex flex-col items-center justify-between pb-20 ">
              <nav>
                <ul className="flex items-center flex-col gap-8 font-semibold">
                  <li className="hover:text-primary-500 transition-colors">
                    <a href="#">Início</a>
                  </li>
                  <li className="hover:text-primary-500 transition-colors">
                    <a href="#">Serviços</a>
                  </li>
                  <li className="hover:text-primary-500 transition-colors">
                    <a href="#">Orçamento</a>
                  </li>
                  <li className="hover:text-primary-500 transition-colors">
                    <a href="#">Contato</a>
                  </li>
                </ul>
              </nav>
              <a
                className="bg-green-600 border border-green-700 w-[80%] transition-all text-white font-medium flex justify-center items-center gap-3 px-3 h-14 rounded-full hover:bg-white hover:text-zinc-800"
                href={waLink}
                target="_blank"
                title="Fale com a AutoTrendz pelo WhatsApp"
                role="button"
              >
                <BsWhatsapp className="group-hover:text-zinc-800" />
                (11) 99449-4998
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
