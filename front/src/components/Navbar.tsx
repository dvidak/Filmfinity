import * as React from "react";
import { NavLink } from "react-router-dom";
import movies from "../img/movies.png";
import watchedList from "../img/watchedList.png";
import watchlist from "../img/watchlist.png";
import user from "../img/user.png";

export function Navbar() {
  const profilePictureUrl = localStorage.getItem("picture");

  return (
    <div className="nav">
      <NavLink to="/">
        <img src={movies} alt="Movies" />
        <div className="nav-label">Movies</div>
      </NavLink>
      <NavLink to="/watchlist">
        <img src={watchlist} alt="Watchlist" />
        <div className="nav-label">Watchlist</div>
      </NavLink>
      <NavLink to="/watched-list">
        <img src={watchedList} alt="Watched list" />
        <div className="nav-label">Watched</div>
      </NavLink>
      <NavLink to="/profile">
        <img
          src={profilePictureUrl ? profilePictureUrl : user}
          alt="Profile"
          className="profile"
        />
        <div className="nav-label">Profile</div>
      </NavLink>
    </div>
  );
}
