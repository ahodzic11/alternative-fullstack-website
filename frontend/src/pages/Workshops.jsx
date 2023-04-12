import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ProjectKick from "../components/ProjectKick";
import "./../components/Workshops.css";
import axios from "axios";
import Workshop from "../components/Workshop";
import { getWorkshops } from "../redux/apiCalls";

function Workshops() {
  const [workshopList, setWorkshops] = useState([]);

  const checkWorkshopList = (e) => {
    console.log(workshopList);
  };

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
    getWorkshops();
  }, []);

  return (
    <>
      <Navigation />
      <div className="randomDiv" onClick={checkWorkshopList}></div>
      <div className="workshopsContainer">
        {workshopList.map((item) => (
          <Workshop item={item} key={item.id} />
        ))}
      </div>
      <Footer />
    </>
  );
}

/*

*/

export default Workshops;
