import heroImageAbout from "../../../assets/resources/about-hero-image.webp";
import "./about-hero-section.css";

function AboutHero() {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <div className="w-full h-[50vh]">
        <img
          src={heroImageAbout}
          alt="About Hero Banner"
          className="w-full h-full object-cover hero-banner-image"
          loading="eager"
        />
      </div>

      <div className="h-[50vh] flex flex-col items-center text-container-heading justify-center text-center px-4 gap-6">
        <h1 className="text-[1.65rem] md:text-5xl font-black tracking-wider text-[var(--color-highlight)] leading-tight">
          PROACTIVE RISK MANAGEMENT STARTS HERE
        </h1>
        <h2 className="text-[1.125rem] md:text-2xl text-justify md:text-center max-w-2xl">
          Empowering the Pampanga State University community to identify,
          report, and respond to campus risks anytime, anywhere.
        </h2>
      </div>
    </section>
  );
}

export default AboutHero;
