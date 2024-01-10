import { useEffect, useState } from "react";
import axios from "axios";

import { useMap } from "../../context/MapContext";
import { PhotoGallery } from "./PhotoGallery";

export function MenuUploadPicture() {
  const { placeName, lat, lng, userId } = useMap();

  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [message, setMessage] = useState("");

  const [imagesIds, setImagesIds] = useState([] as number[]);
  const [placesOfPhotos, setPlacesOfPhotos] = useState([]);

  console.log(imagesIds);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPlacesOfPhotos();
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = (e) => {
    handleUpload(e);
    handlePhotoPlace();
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();

    if (!files) {
      setMessage("No file selected");
      return;
    }

    const formdataArray = [] as FormData[];

    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append(`imgFile`, files[i]);
      fd.append("userId", userId);
      formdataArray.push(fd);
      console.log("fd:", fd);
    }

    setMessage("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });
    formdataArray.forEach(async (fd) => {
      await axios
        .post("http://localhost:4000/upload", fd, {
          onUploadProgress: (progressEvent) => {
            setProgress((prevState) => {
              return { ...prevState, pc: progressEvent.progress * 100 };
            });
          },
          headers: {
            // "Custom-Header": "value",
            "Content-Type": `multipart/form-data`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setMessage("Upload successful");
            console.log("uploaded:", response.data.id);
            // fetchPicture();
            setImagesIds((prevImagesIds) => [
              ...prevImagesIds,
              response.data.id as number,
            ]);
          }
        })
        .catch((error) => {
          setMessage("Upload failed");
          console.log(error.message);
        });
    });
  };

  // const fetchPicture = async () => {
  //   await axios
  //     .get("http://localhost:4000/upload")
  //     .then((response) => {
  //       // const imageId = imagesIds[imagesIds.length - 1];
  //       console.log(
  //         "response.data:",
  //         response.data[response.data.length - 1].id
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  const handlePhotoPlace = async () => {
    console.log("handle place photo");

    const coordinates = {
      lat,
      lng,
    };

    const placeOfPicture = {
      coordinates,
      userId,
      imagesIds,
      placeName,
    };

    console.log("placeOfPicture:", placeOfPicture);

    await axios
      .post("http://localhost:4000/photo-place", placeOfPicture, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("photo-place:", response);
          setImagesIds([]);
          getPlacesOfPhotos();
        }
      })
      .catch((error) => {
        setMessage("Upload failed");
        console.log(error);
      });
  };

  const getPlacesOfPhotos = async () => {
    await axios
      .get("http://localhost:4000/photo-place")
      .then((response) => {
        if (response.status === 200) {
          console.log("photo-place:", response);
          setPlacesOfPhotos(response.data);
        }
      })
      .catch((error) => {
        setMessage("Upload failed");
        console.log(error);
      });
  };

  return (
    <>
      <nav className="menu">
        <form>
          <p>userId:{userId}</p>
          <input
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            type="file"
            multiple
          />
          <button onClick={(e) => handleSave(e)}> SAVE </button>

          <p>Place name: {placeName == null ? "" : placeName}</p>
          <p>lat: {lat == null ? "" : lat}</p>
          <p>lng: {lng == null ? "" : lng}</p>

          {progress.started && (
            <progress max="100" value={progress.pc}></progress>
          )}
          {message && <span>{message}</span>}
        </form>
        <PhotoGallery data={placesOfPhotos} />
      </nav>
    </>
  );
}
