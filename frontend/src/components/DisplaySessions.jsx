import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const DisplaySessions = (props) => {
  const userCtx = useContext(UserContext);
  const [gyms, setGyms] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionDate, setSessionDate] = useState(""); // New state for session date
  const fetchData = useFetch();

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
      "/sessions/" + userCtx.username,
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

  const addSession = async (gymid) => {
    const res = await fetchData(
      "/sessions/new",
      "PUT",
      {
        sessiondate: sessionDate, //prompt user to input timestamp datetime
        hostname: userCtx.username,
        gymid: gymid,
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

  const handleSessionDateChange = (e) => {
    setSessionDate(e.target.value);
  };

  return (
    <div className="container">
      <br />
      <h2>Create New Session:</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Session Date:
          <input
            type="datetime-local"
            value={sessionDate}
            onChange={handleSessionDateChange}
          />
        </label>
      </form>
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

          <button className="col-sm-1" onClick={() => addSession(gym.id)}>
            New Session
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplaySessions;
