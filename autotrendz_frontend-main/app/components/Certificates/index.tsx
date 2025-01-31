import React from 'react'
import { AnimatedText } from '../AnimatedText'

export const Certificates: React.FC = () => {
  return (
    <section className="flex flex-col items-center gap-6 text-center">
      <p className="text-lg">
        A autotrendz possui profissionais de Marketing Digital{' '}
        <AnimatedText>certificados</AnimatedText> pelo Google.
      </p>
      <a
        className="flex justify-center items-center w-72 bg-primary-500 rounded-full text-white font-semibold px-4 h-14 transition-all hover:bg-primary-100 hover:text-primary-500"
        href="#"
        role="button"
      >
        FALE COM UM ESPECIALISTA
      </a>
    </section>
  )
}
