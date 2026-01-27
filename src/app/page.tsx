import Hero from '@/components/sections/Hero'
import Categories from '@/components/sections/Categories'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import HowItWorks from '@/components/sections/HowItWorks'
import TrustBadges from '@/components/sections/TrustBadges'
import Newsletter from '@/components/sections/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <TrustBadges />
      <Newsletter />
    </>
  )
}
