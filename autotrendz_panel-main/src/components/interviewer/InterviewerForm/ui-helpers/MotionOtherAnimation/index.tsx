import { HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'

const MotionOtherAnimation: React.FC<HTMLMotionProps<'div'>> = (props) => {
  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0
      }}
      exit={{
        height: 0,
        opacity: 0
      }}
      animate={{
        height: 'auto',
        opacity: 1
      }}
      {...props}
    />
  )
}

export default MotionOtherAnimation
