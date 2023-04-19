import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Workshop from "../components/Workshop";
import { useParams, useNavigate } from "react-router-dom";
import "./../css/WorkshopList.css";
import { formatPath } from "../js/namechange";

function WorkshopList() {
  const [workshopList, setWorkshops] = useState([]);
  let { area } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops/area/` + area);
        setWorkshops(res.data.data);
      } catch (err) {}
    };

    getWorkshops();
  }, []);

  const handleClick = (e) => {
    navigate("/workshops/details/" + formatPath(e.target.id));
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
