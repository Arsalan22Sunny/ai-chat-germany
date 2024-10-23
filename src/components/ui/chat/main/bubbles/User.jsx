import PropTypes from "prop-types";
import cn from "../../../../../utils/cn";

const BubbleUser = ({ message, className }) => {
  if (!message.content?.text) return;
  return (
    <section className={cn("w-full flex justify-end", className)}>
      <div className="bg-[#19224D] text-white px-3 py-2 rounded-xl max-w-[90%]">
        {message.content?.text}
      </div>
    </section>
  );
};

BubbleUser.propTypes = {
  message: PropTypes.object,
  className: PropTypes.string,
};

export default BubbleUser;
