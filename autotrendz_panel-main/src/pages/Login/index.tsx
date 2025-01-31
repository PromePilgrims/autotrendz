import React, { FormEvent, useState } from 'react'

import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import AuthApi from '@/services/AuthApi'
import ReactLoading from 'react-loading'

export const Login: React.FC = () => {
  const { toast } = useToast()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isRecoveryConcluded, setIsRecoveryConcluded] = useState(false)

  const [passwordIsHided, setPasswordIsHided] = useState(true)
  const [isRecovery, setIsRecovery] = useState(false)

  const [recoveryIsLoading, setRecoveryIsLoading] = useState(false)

  const handleRecovery = (e: FormEvent) => {
    e.preventDefault()

    if (email === '') {
      return toast({
        variant: 'destructive',
        title: 'Erro no formulário',
        description: 'O campo E-mail não pode ser vazio'
      })
    }

    setRecoveryIsLoading(true)

    AuthApi.sendEmail({ email })
      .then(() => {
        setIsRecoveryConcluded(true)
        toast({
          title: 'Sucesso',
          description: 'Email enviado com sucesso!',
          variant: 'success'
        })
      })
      .catch(() => {
        toast({
          title: 'Erro',
          description: 'Houve um erro ao enviar o email',
          variant: 'destructive'
        })
      })
      .finally(() => {
        setRecoveryIsLoading(false)
      })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    AuthApi.login({ email, password })
      .then((res) => {
        login(res.data.access_token)
      })
      .catch(() =>
        toast({
          variant: 'destructive',
          title: 'Erro no formulário',
          description: 'E-mail ou senha inválidos'
        })
      )
  }

  const disableIsRecovery = () => {
    setIsRecovery(false)
  }

  const togglePasswordVisibility = () => {
    setPasswordIsHided(!passwordIsHided)
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen px-4 bg-muted">
      <motion.div
        transition={{
          duration: 0.8,
          type: 'spring'
        }}
        initial={{
          y: 50,
          scale: 0.95,
          opacity: 0
        }}
        animate={{
          y: 0,
          scale: 1,
          opacity: 1
        }}
        className="shadow-md rounded-sm w-[500px] flex flex-col gap-10 items-center py-12 px-20 bg-white sm:w-full sm:px-8"
      >
        {!isRecoveryConcluded ? (
          <>
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                {isRecovery ? (
                  <>
                    <h1 className="font-semibold text-3xl">Recuperar senha</h1>
                    <span className="text-[#999999] font-semibold">
                      Digite seu e-mail abaixo
                    </span>
                  </>
                ) : (
                  <>
                    <h1 className="font-semibold text-3xl">Login</h1>
                    <span className="text-[#999999] font-semibold">
                      Digite seu e-mail e senha
                    </span>
                  </>
                )}
              </div>
            </div>
            <form
              onSubmit={isRecovery ? handleRecovery : handleSubmit}
              className="w-full flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#56545E] font-medium">E-mail</span>
                </div>
                <div className="flex items-center h-10 w-full justify-between border border-[#E1E1E5] rounded-sm">
                  <input
                    required
                    className="h-full w-[100%] text-sm font-semibold rounded-sm px-4"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {!isRecovery && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#56545E] font-medium">Senha</span>
                    <button
                      className=" text-colorPrimary-500 text-sm font-semibold hover:brightness-75 transition-all"
                      type="button"
                      onClick={() => setIsRecovery(true)}
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                  <div className="flex items-center h-10 w-full justify-between pr-2 border border-[#E1E1E5] rounded-sm">
                    <input
                      className="h-full w-[90%] text-sm font-semibold rounded-sm pl-4"
                      type={passwordIsHided ? 'password' : 'text'}
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      type="button"
                      className="flex items-center justify-center w-[10%] hover:brightness-75 transition-all"
                    >
                      {passwordIsHided ? (
                        <IoMdEye fill="#BAC0CA" size={22} />
                      ) : (
                        <IoMdEyeOff fill="#BAC0CA" size={22} />
                      )}
                    </button>
                  </div>
                </div>
              )}
              {recoveryIsLoading ? (
                <Button
                  type="button"
                  className="bg-colorPrimary-600 hover:bg-colorPrimary-600"
                >
                  <ReactLoading type="spin" height="20px" width="20px" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-colorPrimary-600 hover:bg-colorPrimary-800"
                >
                  {isRecovery ? 'Recuperar' : 'Entrar'}
                </Button>
              )}
            </form>
            {isRecovery && (
              <button
                className="flex items-center justify-between w-[160px] transition-all hover:w-[170px]"
                onClick={disableIsRecovery}
              >
                <MdKeyboardArrowLeft size={24} />
                <span className="font-semibold mb-[3px]">voltar para o login</span>
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold text-xl text-center">
              Enviamos uma mensagem para o email informado.
            </p>
            <Button
              onClick={() => {
                setIsRecovery(false)
                setIsRecoveryConcluded(false)
              }}
              className="w-48 bg-colorPrimary-500 hover:bg-colorPrimary-700"
            >
              Voltar
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
