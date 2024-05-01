import React, { useState, useEffect, useRef, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

function formatDate(isoDateString) {
  if (!isoDateString || isNaN(new Date(isoDateString).getTime())) {
    return "";
  }
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
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
const DisplayMain = (props) => {
  const userCtx = useContext(UserContext);
  const [gyms, setGyms] = useState([]);
  const [passes, setPasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const fetchData = useFetch();

  const nameRef = useRef();
  const hoursRef = useRef();
  const addressRef = useRef();
  const resetRef = useRef();

  const getGyms = async () => {
    const res = await fetchData(
      "/sessions/latest/" + userCtx.username,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setGyms(res.data);
      console.log(gyms);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };
  useEffect(() => {
    getRecent();
  }, []);

  const getPasses = async () => {
    const res = await fetchData(
      "/passes/" + userCtx.username,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setPasses(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };
  useEffect(() => {
    getPasses();
  }, []);

  const getRecent = async () => {
    const res = await fetchData(
      "/gyms/" + userCtx.username,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setGyms(res.data);
      console.log(gyms);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getSessions = async () => {
    const res = await fetchData(
      "/sessions/" + userCtx.username,
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      setSessions(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };
  useEffect(() => {
    getSessions();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to compare only the date part

  const recentGyms = gyms.filter((gym) => {
    const sessionDate = new Date(gym.sessiondate);
    return sessionDate < today;
  });

  const recentSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.sessiondate);
    return sessionDate > today;
  });

  return (
    <div className="container">
      <h1>Welcome to Climbuddy!</h1>
      <h2>Hi {userCtx.username}!</h2>
      <br />
      <h2>Here are your remaining passes:</h2>
      {passes.map((pass) => (
        <div key={pass.id} className="row">
          <div className="col-sm-2">{pass.quantity + " passes "}</div>
          <div className="col-sm-3">{pass.gymname}</div>
          <div className="col-sm-2">Expires: {formatDate(pass.expirydate)}</div>
        </div>
      ))}
      <h2>Here are your upcoming sessions:</h2>
      {recentSessions.map((session) => (
        <div key={session.id} className="row">
          <div className="col-sm-2">
            {formatDateWithTime(session.sessiondate)}
          </div>
          <div className="col-sm-3">{session.gymname}</div>
          <div className="col-sm-3">Hosted by: {session.hostname}</div>
          <div className="col-sm-3">Attendee: {session.attendee}</div>
        </div>
      ))}
      <h2>These are the gyms you've went recently:</h2>
      {recentGyms.map((gym) => (
        <div key={gym.id} className="row">
          <div className="col-sm-4">{gym.gymname}</div>
          <div className="col-sm-3">{formatDate(gym.sessiondate)}</div>
        </div>
      ))}
    </div>
  );
};

export default DisplayMain;
