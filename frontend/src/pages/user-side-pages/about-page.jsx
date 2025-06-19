import AboutHero from "../../components/about-components/about-hero-component/about-hero-section";
import AboutMission from "../../components/about-components/about-mission-component/about-mission-section";
import { CircleArrowLeft } from "lucide-react";
import { useEffect } from "react";

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-about-container flex flex-col">
      <div className="section">
        <AboutHero />
      </div>
      <div className="section">
        <AboutMission />
      </div>
      <a href="/" className="back-button" aria-label="Go back to homepage">
        <CircleArrowLeft className="absolute cursor-pointer w-7 h-7 md:w-8 md:h-8 md:left-5 md:top-5 left-2 top-2 text-[var(--color-white)] hover:opacity-75 transition-all ease-in" />
      </a>
    </div>
  );
}

export default AboutPage;
