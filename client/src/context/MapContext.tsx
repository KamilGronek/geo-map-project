import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type MapsProviderProps = {
  children: ReactNode;
};

// type loginArray = [
//   {
//     id: string;
//     lat: number;
//     lng: number;
//   }
// ];

type MapContext = {
  placeName: string;
  handleLocalization: (id: string, lat: string, lng: string) => void;
  lat: string;
  lng: string;
  userId: string;
  setUserId: (confirmInfo: string) => void;
  loginUser: string;
  setLoginUser: () => void;
  // coordinates: loginArray;
  //   progress: object;
  //   message: string;
  //   handleSave: (e: any) => void;
  //   setFile: (e: any) => void;
  //   startedProgress: boolean;
  //   pcProgess: boolean;
};

const MapContext = createContext({} as MapContext);

export function useMap() {
  return useContext(MapContext);
}

export function MapProvider({ children }: MapsProviderProps) {
  const [placeName, setPlaceName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [userId, setUserId] = useLocalStorage("user", "");
  const [loginUser, setLoginUser] = useLocalStorage("login", "");
  // const [coordinates, setCoordinates] = useLocalStorage("coordinates", [
  //   {
  //     id: "Wroclaw",
  //     lat: 51.107883,
  //     lng: 17.038538,
  //   },
  //   {
  //     id: "Cracow",
  //     lat: 50.064651,
  //     lng: 19.944981,
  //   },
  //   {
  //     id: "Warsaw",
  //     lat: 52.229675,
  //     lng: 21.01223,
  //   },
  // ]);

  const handleLocalization = (id: string, lat: string, lng: string) => {
    console.log("position:", lat, lng);

    setPlaceName(id);
    setLat(lat);
    setLng(lng);
  };

  console.log("id:", userId);

  return (
    <MapContext.Provider
      value={{
        placeName,
        handleLocalization,
        lat,
        lng,
        userId,
        setUserId,
        loginUser,
        setLoginUser,
        // coordinates,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
