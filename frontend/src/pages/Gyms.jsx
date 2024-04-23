import React from "react";
import DisplayGym from "../components/DisplayGym";

const Gyms = (props) => {
  return (
    <DisplayGym
      getImageUrl={props.getImageUrl}
      delGame={props.delGame}
      showUpdateModal={props.showUpdateModal}
      setShowUpdateModal={props.setShowUpdateModal}
      selectedGameDetails={props.selectedGameDetails}
      setSelectedGameDetails={props.setSelectedGameDetails}
    ></DisplayGym>
  );
};

export default Gyms;
