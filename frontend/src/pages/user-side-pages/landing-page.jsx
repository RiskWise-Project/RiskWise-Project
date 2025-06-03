import React from "react";
import HeaderComponent from "../../components/landingpage-components/header-component/header-lp-component";
import HeroSectionComponent from "../../components/landingpage-components/hero-section-components/hero-section-components";
import AboutSectionComponent from "../../components/landingpage-components/about-section-component/about-lp-component";
import FeatureComponent from "../../components/landingpage-components/features-section-component/features-component";
import DownloadComponent from "../../components/landingpage-components/download-section-component/download-component";

function LandingPage() {
  return (
    <div>
      <div className="header-component-container">
        <HeaderComponent />
      </div>
      <div className="hero-component-container">
        <HeroSectionComponent />
      </div>
      <div id="about" className="about-component-container">
        <AboutSectionComponent />
      </div>
      <div id="feature" className="feature-component-container">
        <FeatureComponent />
      </div>
      <div id="download" className="download-component-container">
        <DownloadComponent />
      </div>
    </div>
  );
}

export default LandingPage;
