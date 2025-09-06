import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  fetchAddress,
  handleMapClick,
} from "../../../services/report services/report-form-functions";
import {
  analyzeImageService,
  summarizeReportService,
} from "../../../services/image-services";
import { getCurrentUserAsync } from "../../../utils/auth";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { dhvsuCoords } from "../../../services/report services/report-form-functions";
import "./report-form-container.css";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

function ReportFormContainer({
  fileName,
  setFileName,
  setFileNametoPass,
  fileNametoPass,
  location,
  setLocation,
  address,
  setAddress,
  loading,
  setLoading,
  additionalInfo,
  setAdditionalInfo,
  analysis,
  setAnalysis,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });
  const { t } = useTranslation();

  const handleAnalyze = async () => {
    if (!fileNametoPass) {
      console.warn("No file Base64 string available");
      return;
    }
    if (!additionalInfo || !address) {
      console.warn("Missing additional info or address");
      return;
    }

    setLoading(true);

    try {
      const user = await getCurrentUserAsync(); // await the actual user
      if (!user) throw new Error("User not logged in");

      const payload = {
        fileNametoPass: fileNametoPass, // actual Base64 string
        description: additionalInfo, // your description
        location,
        address,
        additionalInfo,
        userId: user?.uid,
        uniqueId: Date.now().toString(),
        summary: analysis || "",
      };

      const result = await summarizeReportService(payload);

      setAnalysis(result.summary || "");
      setFileName("");
      setFileNametoPass("");
      setAdditionalInfo("");
      setAddress("PamSU Bacolor, Pampanga");
      setLocation(dhvsuCoords); // reset to default
      toast.success("Report submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onMapClick = (e) => {
    handleMapClick(e, setLocation, (lat, lng) =>
      fetchAddress(lat, lng, apiKey, setAddress)
    );
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setLoading(true);

      const result = await analyzeImageService(file);

      setAnalysis(result);

      const base64String = await convertToBase64(file);
      setFileNametoPass(base64String);

      setLoading(false);
    }
  };

  return (
    <div className="form-container-main w-full h-fit bg-[var(--color-white)] rounded-lg p-6 flex flex-col gap-7">
      <div className="form-header-container">
        <h1 className="md:text-xl text-lg font-black tracking-wide text-[var(--color-dark)]">
          {t("ReportFormContainer.submit_report")}
        </h1>
        <p className="md:text-sm text-xs opacity-60 text-[var(--color-dark)] md:w-[50%] text-justify">
          {t("ReportFormContainer.fill_form_instruction")}
        </p>
      </div>

      <div className="form-container flex flex-col">
        <div className="w-full">
          <label
            htmlFor="RiskAttachment"
            className="block font-semibold mb-2 md:text-base text-sm"
          >
            {t("ReportFormContainer.upload_photo")}
          </label>
          <div className="flex items-center gap-2 border-2 rounded-lg border-[var(--color-dark)]">
            <label
              htmlFor="RiskAttachment"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer md:text-base text-sm"
            >
              {t("ReportFormContainer.choose_file")}
            </label>
            <span className="text-[var(--color-dark)] opacity-60 md:text-base text-sm">
              {fileName || t("ReportFormContainer.no_file_chosen")}
            </span>
          </div>
          <input
            id="RiskAttachment"
            type="file"
            name="file"
            accept="image/*"
            capture
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="w-full flex flex-col gap-5">
            <div className="location-container">
              <label>{t("ReportFormContainer.location_label")}</label>
              <input
                type="text"
                value={address}
                readOnly
                className="border-2 rounded-lg px-4 py-2 border-[var(--color-dark)] w-full md:text-base text-sm focus:outline-0"
              />
            </div>

            <div className="additional-content-container flex flex-col">
              <label>{t("ReportFormContainer.additional_info")}</label>
              <textarea
                className="border-2 rounded-lg px-4 py-2 border-[var(--color-dark)] min-h-15 h-50 max-h-100 md:text-base text-sm focus:outline-0"
                placeholder={t(
                  "ReportFormContainer.additional_info_placeholder"
                )}
                value={additionalInfo} // bind to state
                onChange={(e) => setAdditionalInfo(e.target.value)} // update state on change
              />
            </div>
          </div>

          <div className="map-container md:block block rounded-lg overflow-hidden border-2 border-[var(--color-dark)] shadow-sm mt-5 md:mt-5">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "300px",
                }}
                center={location}
                zoom={17}
                onClick={onMapClick}
              >
                <Marker position={location} />
              </GoogleMap>
            ) : (
              <p className="text-sm text-center py-4 text-[var(--color-dark)] opacity-60">
                {t("ReportFormContainer.loading_map")}
              </p>
            )}
          </div>
        </div>

        <div className="button-container">
          <button
            className={`w-full bg-[var(--color-highlight)] text-white py-2 px-4 mt-5 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 ${
              loading ? "cursor-wait bg-gray-400" : "cursor-pointer"
            }`}
            onClick={handleAnalyze}
            disabled={loading}
          >
            {t("ReportFormContainer.submit_report")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportFormContainer;
