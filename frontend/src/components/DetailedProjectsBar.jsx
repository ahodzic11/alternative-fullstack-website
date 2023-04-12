import React from "react";
import "./DetailedProjectsBar.css";
import bosniaBeyond from "./../assets/bosniabeyond.jpg";
import kick from "./../assets/kick.jpg";
import enetrgetskaTranzicija from "./../assets/energetskatranzicija.jpg";
import Button from "react-bootstrap/Button";

function DetailedProjectsBar() {
  return (
    <div className="detailedProjectsContainer">
      <div className="projectsTitle">Projekti</div>
      <div className="projectsContainerNew">
        <div className="bosniaBeyondProject projectItem">
          <img className="projectLogo" src={bosniaBeyond} alt="bosniaBeyond" />
          <div className="projectHeadline">Razbijemo predrasude prema osobama u pokretu</div>
          <div className="projectText">Bosnia: Beyond the emergency</div>
        </div>
        <a id="detailedLink" href="/projects">
          <div className="kick projectItem">
            <img className="projectLogo" src={kick} alt="kick" />
            <div className="projectHeadline">Program podrške mladima</div>
            <div className="projectText">Kreativni inovacijski centar - KICK</div>
          </div>
        </a>
        <div className="kakanjFuture projectItem">
          <img className="projectLogo" src={enetrgetskaTranzicija} alt="enetrgetskaTranzicija" />
          <div className="projectHeadline">Stop aerozagađenju</div>
          <div className="projectText">Budućnost Kaknja: prema pravednoj energetskoj transformaciji</div>
        </div>
      </div>
      <Button className="projectsButton" variant="outline-dark">
        <div className="projectsButtonText">PROJEKTI</div>
      </Button>
    </div>
  );
}

export default DetailedProjectsBar;
