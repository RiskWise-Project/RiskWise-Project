import { BrainCircuit, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

function FutureVisionSection() {
  const { t } = useTranslation();

  const comingItems = t("FutureVisionAP.coming_items", { returnObjects: true });
  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-dark)] tracking-tight mb-4">
          {t("FutureVisionAP.section_title")}
        </h2>
        <p className="text-lg text-[var(--color-dark)] opacity-30 max-w-2xl mx-auto">
          {t("FutureVisionAP.section_text")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-16">
        <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition duration-300">
          <div className="flex items-center gap-3 mb-4">
            <BrainCircuit className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-[#152b3f]">
              {t("FutureVisionAP.ai_title")}
            </h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {t("FutureVisionAP.ai_text")}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-6 h-6 text-rose-600" />
            <h3 className="text-xl font-semibold text-[#152b3f]">
              {t("FutureVisionAP.coming_title")}
            </h3>
          </div>
          {Array.isArray(comingItems) && (
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-2 pl-1">
              {comingItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default FutureVisionSection;
