import heroImageAbout from "../../../assets/resources/about-hero-image.webp";
import "./about-hero-section.css";

function AboutHero() {
  return (
    <div className="main-hero-about-container flex flex-col gap-2">
      <img
        src={heroImageAbout}
        alt="About Hero Image"
        className="md:h-90 h-100 hero-banner-image"
      />

      <div className="flex flex-col items-center gap-3.5 md:gap-13 px-2 py-50 md:py-45 text-container-heading">
        <h1 className="text-[1.65rem] font-black text-center tracking-wider leading-7.5 md:text-5xl text-[var(--color-highlight)]">
          PROACTIVE RISK MANAGEMENT STARTS HERE
        </h1>
        <h2 className="text-[1.125rem] text-justify md:text-2xl w-full md:w-[50%] md:text-center">
          Empowering the Don Honorio Ventura State University community to
          identify, report, and respond to campus risks anytime, anywhere.
        </h2>
      </div>
    </div>
  );
}

export default AboutHero;
