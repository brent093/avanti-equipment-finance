import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
