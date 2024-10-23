import { useState } from "react";

const InputConfirmPassword = ({ ...props }) => {
  const [password, setPassword] = useState("");

  return (
    <input
      type="confirmPassword"
      name="confirmPassword"
      id="confirmPassword"
      placeholder="Confirm Password"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm+ rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      {...props}
    />
  );
};

export default InputConfirmPassword;
