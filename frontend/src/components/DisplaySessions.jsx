import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

function formatDateWithTime(isoDateString) {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12; // Convert 24-hour format to 12-hour format

  return `${day} ${month} ${year} @ ${hour12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;
}

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
      "/sessions/",
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

  const deleteSession = async (id) => {
    const res = await fetchData(
      "/sessions/delete/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      getSessions();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const joinSession = async (sessionid) => {
    const res = await fetchData(
      "/sessions/join/" + sessionid,
      "PATCH",
      {
        username: userCtx.username,
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
  const leaveSession = async (sessionid) => {
    const res = await fetchData(
      "/sessions/join/" + sessionid,
      "PATCH",
      {
        username: null,
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
      <h2>Join Sessions:</h2>
      <div className="row">
        <div className="col-sm-2">Session Date</div>
        <div className="col-sm-3">Gym Name</div>
        <div className="col-sm-1">Host</div>
        <div className="col-sm-1">Attendee</div>
      </div>
      {sessions.map((session) => (
        <div key={session.id} className="row">
          <div className="col-sm-2">
            {formatDateWithTime(session.sessiondate)}
          </div>
          <div className="col-sm-3">{session.gymname}</div>
          <div className="col-sm-1">{session.hostname}</div>
          <div className="col-sm-1">{session.attendee}</div>
          <button className="col-sm-2" onClick={() => joinSession(session.id)}>
            Join Session
          </button>
          <button className="col-sm-2" onClick={() => leaveSession(session.id)}>
            Leave Session
          </button>
          {userCtx.role === "admin" && (
            <>
              <button
                className="col-sm-1"
                onClick={() => deleteSession(session.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
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
          <button className="col-sm-2" onClick={() => addSession(gym.id)}>
            New Session
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplaySessions;
