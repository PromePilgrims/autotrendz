import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CaretRightIcon } from '@radix-ui/react-icons'
import React from 'react'

interface InterviewerCardProps {
  title: string
  description?: string
}

const InterviewerCard: React.FC<InterviewerCardProps> = ({ title, description }) => {
  return (
    <Card className="border-l-4 shadow-none group hover:border-brand select-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardFooter className="flex justify-end">
        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-brand group-hover:text-brand-foreground">
          <CaretRightIcon className="w-5 h-5" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default InterviewerCard
