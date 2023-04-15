import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Button from "react-bootstrap/Button";
import WorkshopArea from "../components/WorkshopArea";
import "./../components/Workshops.css";

function Workshops() {
  const [workshopArea, setWorkshopArea] = useState([]);
  let image = "https://images.freeimages.com/images/previews/ac9/railway-hdr-1361893.jpg";

  useEffect(() => {
    // PREUREDIT DA RADI SA BAZOM PODATAKA
    function getWorkshopAreas() {
      let oblastiRadionica = ["Civilno Društvo", "Izgradnja samopoštovanja i samopouzdanja", "Ekologija i zdravlje", "Dječje kreativne radionice", "Izgradnja mira", "Kultura i obrazovanje", "Ljudska prava", "Prevencija rodno zasnovanog nasilja", "Prevencija bolesti ovisnosti", "Jačanje kompetencija mladih"];
      setWorkshopArea(oblastiRadionica);
    }

    getWorkshopAreas();
  }, []);

  const handleClick = (e) => {
    window.location.replace("http://localhost:3000/workshops/" + e.target.id);
  };

  const handleClickAllWorkshops = (e) => {
    window.location.replace("http://localhost:3000/allworkshops/");
  };

  return (
    <>
      <Navigation />
      <div className="workshopsMainWrapper">
        <div className="workshopsMainTitle">Radionice</div>
        <div className="workshopsIntro">
          U udruženju Alternative kakanj uspješno se oblikuju radionice za djecu i odrasle i koriste priručnici sa dobro razvijenim trening materijalima. Za nove teme kao npr. Prevencija rodno zasnovanog nasilja, Različite uloge vijećnika i dr. Uz razvijanje materijal organizujemo trening za trenere kako bismo na najbolji mogući način odgovorili na potrebe u zajednici. Osim radionica u okviru
          naših projekata i aktivnosti pružamo i trenerske usluge za druge projekte i organizacije.
        </div>
        <div className="allWorkshops">
          <Button className="viewAllWorkshops" variant="danger" onClick={handleClickAllWorkshops}>
            <p className="buttonText">SVE RADIONICE</p>
          </Button>
        </div>
        <div className="workshopsAreasContainer">
          {workshopArea.map((area) => (
            <div className="workshopAreaSingleItem" onClick={handleClick}>
              <WorkshopArea item={area} image={image} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Workshops;
