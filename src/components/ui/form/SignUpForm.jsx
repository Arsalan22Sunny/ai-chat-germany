import ButtonSubmit from "./common/Button";
import FormTitle from "./common/FormTitle";
import InputEmail from "./inputs/Email";
import InputPassword from "./inputs/Password";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_URL from "../../../utils/api";

const SignUpForm = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-xl shadow-lg sm:p-6 md:p-8">
      <form
        className="space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;

          try {
            const response = await fetch(`${API_URL}/signup`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: email, password }),
            });

            const data = await response.json();
            if (data) {
              // if (data.message) toast.success(data.message);
              navigate("/auth/einloggen");
            } else {
              toast.error("Error creating user");
            }
          } catch (error) {
            toast.error(error.message);
            console.log(error);
          }
        }}
      >
        <FormTitle>Konto erstellen</FormTitle>
        <InputEmail />
        <InputPassword />
        <ButtonSubmit>Konto erstellen</ButtonSubmit>
        <div className="text-gray-500 flex justify-center text-center gap-1">
          Du hast schon ein Konto?
          <Link
            to="/auth/einloggen"
            className="text-main hover:underline font-medium"
          >
            Einloggen
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
