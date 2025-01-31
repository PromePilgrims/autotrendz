'use client'

import React, { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const data = [
  {
    trigger:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
    content:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
  },
  {
    trigger:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
    content:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
  },
  {
    trigger:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
    content:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
  },
  {
    trigger:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
    content:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
  },
  {
    trigger:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
    content:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
  }
]

export const Faq: React.FC = () => {
  const [accordionItems, setAccordionItems] = useState<string[]>([])

  return (
    <section className="my-24 w-full">
      <h1 className="text-5xl font-extralight mb-6 sm:text-center">
        Dúvidas frequentes
      </h1>
      <Accordion.Root
        className="w-full"
        type="multiple"
        onValueChange={(e) => setAccordionItems(e)}
      >
        {data.map((accordion, index) => {
          return (
            <Accordion.Item
              className="border-b border-b-primary-200"
              key={index}
              value={`item-${index}`}
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex items-center justify-between w-full py-4 text-2xl font-semibold transition-all text-primary-500 hover:text-primary-700">
                  <span>{accordion.trigger}</span>
                  {accordionItems.includes(`item-${index}`) ? (
                    <AiOutlineMinus color="#f05718" size={24} className="w-[60px]" />
                  ) : (
                    <AiOutlinePlus color="#f05718" size={24} className="w-[60px]" />
                  )}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="text-xl pb-4">
                {accordion.content}
              </Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </section>
  )
}
