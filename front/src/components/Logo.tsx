import React from "react";
import logoImg from "../img/movieTape.png";

export function Logo() {
  return (
    <div className="logo">
      <img src={logoImg} className="logoImg" alt="movieTape" />
      Filmfinity
    </div>
  );
}
