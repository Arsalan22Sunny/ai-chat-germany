import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { MessageQuestion } from "iconsax-react";
import { NavLink } from "../layout/navbar/Menu";

const Help = () => {
  const nav_list = [
    {
      name: "Kontakt",
      path: "/regelungen",
    },
    {
      name: "Impressum",
      path: "/regelungen",
    },
    {
      name: "Datenschutz",
      path: "/regelungen",
    },
  ];

  return (
    <Menu as="div" className="w-full hidden lg:block relative">
      <MenuButton>
        <MessageQuestion
          className="size-6 lg:size-8 text-gray-700"
          color="currentColor"
        />
      </MenuButton>
      <MenuItems>
        <div className="absolute w-48 bg-white left-0 bottom-[calc(100%_+_10px)] shadow-xl rounded-lg border z-[5]">
          {nav_list.map((item, index) => (
            <NavLink key={index} item={item} />
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Help;
