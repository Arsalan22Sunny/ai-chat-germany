/* eslint-disable react/prop-types */
import { AddCircle, Minus } from "iconsax-react";
import cn from "../../../../../utils/cn";

const ExpandButton = ({ state, className, onClick, ...rest }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "size-8 shrink-0 flex justify-center items-center",
        className
      )}
      {...rest}
      title="Expand"
    >
      {state ? <Minus className="size-5" /> : <AddCircle className="size-4" />}
    </button>
  );
};

export default ExpandButton;
