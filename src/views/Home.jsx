import PreDefinedCard, { PreDefinedCardMobile } from "../components/ui/PreDefinedCards";
import QuoteMain from "../components/ui/QuoteMain";
import cn from "../utils/cn";
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import Loading from "../components/common/Loading";
import UIChat from "../components/ui/chat/Chat";

const PublicView = () => (
  <div
    className={cn(
      "max-w-screen-xl mx-auto py-4 h-full overflow-y-auto modern-scrollbar",
      "flex flex-col items-center justify-around"
    )}
  >
    <QuoteMain />
    <PreDefinedCardMobile className="block lg:hidden" />
    <PreDefinedCard className="hidden lg:block" />
  </div>
);

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Loading />;
  if (user) return <UIChat />;
  return <PublicView />;
};

export default Home;
