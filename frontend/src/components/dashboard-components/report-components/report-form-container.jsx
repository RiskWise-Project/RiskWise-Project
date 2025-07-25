import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  fetchAddress,
  handleMapClick,
} from "../../../services/report services/report-form-functions";
import { analyzeImageService } from "../../../services/image-services";
import "./report-form-container.css";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

function ReportFormContainer({
  fileName,
  setFileName,
  location,
  setLocation,
  address,
  setAddress,
  loading,
  setLoading,
  analysis,
  setAnalysis,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const onMapClick = (e) => {
    handleMapClick(e, setLocation, (lat, lng) =>
      fetchAddress(lat, lng, apiKey, setAddress)
    );
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setLoading(true);

      const result = await analyzeImageService(file);

      setAnalysis(result);

      setLoading(false);
    }
  };

  const fixedText = analysis
    ? analysis
        .trim()
        .replace(/\s+\./g, ".")
        .replace(/^([a-zA-Z])/, (match) => match.toUpperCase()) +
      (/[.!?]$/.test(analysis.trim()) ? "" : ".")
    : "";

  return (
    <div className="form-container-main w-full h-fit bg-[var(--color-white)] rounded-lg p-6 flex flex-col gap-7">
      <div className="form-header-container">
        <h1 className="md:text-xl text-lg font-black tracking-wide text-[var(--color-dark)]">
          Submit a Report
        </h1>
        <p className="md:text-sm text-xs opacity-60 text-[var(--color-dark)] md:w-[50%] text-justify">
          Fill up the form for the submission of Risk Report. AI will scan the
          image to categorize the risks.
        </p>
      </div>

      <div className="form-container flex flex-col">
        <div className="w-full">
          <label
            htmlFor="RiskAttachment"
            className="block font-semibold mb-2 md:text-base text-sm"
          >
            Upload or Take Photo
          </label>
          <div className="flex items-center gap-2 border-2 rounded-lg border-[var(--color-dark)]">
            <label
              htmlFor="RiskAttachment"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer md:text-base text-sm"
            >
              Choose File
            </label>
            <span className="text-[var(--color-dark)] opacity-60 md:text-base text-sm">
              {fileName || "No file chosen"}
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

        <div className="analysis-container md:mb-5 mb-5">
          <p className="md:text-sm text-xs text-gray-600">{fixedText}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="w-full flex flex-col gap-5">
            <div className="location-container">
              <label>Location: </label>
              <input
                type="text"
                value={address}
                readOnly
                className="border-2 rounded-lg px-4 py-2 border-[var(--color-dark)] w-full md:text-base text-sm focus:outline-0"
              />
            </div>

            <div className="additional-content-container flex flex-col">
              <label>Additional Information: </label>
              <textarea
                className="border-2 rounded-lg px-4 py-2 border-[var(--color-dark)] min-h-15 h-50 max-h-100 md:text-base text-sm focus:outline-0"
                placeholder="Describe the issue or risk in detail..."
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
                Loading Map...
              </p>
            )}
          </div>
        </div>

        <div className="button-container">
          <button
            className={`w-full bg-[var(--color-highlight)] text-white py-2 px-4 mt-5 rounded-md hover:opacity-80 transition-all motion-safe:duration-200 ${
              loading ? "cursor-wait" : "cursor-pointer"
            }`}
          >
            Report A Risk
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportFormContainer;
