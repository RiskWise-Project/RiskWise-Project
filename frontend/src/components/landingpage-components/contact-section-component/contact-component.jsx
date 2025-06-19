import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import { SendConcern } from "../../../services/concern-services";
import { toast } from "react-hot-toast";

function ContactSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      toast.error("Please fill in both email and concern.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await SendConcern({ email, message });
      toast.success("Concern submitted successfully!");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to submit concern. Please try again.");
    }
  };

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
      className={`contact-component-main-container grid grid-cols-1 md:grid-cols-2 md:gap-x-2 ${
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
      <div className="left-side md:px-10 px-5 md:row-start-2 md:ml-55 md:py-25 py-0 row-start-3">
        <h1
          className={`font-black md:text-4xl text-3xl tracking-wider md:mb-15 text-center md:text-left mb-5 ${
            installPromptEvent ? "text-[var(--color-white)]" : ""
          }`}
        >
          Contact Details
        </h1>

        <a
          className={`font-medium md:text-2xl tracking-wider md:mb-3 mb-5 flex items-center md:gap-5 gap-2 ${
            installPromptEvent ? "text-[var(--color-white)]" : ""
          }`}
          href="mailto:riskwise.project@gmail.com"
        >
          <Mail /> riskwise.project@gmail.com
        </a>

        <a
          className={`font-medium md:text-2xl tracking-wider md:mb-5 mb-10 flex items-center md:gap-5 gap-2 ${
            installPromptEvent ? "text-[var(--color-white)]" : ""
          }`}
          href="tel:+639123456789"
        >
          <Phone /> (+63) 912-345-6789
        </a>
      </div>

      <div
        className={`right-side px-5 md:row-start-2 row-start-2 md:w-[70%] md:mb-0 mb-15 md:py-14 py-0 text-white ${
          installPromptEvent ? "" : "text-[var(--color-white)]"
        }`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor=""
              className={`font-[var(--text-font)] text-lg ${
                installPromptEvent
                  ? "text-[var(--color-white)]"
                  : "text-[var(--color-dark)]"
              }`}
            >
              Email:
            </label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${
                installPromptEvent
                  ? "border-[var(--color-white)]"
                  : "border-[var(--color-dark)] text-[var(--color-dark)]"
              } border-2 rounded-lg px-2 py-1 text-lg outline-none`}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor=""
              className={`font-[var(--text-font)] text-lg ${
                installPromptEvent
                  ? "text-[var(--color-white)]"
                  : "text-[var(--color-dark)]"
              }`}
            >
              Concern:
            </label>
            <textarea
              placeholder="Enter your concern here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${
                installPromptEvent
                  ? "border-[var(--color-white)]"
                  : "border-[var(--color-dark)] text-[var(--color-dark)]"
              } border-2 rounded-lg px-2 py-1 text-lg max-h-35 min-h-15 outline-none`}
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--color-highlight)] text-[var(--color-white)] text-[17px] md:text-lg px-4 py-2 w-full md:max-w-xs rounded-md hover:cursor-pointer get-started-btn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactSection;
