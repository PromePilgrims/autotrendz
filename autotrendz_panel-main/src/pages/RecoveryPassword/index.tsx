import React, { FormEvent, useState } from 'react'

import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import AuthApi from '@/services/AuthApi'

export const RecoveryPassword: React.FC = () => {
  const { hash } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordIsHided, setPasswordIsHided] = useState(true)
  const [confirmPasswordIsHided, setConfirmPasswordIsHided] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (password === '' || confirmPassword === '') {
      return toast({
        title: 'Erro',
        description: 'Preencha todos os campos',
        variant: 'destructive'
      })
    }

    if (password !== confirmPassword) {
      return toast({
        title: 'Erro',
        description: 'As senhas devem ser iguais',
        variant: 'destructive'
      })
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (!passwordRegex.test(password)) {
      return toast({
        title: 'Erro',
        description:
          'A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial.',
        variant: 'destructive'
      })
    }

    setIsLoading(true)

    AuthApi.recovery({ password, confirmPassword, hash: hash! })
      .then(() => {
        toast({
          title: 'Sucesso',
          description: 'Sua senha foi alterada com sucesso',
          variant: 'success'
        })
        navigate('/login')
      })
      .catch(() =>
        toast({
          title: 'Erro',
          description: 'Houve algum erro',
          variant: 'destructive'
        })
      )
      .finally(() => setIsLoading(false))
  }

  const togglePasswordVisibility = () => {
    setPasswordIsHided(!passwordIsHided)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordIsHided(!confirmPasswordIsHided)
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="shadow-md rounded-sm w-[500px] flex flex-col gap-10 items-center py-12 px-20 bg-white transition-all sm:w-full sm:px-8"
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-semibold text-3xl">Recuperar senha</h1>
            <span className="text-[#999999] font-semibold">
              Digite sua nova senha
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[#56545E] font-medium">Senha</span>
            </div>
            <div className="flex items-center h-10 w-full justify-between pr-2 border border-[#E1E1E5] rounded-sm">
              <input
                className="h-full w-[90%] text-sm font-semibold rounded-sm pl-4"
                type={passwordIsHided ? 'password' : 'text'}
                value={password}
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
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[#56545E] font-medium">Confirmar senha</span>
            </div>
            <div className="flex items-center h-10 w-full justify-between pr-2 border border-[#E1E1E5] rounded-sm">
              <input
                className="h-full w-[90%] text-sm font-semibold rounded-sm pl-4"
                type={confirmPasswordIsHided ? 'password' : 'text'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                onClick={toggleConfirmPasswordVisibility}
                type="button"
                className="flex items-center justify-center w-[10%] hover:brightness-75 transition-all"
              >
                {confirmPasswordIsHided ? (
                  <IoMdEye fill="#BAC0CA" size={22} />
                ) : (
                  <IoMdEyeOff fill="#BAC0CA" size={22} />
                )}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            isLoading={isLoading}
            className="bg-colorPrimary-600 hover:bg-colorPrimary-600"
          >
            Enviar
          </Button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-between w-[160px] transition-all hover:w-[170px]"
        >
          <MdKeyboardArrowLeft size={24} />
          <span className="font-semibold mb-[3px]">voltar para o login</span>
        </button>
      </motion.div>
    </div>
  )
}
