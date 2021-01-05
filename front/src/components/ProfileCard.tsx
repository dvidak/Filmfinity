import React from "react";
import avatar from "../img/user.png";

export function ProfileCard({ user }: any) {
  const profilePictureUrl = localStorage.getItem("picture");

  return (
    <div className="profile-card">
      <img
        src={profilePictureUrl ? profilePictureUrl : avatar}
        alt="None"
        className="avatar"
      />
      <div className="profile-card__info">
        <h1>
          Hello, {user.firstName} {user.lastName}!
        </h1>
        <h2>{user.email}</h2>
      </div>
    </div>
  );
}
