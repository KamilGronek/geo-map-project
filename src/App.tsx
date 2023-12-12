// import React from "react";
// import { GoogleMap, withScriptjs, withGoogleMap } from "@react-google-maps/api";
// import "./App.css";

// function Maps() {
//   return <GoogleMap zoom={10} center={{ lat: 52.229675, lng: 21.01223 }} />;
// }

// const WrappedMap = withScriptjs(withGoogleMap(Maps));

// export default function App() {
//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <WrappedMap
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,place`}
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     </div>
//   );
// }

// // googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
// //   process.env.REACT_APP_GOOGLE_KEY
import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
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

export default function MyComponent() {
  const { isLoaded } = useJsApiLoader({});

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

        // loadingElement={<div style={{ height: `100%` }} />}
        // containerElement={<div style={{ height: `100%` }} />}
        // mapElement={<div style={{ height: `100%` }} />}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

// googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
