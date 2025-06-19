import { RiskWiseASA } from "../../../data/riskwise-asa";
import "./about-mission-section.css";

function AboutMission() {
  return (
    <section className="bg-[var(--color-dark)] text-[var(--color-white)] px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Column - Mission, Purpose, Commitment */}
        <div className="flex flex-col gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl text-center font-black tracking-wide mb-4">
              OUR MISSION
            </h1>
            <p className="tracking-wide text-justify md:text-center md:w-[85%] mx-auto">
              At RISKWISE, we believe every campus deserves to be a safe,
              responsive, and well-informed environment.
            </p>
          </div>

          <div className="space-y-10">
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl text-center font-bold mb-2 tracking-wide">
                OUR PURPOSE
              </h2>
              <p className="tracking-wide text-justify md:text-center md:w-[85%] mx-auto text-sm">
                We aim to eliminate delays in hazard detection and reporting by
                offering a seamless, mobile-ready tool that empowers students,
                faculty, and administrators to take action quickly and
                confidently.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl text-center font-bold mb-2 tracking-wide">
                OUR COMMITMENT
              </h2>
              <p className="tracking-wide text-justify md:text-center md:w-[85%] mx-auto text-sm">
                With a strong focus on usability, data security, and system
                reliability, we&apos;re committed to building a culture of
                safety through technology-driven solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Vision & ASA */}
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-wide text-center">
            OUR VISION
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full justify-items-center">
            {RiskWiseASA.map((ASA, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 w-[90%] sm:w-[80%] md:w-[100%] text-center"
              >
                {ASA.icon}
                <h3 className="text-xl font-bold tracking-wider">
                  {ASA.title}
                </h3>
                <p className="text-sm tracking-wide">{ASA.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMission;
