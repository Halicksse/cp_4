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
        {
          path: `/user/orders/`,
          title: "my orders",
        },
      ];
    }
  } else {
    navLinks = [
      {
        path: `/products/`,
        title: "Products",
      },
      {
        path: "/user/signup",
        title: "Sign up",
      },
      {
        path: `/user/login/`,
        title: "Login",
      },
      {
        path: `/cart/`,
        title: "Cart",
      },
    ];
  }

  const [page, setPage] = useState(null);
  const handlePageStyle = (e) => {
    setPage(e.target.text);
  };

  return (
    <header>
      <nav className="bg-stone-200 p-4 md:p-6 lg:p-8 xl:p-10 flex justify-between items-center">
        <NavLink to="/" className="">
          <img
            src={just}
            className="w-10 h-10 md:w-12 md:h-12 lg:w-50 lg:h-50 xl:w-16 xl:h-16"
            alt="logo just plann'it"
          />
        </NavLink>
        <div className="mt-4 md:mt-0 md:ml-4">
          <ul className="flex space-x-4">
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
                  className=""
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
