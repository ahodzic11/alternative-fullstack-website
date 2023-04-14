import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import "./../components/WorkshopInformation.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function WorkshopDetailed() {
  const [workshop, setWorkshop] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const getWorkshop = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops/` + name);
        setWorkshop(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getWorkshop();
  }, []);

  const handleClick = (e) => {
    console.log(name);
    window.location.replace("http://localhost:3000/workshops/workshopdetails/" + name);
  };

  return (
    <>
      <Navigation />
      <div className="randomAssDiv">
        <div className="workshopDetailedMainWrapper">
          <div className="firstWrapper">
            <div className="workshopDetailedTitle">{workshop.naslov}</div>
            <div className="workshopDetailedGoal">{workshop.cilj}</div>
            <div className="workshopDetailedGoal">
              <p className="moreAboutWorkshopLink" onClick={handleClick}>
                Više o radionici &gt;
              </p>
            </div>
          </div>
          <div className="secondWrapper">
            <img className="workshopImageElement" src={"http://localhost:5000/newuploads/" + name.replace(/ /g, "") + "/" + workshop.naslovnaSlika} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WorkshopDetailed;
