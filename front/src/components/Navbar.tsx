import * as React from "react";
import { NavLink } from "react-router-dom";
import movies from "../img/movies.png";
import watchedList from "../img/watchedList.png";
import watchlist from "../img/watchlist.png";
import search from "../img/search.png";
import home from "../img/home.png";
import user from "../img/user.png";

export function Navbar() {
  const profilePictureUrl = localStorage.getItem("picture");

  return (
    <div className="nav">
      <NavLink to="/">
        <img src={home} alt="For You" />
        <div className="nav-label">For You</div>
      </NavLink>
      <NavLink to="/movies">
        <img src={movies} alt="Movies" />
        <div className="nav-label">Movies</div>
      </NavLink>
      <NavLink to="/watchlist">
        <img src={watchlist} alt="Watchlist" />
        <div className="nav-label">Watchlist</div>
      </NavLink>
      <NavLink to="/watched-list">
        <img src={watchedList} alt="Watched list" />
        <div className="nav-label">Watched Movies</div>
      </NavLink>
      <NavLink to="/search">
        <img src={search} alt="Watched list" />
        <div className="nav-label">Search</div>
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
