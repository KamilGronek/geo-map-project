import express, { Request, Response } from "express";
const router = express.Router();
import bcrypt from "bcrypt";
const { v4: uuidv4 } = require("uuid");
import client from "../db";
const cors = require("cors");
const path = require("path");
import { Storage } from "@google-cloud/storage";
import multer from "multer";
const app = express();

// const src = path.join(__dirname);
// app.use(express.static(src));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const storage = new Storage({
  projectId: "elegant-skein-407510",
  keyFilename: "D://geo project/server/googleKey.json",
  //   keyFilename: "path/to/your/keyfile.json",
});

const bucket = storage.bucket("geo_map_project");

// router.post("/photo-place", async (req: Request, res: Response) => {
//   console.log("start photo-place");
//   const { registerUser, passwordUser } = req.body;

//   //todo:

//   res.status(201).send("Created successfully");
// });

router.post(
  "/upload",
  upload.single("imgFile"),
  async (req: Request, res: Response) => {
    console.log("start upload:", req.file);

    try {
      if (req.file) {
        console.log("file", req.file);
        console.log(" file found! tring to upload");
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream();

        const fileName = req.file.originalname;
        const fileMimetype = req.file.mimetype;
        const fileSize = req.file.size;
        // const fileContent = req.file.buffer.toString();

        // console.log("before: ", "blobStream.end(req.file.buffer)");
        blobStream.end(req.file.buffer);

        console.log("before: ", "blobStream.on(finish, async () => {");
        blobStream.on("finish", async () => {
          // Image saved in the cloud, now insert information into the database

          // Assuming you have a user_id, replace your_user_id_here
          const user_id = 1;

          const insertQuery =
            "INSERT INTO image (user_id, name, type, weight) VALUES ($1, $2, $3, $4)";

          const values = [user_id, fileName, fileMimetype, fileSize];

          try {
            await client.query(insertQuery, values);
            res.status(200).send("Success");
          } catch (error) {
            console.error("Error inserting image information:", error);
            res.status(500).send("Error inserting image information");
          }
        });
      }
    } catch (error) {
      console.log("error:", error);
      res.status(500).send(error);
    }
  }
);

router.get("/upload", (req: Request, res: Response) => {
  client.query("SELECT * FROM image", (err: any, results: any) => {
    if (err) {
      console.log(err);
    }

    // console.log("upload res:", results);
    res.send(results.rows);
  });
});

export default router;
