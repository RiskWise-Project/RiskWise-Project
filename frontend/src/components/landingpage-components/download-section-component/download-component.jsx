import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function DownloadComponent() {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const { t } = useTranslation();

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

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        console.log(choiceResult.outcome);
        setInstallPromptEvent(null);
      });
    }
  };

  return (
    <div className="w-full  ">
      {installPromptEvent && (
        <div className="download-component-container flex flex-col items-center py-20 gap-5">
          <h1 className="font-black text-3xl md:text-4xl tracking-wider mb-10 md:mb-5 text-center">
            {t("DownloadSectionLP.download_title")}
          </h1>
          <p className="text-center w-full max-w-md text-[16px] md:text-xl">
            {t("DownloadSectionLP.download_subtext")}
          </p>
          <button
            className="bg-[var(--color-highlight)] text-[var(--color-white)] text-[17px] md:text-lg px-4 py-2 w-full max-w-xs rounded-md hover:cursor-pointer get-started-btn"
            onClick={handleInstallClick}
          >
            {t("DownloadSectionLP.download_button")}
          </button>
        </div>
      )}
    </div>
  );
}

export default DownloadComponent;
