export const dhvsuCoords = {
  lat: 14.9976212,
  lng: 120.6546911,
};

export async function fetchAddress(lat, lng, apiKey, setAddress) {
  console.log("Fetching address for:", lat, lng);
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.status === "OK" && data.results.length > 0) {
      setAddress(data.results[0].formatted_address);
    } else {
      setAddress("Address not found");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    setAddress("Error fetching address");
  }
}

export function handleMapClick(e, setLocation, fetchAddrFn) {
  const newLocation = {
    lat: e.latLng.lat(),
    lng: e.latLng.lng(),
  };
  setLocation(newLocation);
  fetchAddrFn(newLocation.lat, newLocation.lng);
}
