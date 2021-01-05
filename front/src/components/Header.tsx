import * as React from "react";
import { Logo } from "./Logo";
import { logout } from "../services/auth";
import logoutIcon from "../img/logout.png";

import "./header-style.css";

export function Header() {
  return (
    <header>
      <Logo />
      <a onClick={logout} href="/" className="logout">
        <img src={logoutIcon} className="icon logout-icon" alt="Logout" />
      </a>
    </header>
  );
}
