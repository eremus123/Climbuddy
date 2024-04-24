import React, { useState, useEffect, useRef, useContext } from "react";
import UpdateModal from "./UpdateModal";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const DisplayGym = (props) => {
  //users
  const [gameNames, setGameNames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGameName, setSelectedGameName] = useState("");
  const [userName, setUserName] = useState("");
  const [userGroup, setUserGroup] = useState("");

  const searchRef = useRef();
  const abortController = new AbortController();

  //implement;
  const userCtx = useContext(UserContext);
  const [gyms, setGyms] = useState([]);
  const fetchData = useFetch();

  const titleRef = useRef();
  const authorRef = useRef();
  const yearRef = useRef();

  const getGyms = async () => {
    const res = await fetchData("/gyms", "GET", undefined, undefined);
    if (res.ok) {
      setGyms(res.data);
      console.log(gyms);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };
  //end
  useEffect(() => {
    getGyms();
  }, []);

  const addBook = async () => {
    const res = await fetchData(
      "/api/books",
      "PUT",
      {
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: yearRef.current.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      getBooks();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteBook = async (id) => {
    const res = await fetchData(
      "/api/books/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      getBooks();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <div className="container">
      {props.showUpdateModal && (
        <UpdateModal
          gameid={props.selectedGameDetails.gameid}
          gamename={props.selectedGameDetails.gamename}
          owner={props.selectedGameDetails.owner}
          group={props.selectedGameDetails.group}
          status={props.selectedGameDetails.status}
          recordid={props.selectedGameDetails.recordid}
          fetchGames={fetchGames}
          setShowUpdateModal={props.setShowUpdateModal}
        />
      )}

      <h1>Search or Add New Gym: </h1>
      <br />
      <form>
        <div className="row">
          <input
            type="text"
            ref={searchRef}
            placeholder="Search Gym?"
            className="col-md-9"
          ></input>

          <button type="submit" className="col-md-3" onClick={getGame}>
            Search
          </button>
        </div>
      </form>

      <div id="gameNames">
        <br />
        {showModal && (
          <form onSubmit={getGame}>
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your Group"
                value={userGroup}
                onChange={(e) => setUserGroup(e.target.value)}
              />
              <br></br>
              <button type="submit" onClick={addGame}>
                Bought Passes
              </button>
              <button type="submit" onClick={addWishlist}>
                Sell Passes
              </button>
            </div>
          </form>
        )}
        <br />
        {gameNames.map((game, index) => (
          <div key={index}>
            <img src={game.imgUrl} alt={game.name} />
            <span>{game.name}</span>
            <button
              className="col-sm-1"
              onClick={() => {
                setSelectedGameName(game.name);
                setShowModal(true);
              }}
            >
              Add Gym
            </button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <h2>All Gyms:</h2>

      <div className="row">
        <div className="col-sm-2">Name</div>
        <div className="col-sm-3">Opening Hours</div>
        <div className="col-sm-3">Address</div>
        <div className="col-sm-1">Last Visited</div>
        <div className="col-sm-1">Last Reset</div>
      </div>

      {gyms.map((gym) => (
        <div key={gym.id} className="row">
          <div className="col-sm-2">{gym.gymname}</div>
          <div className="col-sm-3">{gym.address}</div>
          <div className="col-sm-3">{gym.openingghours}</div>
          <div className="col-sm-1">{gym.datereset}</div>
          <div className="col-sm-1">{gym.datereset}</div>
          <button className="col-sm-1" onClick={() => props.delGame(game.id)}>
            Update
          </button>
          <button
            className="col-sm-1"
            onClick={() => {
              props.setSelectedGameDetails({
                ...game.fields,
                recordid: game.id, // Include the record ID here
              });
              props.setShowUpdateModal(true);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayGym;
