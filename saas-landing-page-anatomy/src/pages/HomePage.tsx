import HeroSection from '../components/HeroSection';
import ArchitectureExplorer from '../components/ArchitectureExplorer';
import PillarsSection from '../components/PillarsSection';
import PricingSection from '../components/PricingSection';
import ChangelogSection from '../components/ChangelogSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ArchitectureExplorer />
      <PillarsSection />
      <PricingSection />
      <ChangelogSection />
    </>
  );
}
