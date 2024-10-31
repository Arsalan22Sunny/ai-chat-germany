import { Link } from "react-router-dom";
import cn from "../../../utils/cn";
import Logo from "../../common/Logo";
import Menu from "./Menu";
import Saved from "./saved/Saved";
import { AuthContext } from "../../../context/auth";
import { useContext } from "react";
import IconBookmark from "../../icon/IconBookmark";
import { Setting2 } from "iconsax-react";
import Settings from "../navbar/settings/settings"


const Navbar = ({ className = "" }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return;
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 sm:px-6 lg:px-12 py-2 lg:py-3",
        className
      )}
    >
      <div className="flex-shrink-0">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex-grow"></div>
      <div className={cn("flex-shrink-0", "flex items-center gap-2")}>
        {user && 
        <>
          <Saved />
          <Settings/>
        </>

        }
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
