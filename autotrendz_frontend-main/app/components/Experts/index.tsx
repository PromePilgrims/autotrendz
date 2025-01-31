import React from 'react'
import { AnimatedText } from '../AnimatedText'
import Image from 'next/image'

export const Experts: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center gap-6 text-center">
      <h1 className="text-5xl font-extralight text-center">Quem somos</h1>
      <span className="w-[700px] text-center md:w-[100%]">
        A AutoTrendz nasceu para ser a referência em serviços de pesquisas de preços:
        ágil, independente, moderna e precisa. Nosso foco em pesquisas de preços
        garante a utilização dos métodos e ferramentas mais modernos e eficientes
        para oferecer aos nossos clientes a confiabilidade necessária para tomar
        decisões gerenciais de alto impacto, com a segurança necessária.
      </span>
      <span className="w-[700px] text-center md:w-[100%]">
        O fundador da AutoTrendz tem 22 anos de experiência na indústria
        automobilística, com passagens por grandes empresas nacionais e
        multinacionais, de atacado e varejo, sempre focado em pesquisa de mercado,
        estratégia de marketing e precificação de peças, lubrificantes e pneus.
      </span>
      <span className="w-[700px] text-center md:w-[100%]">
        A AutoTrendz entende suas necessidades e fala a sua língua. Entre em contato
        para agendarmos uma visita, ou para solicitar um projeto sob medida para sua
        empresa.
      </span>
      <h1 className="text-5xl font-extralight text-center mt-16">
        Metodologias utilizadas
      </h1>
      <div className="w-full flex items-center mt-8 justify-between gap-4 xl:grid xl:grid-cols-2 xl:gap-8 sm:grid-cols-1">
        <div className="flex flex-col space-y-3 items-center text-center">
          <span className="font-bold">“MISTERY SHOPPING” POR TELEFONE</span>
          <p className="text-center w-[240px]">
            Pesquisa que simula uma compra real e pode coletar informações sobre
            preços praticados, disponibilidade, condições de pagamento e entrega.
          </p>
        </div>
        <div className="flex flex-col space-y-3 items-center text-center">
          <span className="font-bold">“MISTERY SHOPPING” PRESENCIAL </span>
          <p className="text-center w-[240px]">
            Simula também uma compra real, mas pode fornecer informações mais
            precisas sobre as condições de venda, além de proporcionar a oportunidade
            de coletar materiais dos locais pesquisados.
          </p>
        </div>
        <div className="flex flex-col space-y-3 items-center text-center">
          <span className="font-bold">IN LOCO</span>
          <p className="text-center w-[240px]">
            Revelando a identidade da AutoTrendz, mas mantendo sigilo sobre o nome do
            cliente. Utilizada com frequência para coletar grandes quantidades de
            dados simultaneamente e/ou obter dados de preços de compra (atacado).
          </p>
        </div>
      </div>
    </section>
  )
}
