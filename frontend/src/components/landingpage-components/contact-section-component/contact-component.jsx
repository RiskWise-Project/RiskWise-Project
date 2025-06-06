import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";

function ContactSection() {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <div
      className={`contact-component-main-container grid grid-cols-1 md:grid-cols-2 gap-x-2 ${
        installPromptEvent ? "bg-[var(--color-dark)]" : "bg-white"
      }`}
    >
      <h1
        className={`font-black md:text-4xl text-3xl col-span-2 text-center py-15 pb-5 tracking-wider md:mb-5 mb-0 ${
          installPromptEvent ? "text-[var(--color-white)]" : ""
        }`}
      >
        Contact
      </h1>
      <div className="left-side md:px-10 px-5 md:row-start-2 md:py-30 py-0 row-start-3">
        <h1
          className={`font-black md:text-4xl text-3xl tracking-wider md:mb-15 mb-10 ${
            installPromptEvent ? "text-[var(--color-white)]" : ""
          }`}
        >
          Contact Details
        </h1>

        <h2
          className={`font-medium md:text-2xl text-xl tracking-wider md:mb-3 mb-5 flex items-center gap-5 ${
            installPromptEvent ? "text-[var(--color-white)]" : ""
          }`}
        >
          <Mail /> riskwise.project@gmail.com
        </h2>

        <h2
          className={`font-medium md:text-2xl text-xl tracking-wider md:mb-5 mb-10 flex items-center gap-5 ${
            installPromptEvent ? "text-[var(--color-white)]" : ""
          }`}
        >
          <Phone /> (+63) 912-345-6789
        </h2>
      </div>

      <div className="right-side px-5 md:row-start-2 row-start-2 md:w-[70%] md:mb-0 mb-25 md:py-14 py-0 text-white">
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="" className="font-[var(--text-font)] text-lg ">
              Email:
            </label>
            <input
              type="text"
              placeholder="johndoe@example.com"
              className={`${
                installPromptEvent
                  ? "border-[var(--color-white)]"
                  : "border-[var(--color-dark)] bg-gray-100"
              } border-2 rounded-lg px-2 py-1 text-lg outline-none`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-[var(--text-font)] text-lg ">
              Concern:
            </label>
            <textarea
              placeholder="Enter your concern here..."
              className={`${
                installPromptEvent
                  ? "border-[var(--color-white)]"
                  : "border-[var(--color-dark)] bg-gray-100"
              } border-2 rounded-lg px-2 py-1 text-lg max-h-35 min-h-15 outline-none`}
            />
          </div>

          <button className="bg-[var(--color-highlight)] text-[var(--color-white)] text-[17px] md:text-lg px-4 py-2 w-full md:max-w-xs rounded-md hover:cursor-pointer get-started-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactSection;
