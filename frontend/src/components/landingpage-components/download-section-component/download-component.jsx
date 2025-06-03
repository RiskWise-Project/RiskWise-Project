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
    <div>
      {installPromptEvent && (
        <div className="download-component-container flex flex-col items-center py-20 gap-5 px-5">
          <h1 className="font-black md:text-4xl text-3xl tracking-wider mb-10">
            DOWNLOAD
          </h1>
          <p className="text-center md:w-[50%] w-full md:text-xl text-[16px]">
            Available on all major platforms. Get the app and start improving
            safety today.
          </p>
          <button
            className="bg-[var(--color-highlight)] md:px-9 px-6 md:py-2 py-1.5 md:w-fit w-full rounded-md text-[var(--color-white)] md:text-lg text-[17px] hover:cursor-pointer get-started-btn"
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
