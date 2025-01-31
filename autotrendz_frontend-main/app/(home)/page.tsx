import Image from 'next/image'
import { Banner } from '../components/Banner'
// import { Companies } from '../components/Companies'
import { Experts } from '../components/Experts'
// import { MoreCustomers } from '../components/MoreCustomers'
import { IncreaseYourSales } from '../components/IncreaseYourSales'
import { Visibility } from '../components/Visibility'
// import { Certificates } from '../components/Certificates'
import { Evaluation } from '../components/Evaluation'
import { Contact } from '../components/Contact'
import { Faq } from '../components/Faq'

import { ReCaptchaProvider } from 'next-recaptcha-v3'

export default function Home() {
  return (
    <main className="w-2/3 flex flex-col items-center overflow-x-hidden text-zinc-600 2xl:w-[90%]">
      <Image
        width={1500}
        height={1000}
        src="/assets/banner/background.png"
        alt="banner"
        className="absolute -top-4"
      />
      <Banner />
      {/* <Companies /> */}
      <Experts />
      {/* <MoreCustomers /> */}
      <IncreaseYourSales />
      <Visibility />
      {/* <Certificates /> */}
      <Evaluation />
      <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        <Contact />
      </ReCaptchaProvider>
      <Faq />
    </main>
  )
}
