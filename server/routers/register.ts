import express, { Request, Response } from "express";
const router = express.Router();
const bodyParser = require("body-parser");
import bcrypt from "bcrypt";
const { v4: uuidv4 } = require("uuid");
import client from "../db";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let jsonParser = bodyParser.json();

router.post("/register", jsonParser, async (req: Request, res: Response) => {
  console.log("start registration");
  const { registerUser, passwordUser } = req.body;
  console.log(registerUser, passwordUser);
  console.log("req.body:", req.body);

  try {
    const hashedPassword = await bcrypt.hash(passwordUser, 10);

    console.log("hashedPassword", hashedPassword);

    const newRegister = {
      username: registerUser,
      password: hashedPassword,
    };

    const sqlCheck = 'SELECT * FROM "User" WHERE username = $1';

    const result = await client.query(sqlCheck, [registerUser]);

    if (result.rows.length > 0) {
      res.status(400).send("User already exists with this username");
    } else {
      console.log("else");
      const sqlInsert =
        'INSERT INTO "User" (username, password) VALUES ($1, $2)';

      await client.query(sqlInsert, [
        newRegister.username,
        newRegister.password,
      ]);
      res.status(201).send("User added successfully");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal server error");
  }
});

export default router;
