import FormForgotPass from "../../components/ui/form/FormForgotPass";
import cn from "../../utils/cn";

const Forgot = () => {
  return (
    <div
      className={cn(
        "max-w-screen-xl mx-auto py-12 lg:py-16",
        "flex flex-col items-center justify-around gap-8"
      )}
    >
      <FormForgotPass />
    </div>
  );
};

export default Forgot;
