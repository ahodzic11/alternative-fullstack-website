import React, { useEffect, useState } from "react";
import itLogo from "./../assets/it.png";
import kidsCreative from "./../assets/kids.png";
import englishWorkshop from "./../assets/english.png";
import birthdayLogo from "./../assets/gift.png";
import robotLogo from "./../assets/robot.png";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./../css/ActivityBar.css";
import Offer from "./Offer";
import { useNavigate } from "react-router-dom";
import { formatPath } from "../js/namechange";

function AcitivityBar() {
  const [offerList, setOffers] = useState([]);
  const path = "http://localhost:5000/newUploads/ponude/";
  const navigate = useNavigate();

  useEffect(() => {
    const getOffers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/offers`);
        setOffers(res.data.data);
      } catch (err) {}
    };
    getOffers();
  }, []);

  return (
    <div className="activityContainer">
      <div id="joinPlace"></div>
      <div className="joinActivityText">Pridružite se aktivnostima u KICK-u</div>
      <div className="activities">
        {offerList.map((offer) => (
          <Offer item={offer} />
        ))}
      </div>
    </div>
  );
}

export default AcitivityBar;
