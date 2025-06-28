import { CheckCircle } from "lucide-react";
import { ListItems } from "../../../data/list-item-why-choose";

function WhyChooseUsSection() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 ">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-dark)] mb-4">
          Why Choose Us
        </h2>
        <p className="text-lg text-[var(--color-dark)] opacity-30 md:w-[60%] mb-10">
          Built using Progressive Web App technology for reliability, speed, and
          cross-device compatibility.
        </p>

        <ul className="w-full grid sm:grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {ListItems.map((item, index) => (
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
