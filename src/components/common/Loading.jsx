/* eslint-disable react/prop-types */
import cn from "../../utils/cn";

const Loading = ({ className = "" }) => {
  return (
    <div className={cn("flex justify-center items-center h-[80vh]", className)}>
      <div className="animate-spin rounded-full size-6 lg:size-16 overflow-hidden border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
