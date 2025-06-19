import { RiskWiseASA } from "../../../data/riskwise-asa";
import "./about-mission-section.css";

function AboutMission() {
  return (
    <div className="mission-container-main grid md:grid-cols-2 grid-cols-1 gap-y-25 md:py-15 py-10 px-5 bg-[var(--color-dark)] text-[var(--color-white)]">
      <div className="left-container md:w-[80%] w-full mx-auto my-auto md:pl-40">
        <div className="title-container flex flex-col items-center gap-5">
          <h1 className="title-text-main text-[1.65rem] font-black tracking-wider text-center md:text-4xl ">
            OUR MISSION
          </h1>
          <h2 className="mission-statement-text w-full md:w-[85%] md:text-center text-justify tracking-widest">
            At RISKWISE, we believe every campus deserves to be a safe,
            responsive, and well-informed environment.
          </h2>
        </div>
        <div className="subtext-container mt-10 md:mt-20 flex flex-col md:gap-15 gap-5">
          <div className="purpose-text-container flex items-center flex-col gap-3 ">
            <h1 className="title-text-main text-[1.25rem] font-black tracking-wider text-center md:text-2xl ">
              OUR PURPOSE
            </h1>
            <h2 className="mission-statement-text w-full md:w-[70%] md:text-center text-sm text-justify tracking-wider">
              We aim to eliminate delays in hazard detection and reporting by
              offering a seamless, mobile-ready tool that empowers students,
              faculty, and administrators to take action quickly and
              confidently.
            </h2>
          </div>

          <div className="purpose-text-container flex flex-col items-center gap-3 ">
            <h1 className="title-text-main text-[1.25rem] font-black tracking-wider text-center md:text-2xl ">
              OUR COMMITMENT
            </h1>
            <h2 className="mission-statement-text md:text-center w-full md:w-[70%] text-sm text-justify tracking-wider">
              With a strong focus on usability, data security, and system
              reliability, we&apos;re committed to building a culture of safety
              through technology-driven solutions.
            </h2>
          </div>
        </div>
      </div>
      <div className="right-container flex flex-col md:gap-15 gap-10 md:mb-0 mb-10 md:pr-40">
        <div className="title-container-right">
          <h1 className="title-text-main text-[1.65rem] font-black tracking-wider text-center md:text-4xl ">
            OUR VISION
          </h1>
        </div>
        <div className="riskwise-asa-container flex flex-col items-center gap-5">
          {RiskWiseASA.map((ASA, index) => (
            <div
              className="riskwise-asa-item-container flex flex-col gap-3 items-center md:w-[60%] w-[90%] bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-6"
              key={index}
            >
              {ASA.icon}
              <h1 className="title-text-main text-[1.25rem] font-black tracking-widest text-center md:text-2xl ">
                {ASA.title}
              </h1>
              <h2 className="mission-statement-text text-center w-full text-sm tracking-wider">
                {ASA.description}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutMission;
