import Image from 'next/image'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsGoogle } from 'react-icons/bs'

interface CarouselItemProps {
  notice: App.NoticeProps
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ notice }) => {
  return (
    <div className="bg-white rounded-lg w-96 h-36 p-6 shadow-md select-none mr-auto ml-auto sm:w-full">
      <div className="flex justify-between w-full">
        <div className="flex gap-4">
          <div className="space-y-1">
            <span className="text-sm font-bold">{notice.title}</span>
          </div>
        </div>
      </div>
      <span className="text-xs mr-1">Por:</span>
      <a
        className="mt-4 h-32 text-xs font-semibold overflow-y-auto"
        target="_blank"
        href={notice.url}
      >
        {notice.url}
      </a>
    </div>
  )
}
