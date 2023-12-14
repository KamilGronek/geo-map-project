import express, { Request, Response } from "express";
const router = express.Router();
const bodyParser = require("body-parser");
import bcrypt from "bcrypt";
const { v4: uuidv4 } = require("uuid");
import client from "../db";
const cors = require("cors");

const port = 4000;

const app = express();

app.use(cors());

app.use(express.json());

let jsonParser = bodyParser.json();

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

app.post("/register", jsonParser, async (req: Request, res: Response) => {
  console.log("start registration");
  const { registerUser, passwordUser } = req.body;
  console.log(registerUser, passwordUser);
  console.log("req.body:", req.body);

  try {
    const hashedPassword = await bcrypt.hash(passwordUser, 10);

    console.log("hashedPassword", hashedPassword);

    const newRegister = {
      id: uuidv4(),
      username: registerUser,
      userpassword: hashedPassword,
    };

    console.log("newRegister");

    const sqlCheck = "SELECT * FROM registers WHERE username = $1";

    console.log("sqlCheck:", sqlCheck);

    const result = await client.query(sqlCheck, [registerUser]);

    console.log("waiting for callback");

    if (result.rows.length > 0) {
      console.log("User already exists with this username");
      res.status(400).send("User already exists with this username");
    } else {
      console.log("else");
      const sqlInsert =
        "INSERT INTO registers (id, username, userpassword) VALUES ($1, $2, $3)";

      const insertResult = await client.query(sqlInsert, [
        1,
        newRegister.username,
        newRegister.userpassword,
      ]);

      console.log("User added successfully");
      res.status(201).send("User added successfully");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal server error");
  }
});

export default router;
