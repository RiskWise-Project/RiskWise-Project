import { motion } from "framer-motion";
import HeaderComponent from "../../components/landingpage-components/header-component/header-lp-component";
import HeroSectionComponent from "../../components/landingpage-components/hero-section-components/hero-section-components";
import AboutSectionComponent from "../../components/landingpage-components/about-section-component/about-lp-component";
import FeatureComponent from "../../components/landingpage-components/features-section-component/features-component";
import DownloadComponent from "../../components/landingpage-components/download-section-component/download-component";
import ContactSection from "../../components/landingpage-components/contact-section-component/contact-component";
import FooterComponent from "../../components/landingpage-components/footer-section-component/footer-component";

function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
}

export default LandingPage;
