import * as React from 'react';
import { Logo } from './Logo';
import { logout } from '../services/auth';
import logoutIcon from "../img/logout.png";

export function Header() {
    return (
        <header>
            <div className="header-container">
                <div></div>
                <Logo />
                <a onClick={logout} href="/"><img src={logoutIcon} className="icon logout-icon" alt="logout"/></a>
            </div>
        </header>
    )
}