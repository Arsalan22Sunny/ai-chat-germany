// routes.jsx // use .jsx for the </> syntax
import Home from "../views/Home";
import SignIn from "../views/auth/SignIn";
import Forgot from "../views/auth/Forgot";
import SignUp from "../views/auth/SignUp";
import LayoutMain from "../components/layout/Main";
import SignOut from "../views/auth/SignOut";
import FAQs from "../views/FAQs";
import Reset from "../views/auth/Reset";
import Saved from "../views/Saved";

const routes = [
  {
    path: "", // will be redirected to new chat page for authorized users
    element: <LayoutMain />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "saved",
        children: [
          {
            path: ":id",
            element: <Saved />,
          },
        ],
      },
      // Protected Routes
      {
        path: "auth",
        children: [
          {
            path: "konto-erstellen",
            element: <SignUp />,
          },
          {
            path: "einloggen",
            element: <SignIn />,
          },
          {
            path: "abmelden",
            element: <SignOut />,
          },
          {
            path: "vergessen",
            element: <Forgot />,
          },
          {
            path: "zurücksetzen", // both are same
            element: <Reset />,
          },
        ],
      },
      {
        path: "zurücksetzen", // both are same
        element: <Reset />,
      },
      {
        path: "regelungen",
        element: <FAQs />,
      },
    ],
  },
];

export default routes;
