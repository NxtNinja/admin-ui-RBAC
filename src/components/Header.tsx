import { useRouter } from "next/router";
import Navbar from "./Navbar";

const Header = () => {
  const { pathname } = useRouter();
  const hideNavbarRoutes = ["/auth/login", "/auth/signup"];

  const isCurrentPathHideNavbar = hideNavbarRoutes.includes(pathname);

  if (isCurrentPathHideNavbar) {
    return <></>;
  }
  return (
    <>
      <Navbar />
    </>
  );
};

export default Header;
