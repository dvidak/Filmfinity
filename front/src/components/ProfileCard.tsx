import React from "react";
import avatar from "../img/user.png";

export function ProfileCard({ user }: any) {
  return (
    <div className="profile-card">
      <img src={avatar} alt="None" className="avatar"></img>
      <div>
        <p>Name: {user.firstName}</p>
        <p>Lastname: {user.lastName}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}
