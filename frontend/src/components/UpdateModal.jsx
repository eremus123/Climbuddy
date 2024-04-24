import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user"; // add this too
import { useContext } from "react"; // auto add this

const OverLay = (props) => {
  const fetchData = useFetch();
  const nameRef = useRef("");
  const hoursRef = useRef("");
  const addressRef = useRef("");
  const resetRef = useRef("");

  const userCtx = useContext(UserContext); //add this

  const updateGym = async (id) => {
    const res = await fetchData(
      "/gyms/updategym" + id,
      "PATCH",
      {
        gymname: nameRef.current.value,
        address: addressRef.current.value,
        openinghours: hoursRef.current.value,
        datereset: resetRef.current.value,
      },
      undefined
      // userCtx.accessToken // add this
    );

    if (res.ok) {
      props.getGyms();
      props.setShowUpdateModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    nameRef.current.value = props.gymname;
    addressRef.current.value = props.address;
    resetRef.current.value = props.datereset;
    hoursRef.current.value = props.openinghours;
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Title</div>
          <input ref={nameRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Author</div>
          <input ref={addressRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Year Published</div>
          <input ref={resetRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">opening hours </div>
          <input ref={hoursRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <button onClick={() => updateGym(props.id)} className="col-md-3">
            update
          </button>
          <button
            onClick={() => props.setShowUpdateModal(false)}
            className="col-md-3"
          >
            cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          gymname={props.gymname}
          address={props.address}
          openinghours={props.openinghours}
          setShowUpdateModal={props.setShowUpdateModal}
          getGyms={props.getGyms}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
