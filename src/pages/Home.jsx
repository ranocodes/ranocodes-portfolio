import { HomeSchema } from '../components/SEO'
import Hero from '../components/sections/Hero'
import Philosophy from '../components/sections/Philosophy'
import Features from '../components/sections/Features'
import Services from '../components/sections/Services'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import Contact from '../components/sections/Contact'

function Home() {
  return (
    <>
      <HomeSchema />
      <main>
        <Hero />
        <Philosophy />
        <Features />
        <Services />
        <FeaturedProjects />
        <Contact />
      </main>
    </>
  )
}

export default Home
