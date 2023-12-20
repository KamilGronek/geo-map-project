import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../../styles/LoginForm.scss";
// import { useRegister } from "../../../context/RegisterContext"

export function Register() {
  const [registerUser, setRegisterUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const userRegister = {
      registerUser,
      passwordUser,
    };

    await axios
      .post("http://localhost:4000/register", userRegister)
      .then((response) => {
        if (response.status === 201) {
          setShowInfo(true);
          setConfirmInfo(response.data);
          return response;
        }
      })
      .catch((error) => {
        setShowInfo(true);
        setErrorInfo(error.response.data);
        console.log(error);
      });
  };

  return (
    <form action="/register" method="POST" onSubmit={handleCreateUser}>
      <div className="container-register">
        <img className="logo_background" src="react-icon-02.png" alt="" />
        <h2 className="login-title">
          Geo Map App/ <span className="registerSpan">Register</span>
        </h2>
        <div className="input-group success">
          <label>
            <b>E-mail</b>
          </label>
          <input
            type="email"
            placeholder="Enter E-mail"
            required
            name="registerUser"
            value={registerUser}
            onChange={(e) => setRegisterUser(e.target.value)}
          />
        </div>
        <div className="input-group error">
          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            required
            name="passwordUser"
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
          />
          <>
            {showInfo ? (
              <div className="show-info">
                <span style={{ color: "green" }}> {confirmInfo} </span>
              </div>
            ) : (
              <hr className="span-register" />
            )}
            {showInfo ? (
              <div className="show-info">
                <span style={{ color: "red" }}> {errorInfo} </span>
              </div>
            ) : (
              ""
            )}
          </>
          <button type="submit">Register</button>
          <label>
            <input type="checkbox" name="remember" />
            Remember me
          </label>
        </div>
        <NavLink className="navLink-register" to="/login">
          Login
        </NavLink>
      </div>
    </form>
  );
}
