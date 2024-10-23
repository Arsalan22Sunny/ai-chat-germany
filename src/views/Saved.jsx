import { AuthContext } from "../context/auth";
import { useContext } from "react";
import Loading from "../components/common/Loading";
import { useSearchParams } from "react-router-dom";

const Saved = () => {
  const { user, loading } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const { id = "" } = searchParams;

  if (loading) return <Loading />;
  if (user) return <></>;
};

export default Saved;
