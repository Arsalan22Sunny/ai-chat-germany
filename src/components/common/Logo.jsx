/* eslint-disable react/prop-types */

import logoImage from "../../assets/logo.png";
import cn from "../../utils/cn";

const Logo = ({ className }) => {
  return (
    <img src={logoImage} alt="logo" className={cn("h-9 sm:h-9", className)} />
  );
};

export default Logo;
