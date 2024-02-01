import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import just from "../../assets/just.png";

export default function NavBar({ auth, setAuth }) {
  const navigate = useNavigate();
  const decoded = auth && jwtDecode(auth.token);
  let navLinks;
  if (auth !== undefined) {
    if (decoded.isAdmin === 1) {
      navLinks = [
        {
          path: `/user/profile/`,
          title: "my admin Account",
        },
      ];
    } else {
      navLinks = [
        {
          path: `/user/profile/`,
          title: "my Account",
        },
      ];
    }
  } else {
    navLinks = [
      {
        path: "/user/signup",
        title: "Sign up",
      },
      {
        path: `/user/login/`,
        title: "Login",
      },
      {
        path: `/products/`,
        title: "Products",
      },
    ];
  }

  const [page, setPagae] = useState(null);
  const handlePageStyle = (e) => {
    setPagae(e.target.text);
  };

  return (
    <header>
      <nav>
        <NavLink to="/" className="">
          Just Plann'it
          <img src={just} className="" alt="logo just plann'it" />
        </NavLink>
        <div className="">
          <ul className="">
            {navLinks.map((n) =>
              page === n.title ? (
                <li key={n.title}>
                  <NavLink
                    className=""
                    to={n.path}
                    onClick={handlePageStyle}
                    key={n.title}
                  >
                    {n.title}
                  </NavLink>
                </li>
              ) : (
                <li key={n.title}>
                  <NavLink className="" to={n.path} onClick={handlePageStyle}>
                    {n.title}
                  </NavLink>
                </li>
              )
            )}
            {auth !== undefined && (
              <li>
                <button
                  type="button"
                  className="-4"
                  onClick={() => {
                    setAuth(undefined);
                    navigate("/");
                  }}
                >
                  log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
NavBar.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      is_admin: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setAuth: PropTypes.func.isRequired,
};
