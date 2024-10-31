import cn from "../../utils/cn";
import PropTypes from "prop-types";

const IconCogwheel = ({ className }) => (
  
    <svg xmlns="http://www.w3.org/2000/svg" width="78" height="88" viewBox="0 0 78 88" fill="none" className={cn(className || "size-5")}>
    {/*Bookmark Base*/}
    <path d="M1 1h76v76H39l-4-4-4 4H1V1z" fill="#ccc"/>
    {/*Gears on the Bookmark --> Small Gear*/}
    <path d="M25 35a10 10 0 11-20 0 10 10 0 0120 0zm-18 0a8 8 0 1016 0 8 8 0 00-16 0z" fill="#999"/>
    <path d="M19 29v12M13 35h12" stroke="#fff" stroke-width="2"/>
    {/*Large Gear*/}
    <path d="M65 65a10 10 0 11-20 0 10 10 0 0120 0zm-18 0a8 8 0 1016 0 8 8 0 00-16 0z" fill="#999"/>
    <path d="M59 59v12M53 65h12" stroke="#fff" stroke-width="2"/>
    {/*Point of the Bookmark*/}
    <path d="M39 77l-4-4v12l4-4 4 4V73l-4 4z" fill="#ccc"/>
  </svg>
);

IconCogwheel.propTypes = { className: PropTypes.string };

export default IconCogwheel;
