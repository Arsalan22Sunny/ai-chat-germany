import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { AuthContext } from "../../context/auth";

const SignOut = () => {
  const navigate = useNavigate();
  const { user, loading, assignUser } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      console.error(`User not authenticated.`);
      return;
    }
    // requests("signout")
    //   .then(() => {
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.error("Error signing out:", error);
    //   });

    assignUser(null);
    navigate("/");
  }, [user]);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  return <></>;
};

export default SignOut;
