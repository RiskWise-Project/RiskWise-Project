import React from "react";
import "./preview-container.css";

function PreviewContainer() {
  return (
    <div className="container-main w-full h-fit bg-[var(--color-white)] rounded-lg p-6 flex flex-col gap-7">
      <div className="form-header-container">
        <h1 className="md:text-xl text-lg font-black tracking-wide text-[var(--color-dark)]">
          Report Preview
        </h1>
        <p className="md:text-sm text-xs opacity-60 text-[var(--color-dark)] md:w-[50%] text-justify">
          This is only the preview of your report to check if everything is
          correct.
        </p>
      </div>
    </div>
  );
}

export default PreviewContainer;
