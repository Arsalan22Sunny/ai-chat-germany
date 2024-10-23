/* eslint-disable react/prop-types */
import ButtonSubmit from "./common/Button";
import FormTitle from "./common/FormTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FetchContext from "../../../context/fetch";
import { useContext } from "react";
import InputPass from "./inputs/InputPass";

const FormResetPass = ({
  token, // Already validated on parent
}) => {
  const navigate = useNavigate();
  const { requests } = useContext(FetchContext);

  function doReset(e) {
    e.preventDefault();

    const new_password = e.target.newPassword?.value;
    const confirmPassword = e.target.confirmPassword?.value;
    if (new_password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const body = { token, new_password };

    requests("reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          const { message, detail } = data;
          if (message) toast.error(message);
          if (detail) toast.error(detail);
          return;
        }
        navigate("/auth/einloggen");
      })
      .catch((error) => {
        console.log(error);
        const { message, detail } = error;
        if (message) toast.error(message);
        if (detail) toast.error(detail);
      });
  }

  return (
    <div className="mx-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow-lg sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={doReset}>
        <FormTitle>Passwort vergessen?</FormTitle>
        <InputPass
          name="newPassword"
          id="newPassword"
          placeholder="New Password"
        />
        <InputPass
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
        />
        <ButtonSubmit>Vergessen</ButtonSubmit>
      </form>
    </div>
  );
};

export default FormResetPass;
