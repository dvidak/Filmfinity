import * as React from 'react';
import { Logo } from './Logo';
import { logout } from '../services/auth';

export function Header() {
    return (
        <header>
            <Logo />
            <a onClick={logout} href="/">Logout</a>
        </header>
    )
}