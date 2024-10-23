import { useContext } from "react";
import SignUpForm from "../../components/ui/form/SignUpForm";
import cn from "../../utils/cn";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const SignUp = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  return (
    <div
      className={cn(
        "max-w-screen-xl mx-auto py-12 lg:py-16",
        "flex flex-col items-center justify-around gap-8"
      )}
    >
      <SignUpForm />
    </div>
  );
};

export default SignUp;
