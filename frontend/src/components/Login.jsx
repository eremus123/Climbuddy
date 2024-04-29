import React from "react";
import { useContext } from "react";
import UserContext from "../context/user";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";

const Login = (props) => {
  const fetchData = useFetch();

  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetchData("/auth/login/", "POST", { username, password });
    console.log(res);
    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role);
      userCtx.setUsername(decoded.username);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-4"></div>
        <input
          type="text"
          className="col-md-4"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <input
          type="password"
          className="col-md-4"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <button className="col-md-4" type="submit" onClick={handleLogin}>
          login
        </button>
        <div className="col-md-4"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4"></div>
        <button
          className="col-md-4"
          type="submit"
          onClick={() => props.setShowLogin(false)}
        >
          go to registration screen
        </button>
        <div className="col-md-4"></div>
      </div>
    </>
  );
};

export default Login;
