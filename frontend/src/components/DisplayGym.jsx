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

const DisplayGym = (props) => {
  const userCtx = useContext(UserContext);
  const [gyms, setGyms] = useState([]);
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
    getGyms();
  }, []);

  const addGym = async () => {
    const res = await fetchData(
      "/gyms/addgym",
      "PUT",
      {
        gymname: nameRef.current.value,
        address: addressRef.current.value,
        openinghours: hoursRef.current.value,
        datereset: resetRef.current.value,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      getGyms();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteGym = async (id) => {
    const res = await fetchData(
      "/gyms/deletegym/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      getGyms();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const updateGym = async (id) => {
    const res = await fetchData(
      "/gyms/updategym/" + id,
      "PATCH",
      {
        gymname: nameRef.current.value,
        address: addressRef.current.value,
        openinghours: hoursRef.current.value,
        datereset: resetRef.current.value,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      getGyms();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <div className="container">
      {userCtx.role === "admin" && (
        <>
          <h1>Add New Gym: </h1>
          <br />
          <form>
            <div className="row">
              <input
                type="text"
                ref={nameRef}
                placeholder="Gym Name"
                className="col-md-2"
              ></input>
              <input
                type="text"
                ref={addressRef}
                placeholder="Address"
                className="col-md-2"
              ></input>
              <input
                type="text"
                ref={hoursRef}
                placeholder="Opening Hours"
                className="col-md-2"
              ></input>
              <input
                type="text"
                ref={resetRef}
                placeholder="Last Reset"
                className="col-md-2"
              ></input>

              <button
                type="submit"
                className="col-md-3"
                onClick={() => addGym()}
              >
                Add
              </button>
            </div>
          </form>
          <br />
        </>
      )}

      <br />
      <h2>All Gyms:</h2>

      <div className="row">
        <div className="col-sm-2">Name</div>
        <div className="col-sm-3">Address</div>
        <div className="col-sm-3">Opening Hours</div>
        <div className="col-sm-2">Last Reset</div>
        {userCtx.role === "user" && (
          <>
            <div className="col-sm-2">Last Visit</div>
          </>
        )}
      </div>

      {gyms.map((gym) => (
        <div key={gym.id} className="row">
          <div className="col-sm-2">{gym.gymname}</div>
          <div className="col-sm-3">{gym.address}</div>
          <div className="col-sm-3">{gym.openinghours}</div>
          <div className="col-sm-2">{formatDate(gym.datereset)}</div>
          <div className="col-sm-2">{formatDate(gym.sessiondate)}</div>

          {userCtx.role === "admin" && (
            <>
              <button className="col-sm-1" onClick={() => updateGym(gym.id)}>
                Update
              </button>
              <button className="col-sm-1" onClick={() => deleteGym(gym.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayGym;
