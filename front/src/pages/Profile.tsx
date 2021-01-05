import * as React from "react";
import { useEffect, useState } from "react";
import { Movies } from "../components/Movies";
import { ProfileCard } from "../components/ProfileCard";
import { getUser } from "../services/user";
import loader from "../img/loader.gif";
import { Header } from "../components/Header";
import { Navbar } from "../components";

export function Profile() {
  const [user, setUser] = useState();
  const [fbLikedMovies, setFbLikedMovies] = useState([]);
  useEffect(() => {
    getUser().then((user: any) => {
      setUser(user);
      setFbLikedMovies(user.mappedFbLikedMovies);
      console.log(user.mappedFbLikedMovies);
    });
  }, []);

  return (
    <div className="profile-wrapper">
      <Header />
      <Navbar />
      {user ? (
        <>
          <div className="profile-details">
            <ProfileCard user={user}></ProfileCard>
            <Movies
              title="Movies you liked on Facebook"
              movies={fbLikedMovies}
            ></Movies>
          </div>
        </>
      ) : (
        <div className="loader">
          <img src={loader} className="loader-gif" alt="loading" />
        </div>
      )}
    </div>
  );
}
