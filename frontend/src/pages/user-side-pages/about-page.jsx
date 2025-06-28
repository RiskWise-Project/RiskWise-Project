import React, { Suspense, useEffect } from "react";

const AboutFooterComponent = React.lazy(() =>
  import(
    "../../components/about-components/footer-section-component/footer-component"
  )
);
const FutureVisionSection = React.lazy(() =>
  import(
    "../../components/about-components/about-future-component/about-future-section"
  )
);
const AboutHero = React.lazy(() =>
  import(
    "../../components/about-components/about-hero-component/about-hero-section"
  )
);
const AboutMission = React.lazy(() =>
  import(
    "../../components/about-components/about-mission-component/about-mission-section"
  )
);
const AboutTimeline = React.lazy(() =>
  import(
    "../../components/about-components/about-timeline-component/about-timeline-section"
  )
);
const WhyChooseUsSection = React.lazy(() =>
  import(
    "../../components/about-components/about-why-choose-component/about-why-choose-section"
  )
);
const { CircleArrowLeft } = await import("lucide-react");

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-about-container flex flex-col bg-[var(--color-white)]">
      <div className="section">
        <Suspense fallback={null}>
          <AboutHero />
        </Suspense>
      </div>
      <div className="section">
        <Suspense fallback={null}>
          <AboutMission />
        </Suspense>
      </div>
      <div className="section">
        <Suspense fallback={null}>
          <WhyChooseUsSection />
        </Suspense>
      </div>
      <div className="section">
        <Suspense fallback={null}>
          <AboutTimeline />
        </Suspense>
      </div>
      <div className="section">
        <Suspense fallback={null}>
          <FutureVisionSection />
        </Suspense>
      </div>
      <div className="section">
        <Suspense fallback={null}>
          <AboutFooterComponent />
        </Suspense>
      </div>
      <a href="/" className="back-button" aria-label="Go back to homepage">
        <CircleArrowLeft className="absolute cursor-pointer w-7 h-7 md:w-8 md:h-8 md:left-5 md:top-5 left-2 top-2 text-[var(--color-highlight)] hover:opacity-75 transition-all ease-in" />
        <span className="sr-only">Go back to homepage</span>
      </a>
    </div>
  );
}

export default AboutPage;
