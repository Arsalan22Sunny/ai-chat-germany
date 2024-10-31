import { Link, useNavigate } from "react-router-dom";
import ButtonSubmit from "./common/Button";
import FormTitle from "./common/FormTitle";
import InputEmail from "./inputs/Email";
import InputPassword from "./inputs/Password";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { toast } from "react-toastify";
import FetchContext from "../../../context/fetch";

const SignInForm = () => {
  const navigate = useNavigate();
  const { assignUser } = useContext(AuthContext);
  const { requests } = useContext(FetchContext);

  async function doSignIn(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
      const response = await requests("token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username: email, password }),
      });
      const token = await response.json();
      const accessToken = token.access_token;
      if (!accessToken) throw new Error(token.detail || token.message);
      assignUser({ accessToken });
      navigate("/");
    } catch (error) {
      const errorMessage = "Incorrect username or password";
      const errorDetail = error.message || error.detail;

      if(errorDetail.includes(errorMessage)){
        toast.error("Deine E-Mail-Adresse oder dein Passwort ist nicht korrekt.");
      }else{
      toast.error(error.message || error.detail);
      }
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow-lg sm:p-6 md:p-8">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          const { email, password } = e.target;
          doSignIn(email.value, password.value);
        }}
      >
        <FormTitle>Einloggen</FormTitle>
        <InputEmail />
        <div className="space-y-2">
          <InputPassword autoComplete="current-password" />
          <div className="flex items-start">
            <Link
              to="/auth/vergessen"
              className="ml-auto text-sm text-main hover:underline"
            >
              Passwort vergessen?
            </Link>
          </div>
        </div>
        <ButtonSubmit>Einloggen</ButtonSubmit>
        <div className="text-sm+ font-medium text-gray-500 flex justify-center">
          <Link
            to="/auth/konto-erstellen"
            className="text-main hover:underline text-center"
          >
            Konto erstellen
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
