import React from "react";
import "../../styles/photoGallery.css";

export function PhotoGallery({ data }) {
  return (
    <div className="left-bar">
      <h2>Photo Gallery</h2>
      <div id="photoGallery">
        {data.map((photo, index) => (
          <div
            key={index}
            className="photo"
            onClick={() => handlePhotoClick(photo)}
          >
            <img
              src={
                photo.link ??
                "https://www.pastelowelove.pl/userdata/public/gfx/5582/kotek-mruczek--naklejka.-naklejka-dla-dzieci.-dekoracje-pokoju.jpg"
              }
              alt={photo.name}
            />
            <p>{photo.place_name}</p>
            <p>{photo.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const handlePhotoClick = (photo) => {
  console.log(`Clicked on ${photo.name}`);
  // Add your logic to handle the click event (e.g., open a modal, show details, etc.)
};
