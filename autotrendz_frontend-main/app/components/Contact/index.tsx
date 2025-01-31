'use client'

import React, { FormEvent, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { AnimatedText } from '../AnimatedText'
import { useReCaptcha } from 'next-recaptcha-v3'
import { http } from '@/app/http'

type FormData = {
  name: string
  email: string
  tel: string
  message: string
}

export const Contact: React.FC = () => {
  const [isFormValid, setIsFormValid] = useState(true)
  const [contactSent, setContactSent] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    tel: '',
    message: ''
  })
  const { loaded, executeRecaptcha } = useReCaptcha()

  function changeFormData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) {
    setIsFormValid(true)
    setFormData({ ...formData, [key]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const token = await executeRecaptcha('form_submit')
    if (!token) return

    const values = Object.values(formData).map((value) => value.trim())

    if (values.some((value) => ['', undefined, ' '].includes(value))) {
      setIsFormValid(false)
    }

    const response = await http.post('/contact', { ...formData, token })

    if (response.data.message) {
      setContactSent(true)
    }
  }

  return (
    <section className="w-full flex gap-8 lg:flex-col lg-items:center">
      <div className="w-1/2 lg:w-full">
        <h1 className="text-5xl font-extralight lg:text-center">Entre Em Contato</h1>
        <p className="py-4 lg:text-center">
          Quer saber mais sobre a AutoTrendz ou solicitar uma visita? Deixe seus
          dados no formulário ao lado e entraremos em contato rapidamente!
        </p>
        {/* <div>
          <span className="text-primary-500 font-bold text-lg">
            Nossos diferenciais:
          </span>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center">
              <div>
                <BsCheckLg className="mr-4" color="#f05718" size={32} />
              </div>
              <p className="font-semibold text-lg">Metodologia avançada</p>
            </div>
            <div className="flex items-center">
              <div>
                <BsCheckLg className="mr-4" color="#f05718" size={32} />
              </div>
              <p className="font-semibold text-lg">Especialistas certificados</p>
            </div>
            <div className="flex items-center">
              <div>
                <BsCheckLg className="mr-4" color="#f05718" size={32} />
              </div>
              <p className="font-semibold text-lg">Resultados contínuos</p>
            </div>
            <div className="flex items-center">
              <div>
                <BsCheckLg className="mr-4" color="#f05718" size={32} />
              </div>
              <p className="font-semibold text-lg">Atendimento de ponta</p>
            </div>
            <div className="flex items-center">
              <div>
                <BsCheckLg className="mr-4" color="#f05718" size={32} />
              </div>
              <p className="font-semibold text-lg">
                Experiência com grandes empresas
              </p>
            </div>
            <div className="flex items-center">
              <div>
                <BsCheckLg className="mr-4" color="#f05718" size={32} />
              </div>
              <p className="font-semibold text-lg">Profissionalismo</p>
            </div>
            <div className="flex items-center">
              <div>
                <BsCheckLg className="mr-4" color="#f05718" size={32} />
              </div>
              <p className="font-semibold text-lg">Compromisso com qualidade</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="w-1/2 flex flex-col lg:w-full">
        {/* <span className="font-bold lg:text-center">
          Entre em <AnimatedText>contato agora</AnimatedText> com a nossa equipe de
          sucesso do cliente.
        </span> */}
        <span className="mt-6">Preencha o formulário abaixo:</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          <input
            className="rounded-3xl border border-zinc-300 py-3 px-4 outline-none"
            type="text"
            required
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => changeFormData(e, 'name')}
          />
          <input
            className="rounded-3xl border border-zinc-300 py-3 px-4 outline-none"
            type="email"
            required
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => changeFormData(e, 'email')}
          />
          <input
            className="rounded-3xl border border-zinc-300 py-3 px-4 outline-none"
            type="text"
            required
            placeholder="DDD + Celular"
            value={formData.tel}
            onChange={(e) => changeFormData(e, 'tel')}
          />
          <textarea
            className="rounded-3xl border border-zinc-300 py-3 px-4 outline-none"
            placeholder="Escreva aqui sua mensagem"
            required
            value={formData.message}
            onChange={(e) => changeFormData(e, 'message')}
          />
          {!isFormValid && (
            <span className="bg-primary-500 text-sm p-3 rounded-full text-white">
              Por favor, preencha todos os campos corretamente
            </span>
          )}
          {contactSent && (
            <span className="bg-green-500 text-sm p-3 rounded-full text-white">
              Mensagem enviada com sucesso, retornaremos em breve!
            </span>
          )}
          <button
            disabled={!loaded || contactSent}
            className="flex justify-center items-center bg-primary-500 rounded-full text-white font-semibold w-60 px-4 mt-6 h-14 transition-all hover:bg-primary-100 hover:text-primary-500 uppercase sm:w-full disabled:bg-slate-500 disabled:hover:text-white"
            role="button"
            type="submit"
          >
            Enviar Mensagem
          </button>
        </form>
      </div>
    </section>
  )
}
