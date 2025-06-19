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
      className={`contact-component-main-container grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-10 px-5 py-10 ${
        installPromptEvent ? "bg-[var(--color-dark)]" : "bg-white"
      }`}
    >
      <h1
        className={`font-black text-3xl md:text-4xl col-span-full text-center tracking-wider mb-6 ${
          installPromptEvent ? "text-white" : "text-[var(--color-dark)]"
        }`}
      >
        Contact
      </h1>

      <div className="order-2 lg:order-1 flex flex-col justify-center md:px-10 px-5">
        <h2
          className={`text-2xl md:text-3xl font-bold mb-4 ${
            installPromptEvent ? "text-white" : "text-[var(--color-dark)]"
          }`}
        >
          Contact Details
        </h2>
        <a
          href="mailto:riskwise.project@gmail.com"
          className={`flex items-center gap-3 mb-4 text-lg ${
            installPromptEvent ? "text-white" : "text-[var(--color-dark)]"
          }`}
        >
          <Mail /> riskwise.project@gmail.com
        </a>
        <a
          href="tel:+639123456789"
          className={`flex items-center gap-3 text-lg ${
            installPromptEvent ? "text-white" : "text-[var(--color-dark)]"
          }`}
        >
          <Phone /> (+63) 912-345-6789
        </a>
      </div>

      {/* 📝 Form – Right on Desktop, Top on Mobile */}
      <div className="order-1 lg:order-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              className={`text-lg font-medium ${
                installPromptEvent ? "text-white" : "text-[var(--color-dark)]"
              }`}
            >
              Email:
            </label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border-2 rounded-lg px-3 py-2 text-lg outline-none ${
                installPromptEvent
                  ? "border-white bg-transparent text-white"
                  : "border-[var(--color-dark)] text-[var(--color-dark)]"
              }`}
            />
          </div>

          <div className="flex flex-col">
            <label
              className={`text-lg font-medium ${
                installPromptEvent ? "text-white" : "text-[var(--color-dark)]"
              }`}
            >
              Concern:
            </label>
            <textarea
              placeholder="Enter your concern here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`border-2 rounded-lg px-3 py-2 text-lg outline-none min-h-[120px] ${
                installPromptEvent
                  ? "border-white bg-transparent text-white"
                  : "border-[var(--color-dark)] text-[var(--color-dark)]"
              }`}
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--color-highlight)] text-white px-5 py-3 rounded-lg text-lg hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactSection;
