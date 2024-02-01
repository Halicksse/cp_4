import { NavLink } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    {
      path: "/terms",
      title: "Terms of use",
    },
    {
      path: "/",
      title: "Contact",
      url: "mailto:contact@example.com",
    },
  ];
  return (
    <div className="flex flex-col">
      <footer className="bg-stone-200 p-4 md:p-6 lg:p-8 xl:p-10 flex justify-evenly items-center">
        <div className="mt-4 md:mt-0 md:ml-4">
          <ul className="flex space-x-4">
            {footerLinks.map((n) => (
              <li key={n.title}>
                <NavLink className="" to={n.path}>
                  {n.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
