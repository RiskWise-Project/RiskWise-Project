import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

function WhyChooseUsSection() {
  const { t } = useTranslation();
  const items = t("WhyChooseAP.items", { returnObjects: true });

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 ">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-dark)] mb-4">
          {t("WhyChooseAP.title")}
        </h2>
        <p className="text-lg text-[var(--color-dark)] opacity-30 md:w-[60%] mb-10">
          {t("WhyChooseAP.text")}
        </p>

        <ul className="w-full grid sm:grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {Array.isArray(items) &&
            items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <CheckCircle className="w-6 h-6 text-[var(--color-highlight)] mt-1" />
                <span className="text-base text-gray-800">{item}</span>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
