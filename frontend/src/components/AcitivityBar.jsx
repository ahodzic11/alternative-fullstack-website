import React, { useEffect, useState } from "react";
import axios from "axios";
import Offer from "./Offer";
import "./../css/ActivityBar.css";

function AcitivityBar() {
  const [offerList, setOffers] = useState([]);

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
