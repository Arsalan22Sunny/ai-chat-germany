/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { Menu as HUIMenu, MenuButton, MenuItems } from "@headlessui/react";

const NavLink = ({ item }) => {
  if (!item) {
    return null;
  }
  return (
    <a href={item.path} className="px-4 py-2.5 hover:bg-gray-100 flex capitalize">
      {item.name}
    </a>
  );
};

const Menu = () => {
  const { user } = useContext(AuthContext);

  const HamburgerMenu = () => (
    <span className="flex justify-center items-center text-base hover:bg-main/10 rounded-lg size-9 sm:size-9 shadow+">
      <svg
        className="size-5 lg:size-6"
        viewBox="0 0 34 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 1.66663H32M2 9.99996H19M2 18.3333H32"
          stroke="#19224D"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );

  const auth_navs = [
    {
      name: "Einloggen",
      path: "/auth/einloggen",
      protected: false,
    },
    {
      name: "Konto erstellen",
      path: "/auth/konto-erstellen",
      protected: false,
    },
    {
      name: "Abmelden",
      path: "/auth/abmelden",
      protected: true,
    },
  ];

  return (
    <div className="relative">
      <HUIMenu>
        <MenuButton>
          <HamburgerMenu />
        </MenuButton>

        <MenuItems>
          <div className="absolute w-56 bg-white right-0 top-[calc(100%_+_10px)] shadow-xl rounded-lg border z-[11]">
            {auth_navs
              .filter((e) => e.protected == Boolean(user))
              .map((item, index) => {
                return <NavLink key={index} item={item} />;
              })}
          </div>
        </MenuItems>
      </HUIMenu>
    </div>
  );
};

export { NavLink };

export default Menu;
