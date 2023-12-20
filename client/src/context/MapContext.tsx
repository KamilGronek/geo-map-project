import { createContext, ReactNode, useContext, useState } from "react";
// import axios from "axios";

type MapsProviderProps = {
  children: ReactNode;
};

// type loginArray = [];

type MapContext = {
  placeName: string;
  handleLocalization: (id: string, lat: string, lng: string) => void;
  lat: string;
  lng: string;
  userId: string;
  setUserId: (confirmInfo: string) => void;
  loginUser: string;
  setLoginUser: () => void;
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
  const [userId, setUserId] = useState("");
  const [loginUser, setLoginUser] = useState("");

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
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
