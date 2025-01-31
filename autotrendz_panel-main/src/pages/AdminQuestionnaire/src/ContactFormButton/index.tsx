import AdminInterviewerFormModal from '@/components/interviewer/AdminInterviewerFormModal'
import { Button } from '@/components/ui/button'
import { YmhQuestionnaire } from '@/services/YmhQuestionnaire'
import React, { useState } from 'react'

interface ContactFormButtonProps {
  contact: YmhQuestionnaire.ContactQuestionnaireAdmin
}

const ContactFormButton: React.FC<ContactFormButtonProps> = ({ contact }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <AdminInterviewerFormModal
        isOpen={isOpen}
        onOpenChange={setOpen}
        contact={contact}
      />
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        <span>Editar</span>
      </Button>
    </>
  )
}

export default ContactFormButton
