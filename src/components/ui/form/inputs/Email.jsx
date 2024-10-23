import { useState } from "react";

const InputEmail = () => {
  const [email, setEmail] = useState("");

  return (
    <input
      type="email"
      name="email"
      id="email"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm+ rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3"
      placeholder="E-Mail"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
};

export default InputEmail;
