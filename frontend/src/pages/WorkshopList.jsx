import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import "./../components/WorkshopList.css";
import axios from "axios";
import Workshop from "../components/Workshop";

import { useParams } from "react-router-dom";

function WorkshopList() {
  const [workshopList, setWorkshops] = useState([]);
  let { area } = useParams();

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops/area/` + area);
        setWorkshops(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getWorkshops();
  }, []);

  const handleClick = (e) => {
    console.log(e.target.id);
    window.location.replace("http://localhost:3000/workshops/details/" + e.target.id);
  };

  return (
    <>
      <Navigation />
      <div className="workshopsMainWrapper">
        <div className="workshopsMainTitle">{area}</div>
        <div className="workshopsContainer">
          {workshopList.length == 0 ? (
            <div className="noWorkshopsContainer">Nisu unesene radionice odabrane oblasti!</div>
          ) : (
            <div className="foundWorkshopsContainer">
              <div className="oneWorkshopDetail" onClick={handleClick}>
                {workshopList.map((item) => (
                  <Workshop item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default WorkshopList;
