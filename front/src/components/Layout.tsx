import { Header } from "./Header";
import { Navbar } from "./Navbar";

import "./layout-style.css";

export const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="page-middle">
        <Navbar />
        <div className="page-content">{props.children}</div>
      </div>
    </div>
  );
};
