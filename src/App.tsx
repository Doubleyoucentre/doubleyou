import { Suspense, lazy } from "react";
import Footer from "./sections/Footer";
import SEO from "./components/SEO";
import Navbar from "./sections/NavBar";
import BloodDrivePopup from "./components/BloodDrivePopup";
import HallOfFameSection from './features/hall-of-fame/HallOfFameSection';

// Eagerly loaded (above fold)
const Hero = lazy(() => import("./sections/Hero"));

// Lazy loaded (below fold)
const AboutUs = lazy(() => import("./sections/AboutUs"));
const FourPillars = lazy(() => import("./sections/FourPillars"));
const CoreSolutions = lazy(() => import("./sections/CoreSolutions"));
const FellowshipProgram = lazy(() => import("./sections/FellowshipProgram"));
const BloodDriveSection = lazy(() => import("./sections/BloodDriveSection"));
const GlobalAlignment = lazy(() => import("./sections/GlobalAlignment"));
const OurHub = lazy(() => import("./sections/OurHub"));
const CoreValues = lazy(() => import("./sections/CoreValue"));
const PreviousProjects = lazy(() => import("./sections/PreviousProject"));
const PartnerSection = lazy(() => import("./sections/PartnerSection"));
const GiveSection = lazy(() => import("./sections/GiveSection"));
const FinalCTA = lazy(() => import("./sections/FinalCTA"));

const Loading = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-8 h-8 border-2 border-[#F7C928] border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <>
      <BloodDrivePopup />
      <SEO
        title="Doubleyou — Advancing Human Potential Across Africa"
        description="Doubleyou is a mission-driven institution building systems that expand access to knowledge, empower young people, and create pathways to opportunity through education, innovation, and community impact."
        url="/"
        image="/hero.png"
        keywords={[
          "Doubleyou",
          "Human Capital Development",
          "Africa Education",
          "Edtech",
          "Quest",
          "Labari Books",
          "Campus Impact Fellows",
          "Blood Drive",
          "Innovation Ecosystem",
          "Covenant University",
          "SDGs",
        ]}
      />
      <Navbar />

      <main id="home">
        <Suspense fallback={<Loading />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <AboutUs />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <FourPillars />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <CoreSolutions />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <FellowshipProgram />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <BloodDriveSection />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <GlobalAlignment />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <OurHub />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <CoreValues />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <PreviousProjects />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <PartnerSection />
        </Suspense>

        <HallOfFameSection />

        <Suspense fallback={<Loading />}>
          <GiveSection />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <FinalCTA />
        </Suspense>

        <Footer />
      </main>
    </>
  );
}

export default App;
