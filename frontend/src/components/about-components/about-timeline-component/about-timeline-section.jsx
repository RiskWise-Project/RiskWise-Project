import React, { useState } from "react";
import { CalendarCheck, ChevronDown, ChevronUp } from "lucide-react";
import { teamMembers } from "../../../data/our-story-data";
import { useTranslation } from "react-i18next";

const projectTimelineKeys = [
  "PLANNING_SETUP",
  "AUTH_PWA_BASE",
  "RISK_REPORTING",
  "ADMIN_DASHBOARD",
  "AI_SCORING",
  "ANALYTICS_QA",
];

function AboutTimeline() {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[var(--color-dark)] py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-[var(--color-white)] tracking-wider md:text-4xl font-bold text-center mb-4">
          {t("TimelineAP.timeline_title")}
        </h2>
        <p className="text-[var(--color-white)] opacity-80 text-justify max-w-3xl mx-auto mb-10">
          {t("TimelineAP.timeline_text")}
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
          {t("TimelineAP.project_timeline_title")}
        </h3>
        <div className="space-y-4 md:w-[60%] mx-auto">
          {projectTimelineKeys.map((key, index) => {
            const isOpen = openIndex === index;
            const title = t(`Timeline_Data_AP.${key}.title`);
            const date = t(`Timeline_Data_AP.${key}.date`);
            const items = t(`Timeline_Data_AP.${key}.items`, {
              returnObjects: true,
            });

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
                    <CalendarCheck className="w-5 h-5 text-[var(--color-accent)]" />
                    <span className="font-semibold text-gray-800">
                      {date} – {title}
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
                    {items.map((item, i) => (
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
