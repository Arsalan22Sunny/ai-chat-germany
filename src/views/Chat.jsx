import { AuthContext } from "../context/auth";
import { useContext } from "react";
import Loading from "../components/common/Loading";
import UIChat from "../components/ui/chat/Chat";

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Loading />; // Early return
  if (!user) return; // Early return
  return <UIChat />;
};

export default Home;
