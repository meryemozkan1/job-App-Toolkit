import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>İş takip</h2>

      <nav>
        <NavLink to={"/"}>İş Lİstesi</NavLink>
        <NavLink to={"/new"}>İş Ekle</NavLink>
      </nav>
    </header>
  );
};

export default Header;
