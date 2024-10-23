import PropTypes from "prop-types";

const ArrayValidator = ({ list, children }) => {
  if (Array.isArray(list) && list.length > 0) {
    return children;
  }
  return null;
};

ArrayValidator.propTypes = {
  list: PropTypes.array,
  children: PropTypes.node,
};

export default ArrayValidator;
