import { NavLink } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    {
      path: "/",
      title: "CONDITIONS D'UTILISATION",
    },
    {
      path: "/terms",
      title: "Terms of use",
    },
  ];
  return (
    <div>
      <footer className="">
        <ul className="">
          {footerLinks.map((n) => (
            <li key={n.title}>
              <NavLink className="" to={n.path}>
                {n.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
