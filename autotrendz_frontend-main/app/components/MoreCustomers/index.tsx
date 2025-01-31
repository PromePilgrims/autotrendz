import Image from 'next/image'
import React from 'react'

export const MoreCustomers: React.FC = () => {
  return (
    <section className="py-24">
      <div className="bg-slate-100 flex gap-10 p-14 lg:flex-col md:p-6">
        <div className="flex flex-col space-y-6 lg:items-center">
          <h1 className="text-5xl lg:text-center">
            <span className="text-primary-500 font-bold">Atraia mais </span>
            clientes para o seu negócio
          </h1>
          <span className="text-zinc-400 font-normal lg:text-center">
            Aumente sua clientela
          </span>
          <p className="lg:text-center">
            Somos especialistas em atrair clientes. Com as estratégias de marketing
            digital da Autotrendz e metodologias avançadas, levamos mais clientes
            para o seu negócio.
          </p>
          <button className="border border-primary-500 rounded-full text-primary-500 w-60 h-14 px-4 hover:bg-primary-500 hover:text-white transition-all">
            ENTRAR EM CONTATO
          </button>
        </div>
        <Image
          width={570}
          height={375}
          src="/assets/more_customers/banner.png"
          alt="banner"
          className="lg:w-full"
        />
      </div>
    </section>
  )
}
