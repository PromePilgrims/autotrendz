import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface QuestionnaireCardFormProps {
  className?: string
  title: string
  description?: string
  children?: ReactNode
}

const QuestionnaireCardForm: React.FC<QuestionnaireCardFormProps> = ({
  title,
  children,
  className,
  description
}) => {
  return (
    <div className={cn('flex flex-col gap-4 rounded-xl border', className)}>
      <div className="sticky -top-4 z-20 bg-background p-4 pb-0 rounded-xl form-block-header">
        <div className="flex flex-col border-b pb-4">
          <span className="text-2xl font-bold">{title}</span>
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-10 p-4">{children}</div>
    </div>
  )
}

export default QuestionnaireCardForm
