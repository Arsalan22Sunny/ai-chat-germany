/* eslint-disable react/prop-types */

const ButtonSubmit = ({ children }) => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-main hover:bg-black focus:ring-4 focus:outline-none focus:ring-main/20 font-medium rounded-lg text-sm+ px-5 py-2.5 text-center"
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
