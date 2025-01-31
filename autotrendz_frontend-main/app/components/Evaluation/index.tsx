'use client'

import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { CarouselItem } from '../CarouselItem'
import './style.css'

const data: App.NoticeProps[] = [
  {
    id: 1,
    title: 'Grandes fornecedores redobram foco na reposição',
    url: 'https://www.automotivebusiness.com.br/pt/'
  },
  {
    id: 2,
    title: 'Renavam aponta agosto com o melhor resultado desde dezembro de 2015',
    url: 'https://www.noticiasautomotivas.com.br'
  },
  {
    id: 3,
    title: 'Anfavea revê previsão para produção de veículos de alta de 3,7%',
    url: 'https://www.correiobraziliense.com.br/'
  },
  {
    id: 4,
    title: 'Impacto do Biodiesel nos lubrificantes',
    url: 'https://www.portallubes.com.br'
  },
  {
    id: 5,
    title:
      'Produção de Pneus sobe 2,6% no primeiro semestre, mas vendas recuam 0,8% aponta ANIP',
    url: 'https://www.transportepress.com'
  },
  {
    id: 6,
    title: 'Megale fala sobre objetivos da Rota 2030',
    url: 'https://automotivebusiness.com.br/pt/'
  }
]

export const Evaluation: React.FC = () => {
  const responsive = {
    breakpointOne: {
      breakpoint: { max: 3000, min: 1790 },
      items: 3,
      slidesToSlide: 1
    },
    breakpointTwo: {
      breakpoint: { max: 1789, min: 1535 },
      items: 2,
      slidesToSlide: 1
    },
    breakpointThree: {
      breakpoint: { max: 1534, min: 1305 },
      items: 3,
      slidesToSlide: 1
    },
    breakpointFour: {
      breakpoint: { max: 1304, min: 930 },
      items: 2,
      slidesToSlide: 1
    },
    breakpointFive: {
      breakpoint: { max: 929, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  }

  return (
    <section className="flex flex-col items-center w-full py-16 mb-12">
      <h1 className="text-5xl font-extralight my-6 text-center">Últimas notícias</h1>
      <div className="w-full flex justify-center items-center sm:-ml-14">
        <Carousel
          containerClass="carousel-container"
          showDots
          infinite
          arrows={false}
          responsive={responsive}
        >
          {data.map((n) => {
            return <CarouselItem notice={n} key={n.id} />
          })}
        </Carousel>
      </div>
    </section>
  )
}
