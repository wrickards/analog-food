import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import StorySection from '@/components/StorySection'
import DangerSection from '@/components/DangerSection'
import IngredientDecoder from '@/components/IngredientDecoder'
import FindCleanFood from '@/components/FindCleanFood'
import BenefitsSection from '@/components/BenefitsSection'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <StorySection />
      <DangerSection />
      <IngredientDecoder />
      <FindCleanFood />
      <BenefitsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
