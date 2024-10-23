import cn from "../../../../utils/cn";
import IconChevron from "../../../icon/IconChevron";
import PropTypes from "prop-types";

const ArrowButton = ({ up, ...rest }) => (
  <button
    type="button" // ⭐
    className="size-5 overflow-hidden flex justify-center items-center text-main"
    {...rest}
  >
    <IconChevron className={cn("size-5", up ? "rotate-180" : "")} />
  </button>
);

ArrowButton.propTypes = { up: PropTypes.bool };

export default ArrowButton;
