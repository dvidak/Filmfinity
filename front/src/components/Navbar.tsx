import * as React from 'react';
import { NavLink } from 'react-router-dom';
import movies from "../img/movies.png";
import watchedList from "../img/watchedList.png";
import watchlist from "../img/watchlist.png";

export function Navbar() {
    return (
        <div className="nav">
            <NavLink to="/home">
                <div className="navLink">
                    <img src={movies} alt="movies" className="icon"></img>
                    <label className="navLabel">Movies</label>
                </div>
            </NavLink>
            <NavLink to="/watchlist">
                <div className="navLink">
                    <img src={watchlist} alt="watch" className="icon"></img>
                    <label className="navLabel">Watchlist</label>
                </div>
            </NavLink>
            <NavLink to="/watched-list">
                <div className="navLink">
                    <img src={watchedList} alt="watched" className="icon"></img>
                    <label className="navLabel">Watched</label>
                </div>
            </NavLink>
        </div>
    );
}