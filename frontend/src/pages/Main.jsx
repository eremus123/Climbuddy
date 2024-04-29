import React, { useContext } from "react";
import UserContext from "../context/user"; // Adjust the import path as necessary

const Main = () => {
  const userCtx = useContext(UserContext);

  return (
    <>
      <h1>Welcome to Climbuddy!</h1>
      <h2>Welcome {userCtx.username}!</h2>

      <h2>Here are your remaining passes:</h2>
      <h2>These are the gyms you've went recently:</h2>
    </>
  );
};

export default Main;
