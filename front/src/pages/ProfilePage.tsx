import * as React from "react";
import { useEffect, useState } from "react";
import { ProfileCard } from "../components/ProfileCard";
import { getUser } from "../services/user";
import { Loader } from "../components/Loader";
import { MoviesSection } from "../components/MoviesSection";

import "./profile-page-style.css";

export function ProfilePage() {
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
    <>
      {user ? (
        <>
          <div className="profile-details">
            <ProfileCard user={user}></ProfileCard>
            <MoviesSection
              title="Movies you liked on Facebook"
              movies={fbLikedMovies}
            ></MoviesSection>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
