import React from 'react'

const ConditionFormInfo: React.FC = () => {
  return (
    <div className="flex flex-col p-5 gap-6 rounded-xl bg-brand text-brand-foreground">
      <div className="flex items-center">
        <span className="text-2xl font-heading font-bold">
          Condições gerais para participação do entrevistado
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {[
          {
            text: 'Ser habilitado e conduzir uma motocicleta'
          },
          {
            text: 'Ter à sua disposição de forma permanente, ou quase permanente, uma motocicleta'
          },
          {
            text: 'Ser o responsável total ou parcialmente pela manutenção da motocicleta'
          },
          {
            text: 'Ser capaz de responder sobre as questões aqui formuladas referentes a manutenção de sua motocicleta nos últimos 12 meses'
          }
        ].map((text, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full text-brand font-bold bg-brand-foreground shrink-0 flex items-center justify-center">
              {index + 1}
            </div>
            <span className="text-sm font-heading">{text.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConditionFormInfo
