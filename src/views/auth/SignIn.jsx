import { useContext } from "react";
import SignInForm from "../../components/ui/form/SignInForm";
import { AuthContext } from "../../context/auth";
import cn from "../../utils/cn";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  return (
    <div
      className={cn(
        "max-w-screen-xl mx-auto py-12 lg:py-16 px-4",
        "flex flex-col items-center justify-around gap-8"
      )}
    >
      <SignInForm />
    </div>
  );
};

export default SignIn;
