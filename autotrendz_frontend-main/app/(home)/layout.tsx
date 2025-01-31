import '../globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
