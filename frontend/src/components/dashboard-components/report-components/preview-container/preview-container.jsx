import React, { useEffect, useState } from "react";
import "./preview-container.css";

function PreviewContainer({ fileName, address, description, fileNametoPass }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    let url;
    if (fileNametoPass instanceof File) {
      url = URL.createObjectURL(fileNametoPass);
      setPreviewUrl(url);
    } else if (typeof fileNametoPass === "string") {
      setPreviewUrl(fileNametoPass); // already a URL or path
    }

    return () => {
      if (url) URL.revokeObjectURL(url); // cleanup
    };
  }, [fileNametoPass]);

  return (
    <div className="container-main w-[70%] h-fit m-auto bg-[var(--color-white)] rounded-2xl p-6 flex flex-col gap-6 shadow-md">
      {/* Header */}
      <div className="form-header-container mb-4">
        <h1 className="md:text-2xl text-xl font-black tracking-wide text-[var(--color-dark)]">
          Report Preview
        </h1>
        <p className="md:text-sm text-xs opacity-70 text-[var(--color-dark)]">
          Please review your report details before submission.
        </p>
      </div>

      {/* Preview Image */}
      {previewUrl ? (
        <div className="w-full flex flex-col items-center gap-2">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="max-h-64 object-contain rounded-lg border border-gray-200 shadow-sm"
          />
          <span className="text-[var(--color-dark)] opacity-80">
            {fileName instanceof File ? fileName.name : fileName}
          </span>
        </div>
      ) : (
        <div className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
          No image uploaded
        </div>
      )}

      {/* Report Details */}
      <div className="flex flex-col w-full m-auto gap-3 text-[var(--color-dark)]">
        <div className="flex flex-row justify-between">
          <span className="font-semibold">Address</span>
          <span className="opacity-80">{address || "Not provided"}</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="font-semibold">Description</span>
          <span className="opacity-80">{description || "Not provided"}</span>
        </div>
      </div>
    </div>
  );
}

export default PreviewContainer;
