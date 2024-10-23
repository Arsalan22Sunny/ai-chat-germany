import ButtonSubmit from "./common/Button";
import FormTitle from "./common/FormTitle";
import InputEmail from "./inputs/Email";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FetchContext from "../../../context/fetch";
import { useContext } from "react";

const FormForgotPass = () => {
  const navigate = useNavigate();
  const { requests } = useContext(FetchContext);

  function doReset(e) {
    e.preventDefault();

    const body = {};
    if (window) {
      body.callback = {
        host: window.location.host,
        origin: window.location.origin,
        resetEndpoint: "zurücksetzen",
      };
    }

    const email = e.target.email?.value;
    if (!email) return;
    body.email = email;

    requests("forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Password reset email sent. Check your inbox.");
        navigate("/auth/einloggen");
      })
      .catch((error) => {
        const { message, detail } = error;
        if (message) toast.error(message);
        if (detail) toast.error(detail);
      });
  }

  return (
    <div className="mx-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow-lg sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={doReset}>
        <div className="space-y-3">
          <FormTitle>Passwort vergessen?</FormTitle>
          <p className="text-center">
            Bitte gib hier deine E-Mail Adresse ein. Du erhältst im Anschluss
            per Mail einen Link zum Ändern des Passworts.
          </p>
        </div>
        <InputEmail />
        <ButtonSubmit>Neues Passwort anfordern</ButtonSubmit>
      </form>
    </div>
  );
};

export default FormForgotPass;
