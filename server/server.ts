import express, { Request, Response } from "express";
import client from "./db";
import cors from "cors";
const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

// import routerRegister from "./routers/register";

// app.use("/", routerRegister);

// app.post('/login', jsonParser, async (req, res) => {});

// app.post('/upload-file', jsonParser, async (req, res) => {
// połaczyć się z chmurą
// wziąż użytkownika chmurowego
// zapisać zdjęcie
// });

// pp.post('/photo-place', jsonParser, async (req, res) => {

//   // zapisać dane zdjęcia
//   // dane geogrficzne koordynaty
// });

app.listen(port, () => {
  console.log("Server is running on port 4000");
  client.connect(function (err: any) {
    if (err) throw err;
    console.log("Database connected!");
  });
});
