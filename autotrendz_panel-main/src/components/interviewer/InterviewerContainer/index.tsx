import React, { ReactNode } from 'react'
import PendingQuetionnairesSidebar from './src/PendingQuetionnairesSidebar'

interface InterviewerContainerProps {
  children: ReactNode
}

const InterviewerContainer: React.FC<InterviewerContainerProps> = ({ children }) => {
  return (
    <>
      <div className="flex absolute left-0 top-0 z-20 w-screen overflow-hidden min-h-screen bg-background">
        <div className="flex-1 relative">
          <div className="w-full h-full absolute overflow-hidden flex flex-col items-center">
            {children}
          </div>
        </div>
        <PendingQuetionnairesSidebar />
      </div>
    </>
  )
}

export default InterviewerContainer
