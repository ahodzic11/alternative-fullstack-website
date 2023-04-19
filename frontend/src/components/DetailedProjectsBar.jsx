import React from "react";
import bosniaBeyond from "./../assets/bosniabeyond.jpg";
import kick from "./../assets/kick.jpg";
import enetrgetskaTranzicija from "./../assets/energetskatranzicija.jpg";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./../css/DetailedProjectsBar.css";

function DetailedProjectsBar() {
  const navigate = useNavigate();
  const goToAllProjects = (e) => {
    e.preventDefault();
    navigate("/projekti");
  };

  const handleClick = (e) => {
    console.log(e.target);
    navigate("/projects/details/" + e.target.id);
  };

  return (
    <div className="detailedProjectsContainer">
      <div className="projectsTitle">Aktuelni projekti</div>
      <div className="projectsContainerNew">
        <div id="bosnia-beyond-the-emergency" className="bosniaBeyondProject projectItem" onClick={handleClick}>
          <img id="bosnia-beyond-the-emergency" className="projectLogo" src={bosniaBeyond} alt="bosniaBeyond" />
          <div id="bosnia-beyond-the-emergency" className="projectHeadline">
            Balkanska migrantska ruta
          </div>
          <div id="bosnia-beyond-the-emergency" className="projectText">
            Bosnia: Beyond the emergency
          </div>
        </div>
        <div id="Kreativni%20inovacijski%20centar%20Kakanj%20-%20KICK" className="kick projectItem" onClick={handleClick}>
          <img id="Kreativni%20inovacijski%20centar%20Kakanj%20-%20KICK" className="projectLogo" src={kick} alt="kick" />
          <div id="Kreativni%20inovacijski%20centar%20Kakanj%20-%20KICK" className="projectHeadline">
            Program podrške mladima
          </div>
          <div id="Kreativni%20inovacijski%20centar%20Kakanj%20-%20KICK" className="projectText">
            Kreativni inovacijski centar - KICK
          </div>
        </div>
        <div id="Budućnost%20Kaknja%20prema%20pravednoj%20energetskoj%20tranziciji" className="kakanjFuture projectItem" onClick={handleClick}>
          <img id="Budućnost%20Kaknja%20prema%20pravednoj%20energetskoj%20tranziciji" className="projectLogo" src={enetrgetskaTranzicija} alt="enetrgetskaTranzicija" />
          <div id="Budućnost%20Kaknja%20prema%20pravednoj%20energetskoj%20tranziciji" className="projectHeadline">
            Stop aerozagađenju
          </div>
          <div id="Budućnost%20Kaknja%20prema%20pravednoj%20energetskoj%20tranziciji" className="projectText">
            Budućnost Kaknja: prema pravednoj energetskoj transformaciji
          </div>
        </div>
      </div>
      <Button className="projectsButton" variant="outline-dark" onClick={goToAllProjects}>
        <div className="projectsButtonText">SVI PROJEKTI</div>
      </Button>
    </div>
  );
}

export default DetailedProjectsBar;
