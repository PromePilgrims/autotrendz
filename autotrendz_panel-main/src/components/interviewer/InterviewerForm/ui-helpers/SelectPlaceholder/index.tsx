import React from 'react'

interface SelectPlaceholderProps {
  title: string
  description?: string
}

const SelectPlaceholder: React.FC<SelectPlaceholderProps> = ({
  title,
  description
}) => {
  return (
    <div className="flex flex-col items-start">
      <span>{title}</span>
      {description && (
        <span className="text-xs text-muted-foreground">{description}</span>
      )}
    </div>
  )
}

export default SelectPlaceholder
