import { Hamburger } from '@/components/Hamburger'
import InterviewerContainer from '@/components/interviewer/InterviewerContainer'
import { useAuth } from '@/contexts/AuthContext'
import AdminQuestionnaire from '@/pages/AdminQuestionnaire'
import AdminQuestionnaires from '@/pages/AdminQuestionnaires'
import { Clients } from '@/pages/Clients'
import { Folders } from '@/pages/Folders'
import { Languages } from '@/pages/Languages'
import { Login } from '@/pages/Login'
import { PowerBi } from '@/pages/PowerBi'
import { Prices } from '@/pages/Prices'
import { RecoveryPassword } from '@/pages/RecoveryPassword'
import { Report } from '@/pages/Report'
import { Terms } from '@/pages/Terms'
import InterviewerHome from '@/pages/interviewer/InterviewerHome'
import InterviewerQuestionnaire from '@/pages/interviewer/InterviewerQuestionnaire'
import InterviewerQuestionnaireRecall from '@/pages/interviewer/InterviewerQuestionnaireRecall'
import InterviewerQuestionnaires from '@/pages/interviewer/InterviewerQuestionnaires'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'

export const Routes: React.FC = () => {
  const {
    isAuthenticated,
    checkUserIsAuthenticated,
    isInterviewer,
    isUser,
    isSupervisor
  } = useAuth()

  useEffect(() => {
    checkUserIsAuthenticated()
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="overflow-x-hidden absolute right-0 top-0 z-20 w-full min-h-screen bg-background">
        <AnimatePresence>
          <ReactRoutes>
            <Route path="/" Component={Login} />
            <Route path="/recovery/:hash" Component={RecoveryPassword} />
          </ReactRoutes>
        </AnimatePresence>
      </div>
    )
  }

  if (isAuthenticated && isInterviewer) {
    return (
      <InterviewerContainer>
        <ReactRoutes>
          <Route path={'/'} Component={InterviewerHome} />
          <Route
            path={'/questionnaire/:questionnaireId'}
            Component={InterviewerQuestionnaireRecall}
          />
          <Route
            path={'/:stateId/questionnaires'}
            Component={InterviewerQuestionnaires}
          />
          <Route
            path={'/:stateId/questionnaires/:questionnaireId'}
            Component={InterviewerQuestionnaire}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </ReactRoutes>
      </InterviewerContainer>
    )
  }

  if (isAuthenticated && isSupervisor) {
    return (
      <div className="overflow-x-hidden absolute right-0 top-0 z-20 w-[calc(100vw-280px)] min-h-screen bg-background lg:w-screen">
        <div className="hidden md:px-4 lg:flex lg:items-center lg:justify-between lg:h-16 px-10">
          <div className="flex justify-center items-center">
            <img className="h-14" src="/assets/logo.png" alt="logo" />
          </div>
          <Hamburger />
        </div>
        <AnimatePresence>
          <ReactRoutes>
            <Route path="*" element={<Navigate to="/questionnaires" />} />
            <Route path="/questionnaires" Component={AdminQuestionnaires} />
            <Route
              path="/questionnaires/:questionnaireId"
              Component={AdminQuestionnaire}
            />
          </ReactRoutes>
        </AnimatePresence>
      </div>
    )
  }

  if (isAuthenticated && !isInterviewer) {
    return (
      <div className="overflow-x-hidden absolute right-0 top-0 z-20 w-[calc(100vw-280px)] min-h-screen bg-background lg:w-screen">
        <div className="hidden md:px-4 lg:flex lg:items-center lg:justify-between lg:h-16 px-10">
          <div className="flex justify-center items-center">
            <img className="h-14" src="/assets/logo.png" alt="logo" />
          </div>
          <Hamburger />
        </div>
        <AnimatePresence>
          <ReactRoutes>
            <Route
              path="*"
              element={<Navigate to={isUser ? '/report' : '/clients'} replace />}
            />
            <Route path="/clients" Component={Clients} />
            <Route path="/folders" Component={Folders} />
            <Route path="/questionnaires" Component={AdminQuestionnaires} />
            <Route path="/audatex-prices" Component={Prices} />
            <Route
              path="/questionnaires/:questionnaireId"
              Component={AdminQuestionnaire}
            />
            <Route path="/languages" Component={Languages} />
            <Route path="/terms" Component={Terms} />
            <Route path="/report" Component={Report} />
            <Route path="/report/:workspaceId/:reportId" Component={PowerBi} />
          </ReactRoutes>
        </AnimatePresence>
      </div>
    )
  }
}
