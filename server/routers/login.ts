// // require('dotenv').config();
// import { RowDataPacket } from "mysql2";

// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import express from "express";
// const app = express();
// app.use(express.json());
// const router = express.Router();
// import client from "../db";

// router.post("/login", (req: Request, res: Response) => {
//   const { loginUser, passwordUser } = req.body;

//   const user = {
//     email: loginUser,
//     password: passwordUser,
//   };

//   const sqlCheck = "SELECT * FROM register WHERE email = ?";

//   client.query(sqlCheck, [user.email], (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Error checking user");
//     } else if (!Array.isArray(result) || result.length == 0) {
//       res.status(401).send({ warning: "User with this email does not exist" });
//     } else {
//       const userFromDb = result[0] as RowDataPacket;
//       bcrypt.compare(user.password, userFromDb.password, (err, isMatch) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send("Error comparing passwords");
//         } else if (!isMatch) {
//           res.status(401).send({ warning: "Incorrect password" });
//         } else {
//           res.json({ info: "User is logged" });
//         }
//       });
//     }
//   });
// });

// export default router;
