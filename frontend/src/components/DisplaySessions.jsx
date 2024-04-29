import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const DisplaySessions = (props) => {
  const userCtx = useContext(UserContext);
  const [gyms, setGyms] = useState([]);
  const [sessions, setSessions] = useState([]);
  const fetchData = useFetch();

  const sessiondateRef = useRef();
  const hostnameRef = useRef();
  const gymidRef = useRef();

  const getGyms = async () => {
    const res = await fetchData("/gyms", "GET", undefined, userCtx.accessToken);
    if (res.ok) {
      setGyms(res.data);
      console.log(gyms);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };
  useEffect(() => {
    getGyms();
  }, []);

  const getSessions = async () => {
    const res = await fetchData(
      "/sessions/" + username,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setSessions(res.data);
      console.log(gyms);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };
  useEffect(() => {
    getSessions();
  }, []);

  const addSession = async () => {
    const res = await fetchData(
      "/sessions/new",
      "PUT",
      {
        sessiondate: sessiondateRef.current.value,
        hostname: hostnameRef.current.value,
        gymid: gymidRef.current.value,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      getSessions();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <div className="container">
      <br />
      <h2>Create New Session:</h2>

      <div className="row">
        <div className="col-sm-3">Name</div>
        <div className="col-sm-3">Opening Hours</div>
        <div className="col-sm-3">Address</div>
        <div className="col-sm-1">Last Reset</div>
      </div>

      {gyms.map((gym) => (
        <div key={gym.id} className="row">
          <div className="col-sm-3">{gym.gymname}</div>
          <div className="col-sm-3">{gym.address}</div>
          <div className="col-sm-3">{gym.openinghours}</div>
          <div className="col-sm-1">{gym.datereset}</div>

          <button className="col-sm-1" onClick={() => createSession(gym.id)}>
            New Session
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplaySessions;
