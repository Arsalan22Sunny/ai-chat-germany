/* eslint-disable react/prop-types */
import cn from "../../utils/cn";

const QuoteMain = ({ className }) => {
  const Quote = ({ className }) => (
    <svg
      className={cn("size-8 lg:size-12", className)}
      viewBox="0 0 84 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M83.8235 37.5C83.8235 49.9313 73.7759 60 61.3708 60L59.874 60C56.5622 60 53.8866 57.3187 53.8866 54C53.8866 50.6812 56.5622 48 59.874 48L61.3708 48C67.1524 48 71.8488 43.2937 71.8488 37.5L71.8488 36L59.874 36C53.2691 36 47.8992 30.6187 47.8992 24L47.8992 12C47.8992 5.38125 53.2691 -2.67115e-06 59.874 -2.09374e-06L71.8488 -1.04687e-06C78.4536 -4.69456e-07 83.8236 5.38125 83.8236 12L83.8236 18L83.8236 24L83.8235 37.5ZM35.9244 37.5C35.9244 49.9312 25.8768 60 13.4716 60L11.9748 60C8.66302 60 5.9874 57.3187 5.9874 54C5.9874 50.6812 8.66302 48 11.9748 48L13.4716 48C19.2532 48 23.9496 43.2937 23.9496 37.5L23.9496 36L11.9748 36C5.36995 36 2.56859e-06 30.6187 3.14722e-06 24L4.19629e-06 12C4.77492e-06 5.38124 5.36995 -6.85863e-06 11.9748 -6.28122e-06L23.9496 -5.23435e-06C30.5544 -4.65693e-06 35.9244 5.38124 35.9244 12L35.9244 18L35.9244 24L35.9244 37.5Z"
        fill="currentColor"
        fillOpacity="0.25"
      />
    </svg>
  );

  return (
    <div className={cn("text-gray-700 px-4", className)}>
      <blockquote
        className={cn(
          "text-[1.5rem] lg:text-[1.75rem] font-black text-center relative max-w-screen-md",
          "mt-8"
        )}
      >
        <Quote className="absolute bottom-full left-0" />
        SANB macht die Recherche nach relevanter Rechtsprechung so einfach wie
        nie!
      </blockquote>
    </div>
  );
};

export default QuoteMain;
