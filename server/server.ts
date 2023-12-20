import express, { Request, Response } from "express";
import client from "./db";
import cors from "cors";
const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

import routerRegister from "./routers/register";
import routerLogin from "./routers/login";
import routerUpload from "./routers/upload";
import routerPlaceOfImage from "./routers/place_of_image";

app.use("/", routerRegister, routerLogin, routerUpload, routerPlaceOfImage);

app.listen(port, () => {
  console.log("Server is running on port 4000");
  client.connect(function (err: any) {
    if (err) throw err;
    console.log("Database connected!");
  });
});
