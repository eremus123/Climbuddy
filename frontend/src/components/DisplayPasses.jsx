import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

const DisplayGym = (props) => {
  const userCtx = useContext(UserContext);
  const [gyms, setGyms] = useState([]);
  const [passes, setPasses] = useState([]);
  const fetchData = useFetch();

  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today
  const [expiryDate, setExpiryDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0]
  ); // Default to today + 1 year
  const [quantity, setQuantity] = useState(10); // Default to 10
  const [costPrice, setCostPrice] = useState(0);

  const getGyms = async () => {
    const res = await fetchData("/gyms", "GET", undefined, userCtx.accessToken);
    if (res.ok) {
      setGyms(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };
  useEffect(() => {
    getGyms();
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

  const buyPasses = async (gymid) => {
    const res = await fetchData(
      "/passes/buy/" + userCtx.username,
      "PUT",
      {
        username: userCtx.username,
        purchasedate: purchaseDate,
        expirydate: expiryDate,
        quantity: quantity,
        costprice: costPrice,
        gymid: gymid,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      getPasses();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const usePass = async (sessionid) => {
    const res = await fetchData(
      "/passes/use/" + sessionid,
      "PATCH",
      {
        quantity: 1,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      getPasses();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deletePasses = async (passid) => {
    const res = await fetchData(
      "/passes/clear/" + passid,
      "DELETE",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      getPasses();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <div className="container">
      <br />
      <h2>Manage Passes:</h2>
      <div className="row">
        <div className="col-sm-3">Gym Name</div>
        <div className="col-sm-2">Purchase Date</div>
        <div className="col-sm-2">Expiry Date</div>
        <div className="col-sm-1">Cost</div>
        <div className="col-sm-1">Quantity</div>
      </div>
      {passes.map((pass) => (
        <div key={pass.id} className="row">
          <div className="col-sm-3">{pass.gymname}</div>
          <div className="col-sm-2">{formatDate(pass.purchasedate)}</div>
          <div className="col-sm-2">{formatDate(pass.expirydate)}</div>
          <div className="col-sm-1">{"$" + pass.costprice}</div>
          <div className="col-sm-1">{pass.quantity + " passes"}</div>
          <button className="col-sm-1" onClick={() => usePass(pass.id)}>
            Use Pass
          </button>
          <button className="col-sm-1" onClick={() => deletePasses(pass.id)}>
            Delete
          </button>
        </div>
      ))}
      <h2>Add Passes:</h2>
      <div className="row">
        <div className="col-sm-3">
          <label htmlFor="purchaseDate">Purchase Date:</label>
          <input
            type="date"
            id="purchaseDate"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="col-sm-3">
          <label htmlFor="costPrice">Cost:</label>
          <input
            type="number"
            id="costPrice"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-3">Gym Name</div>
        <div className="col-sm-7">Address</div>
      </div>
      {gyms.map((gym) => (
        <div key={gym.id} className="row">
          <div className="col-sm-3">{gym.gymname}</div>
          <div className="col-sm-7">{gym.address}</div>
          <button className="col-sm-2" onClick={() => buyPasses(gym.id)}>
            I bought passes here!
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayGym;
