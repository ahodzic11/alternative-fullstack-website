import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "./../css/Treneri.css";

function Treneri() {
  return (
    <>
      <Navigation />
      <div className="outterContainer">
        <div className="heading text-center">
          <h2>TRENERI</h2>
        </div>
        <div className="trainersContainer">
          <div className="solidBlockContainer"></div>
          <div className="personelContainer">
            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src="https://assets.nicepagecdn.com/d2cc3eaa/2713395/images/5man1.jpg" />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Jeffrey Brown</div>
                <div className="trainerPosition">creative leader</div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" />
                </div>
              </div>
            </div>
            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src="https://assets.nicepagecdn.com/d2cc3eaa/2713395/images/5man1.jpg" />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Jeffrey Brown</div>
                <div className="trainerPosition">creative leader</div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Treneri;
