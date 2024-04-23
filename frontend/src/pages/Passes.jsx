import React from "react";
import DisplayGame from "../components/DisplayGym";

const Passes = (props) => {
  return (
    <DisplayGame
      getImageUrl={props.getImageUrl}
      delGame={props.delGame}
      showUpdateModal={props.showUpdateModal}
      setShowUpdateModal={props.setShowUpdateModal}
      selectedGameDetails={props.selectedGameDetails}
      setSelectedGameDetails={props.setSelectedGameDetails}
    ></DisplayGame>
  );
};

export default Passes;
