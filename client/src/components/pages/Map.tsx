import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// import dotenv from "dotenv";

// dotenv.config();

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 52.229675,
  lng: 21.01223,
};

// googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,

export function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {map && <Marker position={center} />}

        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
