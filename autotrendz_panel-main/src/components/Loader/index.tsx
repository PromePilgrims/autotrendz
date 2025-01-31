import React from 'react'

interface LoaderProps {
  message: string
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen flex-col gap-3">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-colorPrimary-500" />
        <p className="block">{message}</p>
      </div>
    </>
  )
}
