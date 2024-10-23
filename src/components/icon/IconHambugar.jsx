/* eslint-disable react/prop-types */

import cn from "../../utils/cn";

const IconHamburger = ({ className }) => (
  <svg
    className={cn("w-6 h-6", className)}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 11.6666H35M5 20H35M5 28.3333H35"
      stroke="#19224D"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default IconHamburger;
