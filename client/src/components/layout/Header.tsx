import "../../styles/Header.scss";
import { useNavigate } from "react-router-dom";
import { useMap } from "../../context/MapContext";

export function Header() {
  const { loginUser } = useMap();

  const navigateTo = useNavigate();

  const logOut = () => {
    navigateTo("/login");
  };

  return (
    <header className="header">
      <img className="header__logo" src="logo192.png" alt="" />
      <div className="header__shop">
        <h2>Geo Map App</h2>
        <div className="header__info">
          <h3>Login: {loginUser}</h3>
          <button onClick={logOut}>Log out</button>
        </div>
      </div>
      <hr className="header__hr" />
    </header>
  );
}
