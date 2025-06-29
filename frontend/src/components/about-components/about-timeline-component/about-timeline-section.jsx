import React, { useState } from "react";
import { CalendarCheck, ChevronDown, ChevronUp } from "lucide-react";
import { teamMembers, projectTimeline } from "../../../data/our-story-data";

function AboutTimeline() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[var(--color-dark)] py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-[var(--color-white)] tracking-wider md:text-4xl font-bold text-center mb-4">
          Our Story
        </h2>
        <p className="text-[var(--color-white)] opacity-80 text-justify max-w-3xl mx-auto mb-10">
          RISKWISE was born from a university-led initiative to modernize risk
          reporting at Pampanga State University. Recognizing the limitations of
          paper-based systems, our team of students, faculty advisors, and
          developers collaborated to build a digital-first solution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {teamMembers.map(({ name, role, icon: Icon }, index) => (
            <div
              key={index}
              className={`bg-gray-100 p-6 rounded-xl shadow-sm text-center ${
                index === teamMembers.length - 1 ? "md:col-start-2" : ""
              }`}
            >
              <div className="flex justify-center mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold">{name}</h4>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl text-[var(--color-white)] font-semibold mb-6 text-center">
          Project Timeline
        </h3>
        <div className="space-y-4 md:w-[60%] mx-auto">
          {projectTimeline.map((phase, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-l-4 border-[var(--color-highlight)] pl-4 md:pl-6 relative bg-gray-50 rounded-md shadow-sm"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left flex items-center justify-between py-3 px-2"
                >
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-[var(--color-white)]" />
                    <span className="font-semibold text-gray-800">
                      {phase.date} – {phase.title}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {isOpen && (
                  <ul className="list-disc pl-7 pr-4 pb-4 space-y-1 text-sm text-gray-700 transition-all duration-300">
                    {phase.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutTimeline;
