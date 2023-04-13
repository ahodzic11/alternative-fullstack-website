import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ProjectKick from "../components/ProjectKick";
import "./../components/Workshops.css";
import axios from "axios";
import Workshop from "../components/Workshop";
import { getWorkshops } from "../redux/apiCalls";
import WorkshopArea from "../components/WorkshopArea";

function Workshops() {
  const [workshopList, setWorkshops] = useState([]);
  const [workshopArea, setWorkshopArea] = useState([]);
  let image = "https://images.freeimages.com/images/previews/ac9/railway-hdr-1361893.jpg";

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops`);
        setWorkshops(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    /*
<option value="civilnoDrustvo">Civilno društvo</option>
                  <option value="izgradnjaSamopostovanjaISamopouzdanja">Izgradnja samopoštovanja i samopouzdanja</option>
                  <option value="ekologijaIZdravlje">Ekologija i zdravlje</option>
                  <option value="djecjeKreativneRadionice">Dječje kreativne radionice</option>
                  <option value="izgradnjaMira">Izgradnja mira</option>
                  <option value="kultiraIObrazovanje">Kultura i obrazovanje</option>
                  <option value="ljudskaPrava">Ljudska prava</option>
                  <option value="prevencijaRodnoZasnovanogNasilja">Prevencija rodno zasnovanog nasilja</option>
                  <option value="prevencijaBolestiOvisnosti">Prevencija bolesti ovisnosti</option>
                  <option value="jacanjeKompetencijaMladih">Jačanje kompetencija mladih</option>
    */

    // PREUREDIT DA RADI SA BAZOM PODATAKA
    function getWorkshopAreas() {
      let oblastiRadionica = ["Civilno Društvo", "Izgradnja samopoštovanja i samopouzdanja", "Ekologija i zdravlje", "Dječje kreativne radionice", "Izgradnja mira", "Kultura i obrazovanje", "Ljudska prava", "Prevencija rodno zasnovanog nasilja", "Prevencija bolesti ovisnosti", "Jačanje kompetencija mladih"];
      let image = "https://images.freeimages.com/images/previews/ac9/railway-hdr-1361893.jpg";
      setWorkshopArea(oblastiRadionica);
    }

    getWorkshops();
    getWorkshopAreas();
  }, []);

  const handleClick = (e) => {
    console.log("uslo ovdje");
    console.log(e.target);
    window.location.replace("http://localhost:3000/workshops/" + e.target.id);
  };

  return (
    <>
      <Navigation />
      <div className="workshopsMainWrapper">
        <div className="workshopsMainTitle">Radionice</div>
        <div className="workshopsIntro">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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

/*

        <div className="workshopsContainer">
          {workshopList.map((item) => (
            <Workshop item={item} key={item.id} />
          ))}
        </div>
*/

export default Workshops;
