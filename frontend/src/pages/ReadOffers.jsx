import React, { useEffect } from "react";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import editIcon from "./../assets/editIcon.png";
import changePictureIcon from "./../assets/changePicture.png";
import deleteIcon from "./../assets/deleteIcon.png";
import { useNavigate } from "react-router-dom";
import { formatPath } from "../js/namechange";
import "./../css/ReadWorkshops.css";

function ReadOffers() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  const getOffers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/offers`);
      setOffers(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getOffers();
  }, []);

  const editOffer = (e, item) => {
    e.preventDefault();
    navigate("/editoffer/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/offer/" + formatPath(item.naziv));
  };

  async function deleteOfferItem(e, item) {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/api/offers/` + item.id);
    } catch (err) {}
    getOffers();
  }

  return (
    <>
      <AdminNavigation />
      <div className="readWorkshopContainer">
        <div className="currentLocationHeadline">Unesene ponude</div>
        <div className="filterAndSortingContainer"></div>
        {offers.map((item) => (
          <div className="basicInfo">
            <div className="firstWorkshopInformation">
              <div className="workshopTitle">{item.naziv}</div>
              <div className="infoItem">{item.opis}</div>
              <div className="infoItem">{item.sadrzajPonude}</div>
              <div className="infoItem">{item.trener}</div>
              <div className="infoItem">{item.pocetakPonude}</div>
              <div className="infoItem">{item.krajPonude}</div>
              <div className="infoItem">{item.cijena}</div>
              <div className="infoItem">{item.uzrast}</div>
            </div>
            <div className="workshopOptions">
              <div className="editWorkshop workshopEditOption" onClick={(e) => editOffer(e, item)}>
                <img src={editIcon} />
              </div>
              <div className="changePictureOption workshopEditOption" onClick={(e) => chooseImage(e, item)}>
                <img src={changePictureIcon} />
              </div>
              <div className="deleteWorkshop workshopEditOption" onClick={(e) => deleteOfferItem(e, item)}>
                <img src={deleteIcon} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default ReadOffers;
