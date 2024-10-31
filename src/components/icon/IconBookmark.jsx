import cn from "../../utils/cn";
import PropTypes from "prop-types";

const IconBookmark = ({ className, color, stroke }) => (
  // <svg
  //   className={cn(className || "size-5")}
  //   viewBox="0 0 24 32"
  //   fill="none"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path
  //     fillRule="evenodd"
  //     clipRule="evenodd"
  //     d="M0 30.4813V3C0 1.34375 1.34375 0 3 0H21C22.6562 0 24 1.34375 24 3V30.4813C24 31.3188 23.3188 32 22.4813 32C22.1688 32 21.8625 31.9062 21.6063 31.725L12 25L2.39375 31.725C2.1375 31.9062 1.83125 32 1.51875 32C0.68125 32 0 31.3188 0 30.4813ZM12.25 5C12.6642 5 13 5.33582 13 5.75V10H17.25C17.6642 10 18 10.3358 18 10.75C18 11.1642 17.6642 11.5 17.25 11.5H13V16.25C13 16.6642 12.6642 17 12.25 17C11.8358 17 11.5 16.6642 11.5 16.25V11.5H6.75C6.33582 11.5 6 11.1642 6 10.75C6 10.3358 6.33582 10 6.75 10H11.5V5.75C11.5 5.33582 11.8358 5 12.25 5Z"
  //     fill="black"
  //   />
  // </svg>
  <svg
    className={cn(className || "size-5")}
    viewBox="0 0 26 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 31.4813V4C1 2.34375 2.34375 1 4 1H22C23.6562 1 25 2.34375 25 4V31.4813C25 32.3188 24.3188 33 23.4813 33C23.1688 33 22.8625 32.9062 22.6063 32.725L13 26L3.39375 32.725C3.1375 32.9062 2.83125 33 2.51875 33C1.68125 33 1 32.3188 1 31.4813Z"
      fill={color? color :"none"}
      stroke={stroke? stroke : "black"}
      strokeWidth={2}
    />
  </svg>
);

IconBookmark.propTypes = { className: PropTypes.string };

export default IconBookmark;
