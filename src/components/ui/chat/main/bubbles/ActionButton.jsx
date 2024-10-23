/* eslint-disable react/prop-types */
import cn from "../../../../../utils/cn";

const ActionButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        "size-8 shrink-0 flex justify-center items-center text-main",
        className
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

export default ActionButton;
