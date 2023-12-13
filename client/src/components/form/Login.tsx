// import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/LoginForm.scss";
// import { useLogin } from "../../../context/LoginContext";

export function Login() {
  return (
    <>
      <form
        action="/login"
        method="POST"
        //   onSubmit={handleLoginUser}
      >
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
              //   value={loginUser}
              //   onChange={(e) => setLoginUser(e.target.value)}
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
              //   value={passwordUser}
              //   onChange={(e) => setPasswordUser(e.target.value)}
            />
            <>
              {/* {showInfoWarming ? (
                <div className="show-warning">
                  <span style={{ color: "red" }}> {warningError} </span>
                </div>
              ) : (
                <hr className="span-login" />
              )}
              {alertLogout ? (
                <div className="show-warning">
                  <span style={{ color: "green" }}>The session has ended</span>
                </div>
              ) : (
                ""
              )} */}
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
