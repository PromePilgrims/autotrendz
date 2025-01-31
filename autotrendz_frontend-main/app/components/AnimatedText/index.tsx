import React, { ReactNode } from 'react'

interface AnimatedTextProps {
  children: ReactNode
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ children }) => {
  return <span className="text-primary-500 font-semibold">{children}</span>
}
