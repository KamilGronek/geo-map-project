import express, { Request, Response } from "express";
const router = express.Router();
import bcrypt from "bcrypt";
const { v4: uuidv4 } = require("uuid");
import client from "../db";
const cors = require("cors");
import path from "path";
import { Storage } from "@google-cloud/storage";
// const bodyParser = require("body-parser");

import multer from "multer";
const app = express();

// let jsonParser = bodyParser.json();

// todo: nazwa pliku "place_of_photo"

// nazwa endpointa
router.post("/photo-place", async (req: Request, res: Response) => {
  console.log("start photo-place");
  const { coordinates, userId, imagesIds, placeName } = req.body;
  console.log("imagesIds:", imagesIds);
  //   console.log("placeOfPhotos:", placeOfPhotos);

  const insertQuery =
    "INSERT INTO place_of_photo (coordinates,user_id,image_id,place_name) VALUES (ST_GeomFromGeoJSON($1), $2, $3, $4)";

  try {
    imagesIds.forEach(async (imageId: any) => {
      const coordinatesToSave = {
        type: "Point",
        coordinates: [coordinates.lat, coordinates.lng],
      };
      const values = [
        JSON.stringify(coordinatesToSave),
        userId,
        imageId,
        placeName,
      ];
      console.log("values:", values);
      try {
        await client.query(insertQuery, values);
      } catch (error) {
        console.log("error:", error);
      }
    });

    res.status(201).send("Created successfully");
  } catch (error) {
    console.error("Error inserting image information:", error);
    res.status(500).send("Error inserting image information");
  }
});

router.get("/photo-place", (req: Request, res: Response) => {
  const placesOfPhoto =
    'select pop.coordinates, pop.place_name, i.name, i.link, u.username from place_of_photo pop join image i on i.id = pop.image_id join "User" u on u.id = pop.user_id';
  client.query(placesOfPhoto, (err: any, results: any) => {
    if (err) {
      console.log(err);
    }

    // console.log("photo-place:", results);
    res.send(results.rows);
  });
});

export default router;
