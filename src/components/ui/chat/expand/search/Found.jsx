import PropTypes from "prop-types";

const Found = ({ neddleIndex, totalFound }) => {
  const position = neddleIndex + 1;
  if (!totalFound) return;
  return (
    <span className="hidden md:block whitespace-nowrap flex-shrink">
      {position}/{totalFound} Gefunden
    </span>
  );
};

Found.propTypes = {
  neddleIndex: PropTypes.number,
  totalFound: PropTypes.number,
};

export default Found;
