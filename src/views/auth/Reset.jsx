import { useNavigate, useSearchParams } from "react-router-dom";
import FormResetPass from "../../components/ui/form/FormResetPass";
import cn from "../../utils/cn";
import { useEffect } from "react";

const Reset = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || null;

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  if (!token) return null;

  return (
    <div
      className={cn(
        "max-w-screen-xl mx-auto py-12 lg:py-16",
        "flex flex-col items-center justify-around gap-8"
      )}
    >
      <FormResetPass token={token} />
    </div>
  );
};

export default Reset;
