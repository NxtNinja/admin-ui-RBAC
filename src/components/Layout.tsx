import { ReactNode } from "react";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={`max-w-screen-lg mx-auto`}>
        <Header />
        <main className="">{children}</main>
      </div>
    </>
  );
};

export default Layout;
