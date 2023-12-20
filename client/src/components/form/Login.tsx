import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/LoginForm.scss";
import { useMap } from "../../context/MapContext";

export function Login() {
  // const [loginUser, setLoginUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  // const [confirmInfo, setConfirmInfo] = useState([]);
  const [errorInfo, setErrorInfo] = useState("");
  // const [alertLogout, setAlertLogout] = useState("");
  const { setUserId, loginUser, setLoginUser } = useMap();

  const toNavigate = useNavigate();

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const userLogin = {
      loginUser,
      passwordUser,
    };

    await axios
      .post("http://localhost:4000/login", userLogin)
      .then((response) => {
        if (response.status === 201) {
          setShowInfo(true);
          // setConfirmInfo()
          setUserId(response.data.rows[0].id);
          // getLogin();
          console.log(response.data.rows[0].id);

          toNavigate("/map");
          return response;
        }
      })
      .catch((error) => {
        setShowInfo(true);
        setErrorInfo(error.response);
        console.log(error.response);
      });
  };

  return (
    <>
      <form action="/login" method="POST" onSubmit={handleLoginUser}>
        <div className="container">
          <img className="logo_background" src="react-icon.png" alt="" />
          <h2 className="login-title">
            Geo Map App/ <span className="loginSpan">Login</span>
          </h2>
          <div className="input-group success">
            <label>
              <b>E-mail</b>
            </label>
            <input
              type="email"
              placeholder="Enter E-mail"
              required
              name="loginUser"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
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
                <div className="show-warning">
                  <span style={{ color: "red" }}> {errorInfo} </span>
                </div>
              ) : (
                <hr className="span-login" />
              )}
              {showInfo ? (
                <div className="show-warning">
                  {/* <span style={{ color: "green" }}>{confirmInfo}</span> */}
                </div>
              ) : (
                ""
              )}
            </>

            <button type="submit">Login</button>

            <label>
              <input type="checkbox" name="remember" />
              Remember me
            </label>
          </div>
          <NavLink className="navLink" to="/register">
            Register
          </NavLink>
        </div>
      </form>
    </>
  );
}
