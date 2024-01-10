import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "../../styles/App.css";
import { MenuUploadPicture } from "../layout/MenuUploadBook";
import { Header } from "../layout/Header";
import { useMap } from "../../context/MapContext";
// dotenv.config();

const containerStyle = {
  width: "1000px",
  height: "1000px",
};

// googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
// import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
export function Map() {
  const { handleLocalization } = useMap();

  const center = {
    lat: 52.229675,
    lng: 21.01223,
  };

  const coordinates = [
    {
      id: "Wroclaw",
      lat: 51.107883,
      lng: 17.038538,
    },
    {
      id: "Cracow",
      lat: 50.064651,
      lng: 19.944981,
    },
    {
      id: "Warsaw",
      lat: 52.229675,
      lng: 21.01223,
    },
  ];

  localStorage.setItem("coordinates", JSON.stringify(coordinates));

  const storedCoordinates = JSON.parse(
    localStorage.getItem("coordinates") || "[]"
  );

  console.log("import:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  // const [latIng, setLatIng] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: " ";
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

  // const handleLocalization = (id: string, lat, lng) => {
  //   console.log("position:", lat, lng);

  //   const myId = id;
  //   setLatIng(myId);
  // };

  return isLoaded ? (
    <>
      {/* <div style={{ width: "100vw", height: "100vh" }}> */}
      {/* <p>latIng: {JSON.stringify(latIng)}</p> */}
      <div className="grid">
        <Header />
        <MenuUploadPicture />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
          // loadingElement={<div style={{ height: "100%" }} />}
          // containerElement={<div style={{ height: `100%` }} />}
          // mapElement={<div style={{ height: `100%` }} />}
        >
          {storedCoordinates.map((location) => (
            <Marker
              onClick={() =>
                handleLocalization(location.id, location.lat, location.lng)
              }
              key={location.id}
              position={{
                lat: location.lat,
                lng: location.lng,
              }}
              // icon={{}}
            />
          ))}
          <></>
        </GoogleMap>
      </div>
    </>
  ) : (
    <></>
  );
}
