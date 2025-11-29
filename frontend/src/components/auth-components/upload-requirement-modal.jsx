import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { uploadRequirement } from "../../services/auth-services";

export default function UploadRequirementModal({
  firebaseUser,
  onClose,
  onUploaded,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    setLoading(true);
    try {
      const token = await firebaseUser.getIdToken();
      const res = await uploadRequirement(file, token);

      if (res.success) {
        toast.success("Requirement uploaded successfully!");
        onUploaded();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/100 backdrop-blur-md p-6 rounded-lg shadow-lg md:w-[90%] md:h-fit h-full flex flex-col justify-center max-w-md border border-white/20">
        <h2 className="text-xl font-bold mb-4">Upload Requirement</h2>
        <p className="text-sm mb-4">
          Please upload your Certificate of Registration (COR) or School ID to
          complete your account setup.
        </p>

        <div className="flex items-center gap-2 border-2 rounded-lg border-[var(--color-dark)] bg-white/20 backdrop-blur-sm px-3 py-2">
          <input
            id="RiskAttachment"
            type="file"
            name="file"
            accept="image/*"
            capture
            className="file:bg-[var(--color-highlight)] file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0
               file:hover:opacity-80 file:cursor-pointer
               text-[var(--color-dark)] text-sm md:text-base
               file:transition file:duration-200"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 bg-[var(--color-highlight)] text-white rounded hover:opacity-80"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
