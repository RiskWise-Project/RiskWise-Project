import React from "react";
import HeaderComponent from "../../components/landingpage-components/header-component/header-lp-component";
import HeroSectionComponent from "../../components/landingpage-components/hero-section-components/hero-section-components";
import AboutSectionComponent from "../../components/landingpage-components/about-section-component/about-lp-component";
import FeatureComponent from "../../components/landingpage-components/features-section-component/features-component";
import DownloadComponent from "../../components/landingpage-components/download-section-component/download-component";
import ContactSection from "../../components/landingpage-components/contact-section-component/contact-component";
import FooterComponent from "../../components/landingpage-components/footer-section-component/footer-component";

function LandingPage() {
  return (
    <div className="bg-[var(--color-white)]">
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
      <div id="contact" className="contact-component-container">
        <ContactSection />
      </div>
      <div className="footer-component-container">
        <FooterComponent />
      </div>
    </div>
  );
}

export default LandingPage;
