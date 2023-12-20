import express, { Request, Response } from "express";
const router = express.Router();
const bodyParser = require("body-parser");
import bcrypt from "bcrypt";
import client from "../db";

const app = express();
app.use(express.json());

// let jsonParser = bodyParser.json();

router.post("/login", (req: Request, res: Response) => {
  console.log("start login");
  const { loginUser, passwordUser } = req.body;
  // console.log("loginUser:", loginUser);
  console.log("passwordUser:", passwordUser);

  const user = {
    username: loginUser,
    userpassword: passwordUser,
  };

  console.log("user.username:", user.username);

  console.log(user);

  const sqlCheck = 'SELECT * FROM "User" WHERE username = $1';

  console.log(sqlCheck);

  client.query(sqlCheck, [user.username], (err: any, result: any) => {
    try {
      console.log("err:", err);
      console.log("result:", result);
      if (err) {
        console.log(err);
        res.status(500).send("Error checking user");
      } /* else if (!Array.isArray(result) || result.length == 0) {
        res.status(401).send("User with this email does not exist");
      } */ else {
        // const userFromDb = result[0];
        const userFromDbPassword = result.rows[0].password;
        bcrypt.compare(
          user.userpassword,
          userFromDbPassword,
          (err, isMatch) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error comparing passwords");
            } else if (!isMatch) {
              res.status(401).send("Incorrect password");
            } else {
              res.status(201).send(result);
            }
          }
        );
      }
    } catch (error) {
      console.log("error:", error);
    }
  });
});

export default router;
