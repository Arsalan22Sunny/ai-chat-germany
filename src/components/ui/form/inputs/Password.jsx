import { useState } from "react";

const EyeClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

const EyeOpen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const InputPassword = ({ ...props }) => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="w-full relative">
      <input
        // type={show ? "text" : "password"}
        type="password"
        name="password"
        id="password"
        placeholder="Passwort"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm+ rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        {...props}
      />
      {/* <button
        type="button"
        onClick={() => {
          setShow((prev) => !prev);
        }}
        className="size-5 absolute right-4 top-1/2 -translate-y-1/2"
      >
        {show ? <EyeClose /> : <EyeOpen />}
      </button> */}
    </div>
  );
};

export default InputPassword;