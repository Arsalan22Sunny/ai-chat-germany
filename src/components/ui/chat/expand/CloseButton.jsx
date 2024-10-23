/* eslint-disable react/prop-types */

import { CloseCircle } from "iconsax-react";

const CloserButton = ({ doCollapse }) => (
  <div className="flex justify-end px-1">
    <button
      type="button"
      className="text-gray-700 hover:text-gray-500"
      onClick={doCollapse}
    >
      <CloseCircle className="size-6 lg:size-7" />
    </button>
  </div>
);

export default CloserButton;
