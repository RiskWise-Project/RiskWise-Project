import { useState, useEffect } from "react";

function DownloadComponent() {
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
            DOWNLOAD
          </h1>
          <p className="text-center w-full max-w-md text-[16px] md:text-xl">
            Available on all major platforms. Get the app and start improving
            safety today.
          </p>
          <button
            className="bg-[var(--color-highlight)] text-[var(--color-white)] text-[17px] md:text-lg px-4 py-2 w-full max-w-xs rounded-md hover:cursor-pointer get-started-btn"
            onClick={handleInstallClick}
          >
            Install App
          </button>
        </div>
      )}
    </div>
  );
}

export default DownloadComponent;
