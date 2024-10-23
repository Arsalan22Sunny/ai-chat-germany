/* eslint-disable react/prop-types */
import cn from "../../../utils/cn";
import Help from "../../ui/Help";

const Footer = ({ className }) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center px-4 lg:px-12 py-2",
        className
      )}
    >
      <div className="hidden lg:block">
        <Help />
      </div>
      <div className="flex-grow flex items-center flex-col">
        <p className="text-center text-xs text-gray-500">
          Wir bieten keine Rechtsberatung an.
        </p>
        <p className="text-center text-xs text-gray-500">
          Beachten Sie den Haftungsausschluss.
        </p>
      </div>
      <div className="hidden lg:block"></div>
      <div className="hidden">
        Developed by <a href="https://github.com/santokhan/">Santo</a>
      </div>
    </div>
  );
};

export default Footer;
