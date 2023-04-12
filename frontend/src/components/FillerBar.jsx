import Button from "react-bootstrap/Button";
import React from "react";
import bwImage from "../assets/bwImage.jpg";
import "./FillerBar.css";

function FillerBar() {
  function joinIn() {
    const element = document.getElementById("joinPlace");
    element.scrollIntoView();
  }
  return (
    <div className="bwCover">
      <div className="containerElement">
        <div className="coverText">ŽELIŠ SE UKLJUČITI?</div>
        <div className="coverDetails">Sve naše aktivnosti usmjerene su na izgradnju društva jednakih mogućnosti za sve!</div>
        <Button className="buttonJoin" variant="danger" onClick={joinIn}>
          <p className="buttonText">UKLJUČI SE</p>
        </Button>
      </div>
    </div>
  );
}

export default FillerBar;
