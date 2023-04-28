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

function ReadWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();

  const getWorkshops = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/workshops`);
      setWorkshops(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getWorkshops();
  }, []);

  const editWorkshop = (e, item) => {
    e.preventDefault();
    navigate("/editworkshop/" + formatPath(item.naslov));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/workshop/" + formatPath(item.naslov));
  };

  async function deleteWorkshopItem(e, item) {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/api/workshops/` + item.id);
    } catch (err) {}
    try {
      const res = await axios.delete(`http://localhost:5000/delete/radionice/` + item.naslov);
    } catch (err) {}
    getWorkshops();
  }

  return (
    <>
      <AdminNavigation />
      <div className="readWorkshopContainer">
        <div className="currentLocationHeadline">Unesene radionice</div>
        <div className="filterAndSortingContainer"></div>
        {workshops.map((item) => (
          <div className="basicInfo">
            <div className="firstWorkshopInformation">
              <div className="workshopTitle">{item.naslov}</div>
              <div className="infoItem">{item.mjesto}</div>
              <div className="infoItem">{item.datum}</div>
              <div className="infoItem">{item.trener}</div>
              <div className="infoItem">{item.ucesnici}</div>
              <div className="infoItem">{item.nazivDonatora}</div>
              <div className="infoItem">{item.nazivProjekta}</div>
              <div className="infoItem">{item.cilj}</div>
              <div className="infoItem">{item.opisRadionice}</div>
              <div className="infoItem">{item.oblastRadionice}</div>
            </div>
            <div className="workshopOptions">
              <div className="editWorkshop workshopEditOption" onClick={(e) => editWorkshop(e, item)}>
                <img src={editIcon} />
              </div>
              <div className="changePictureOption workshopEditOption" onClick={(e) => chooseImage(e, item)}>
                <img src={changePictureIcon} />
              </div>
              <div className="deleteWorkshop workshopEditOption" onClick={(e) => deleteWorkshopItem(e, item)}>
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

export default ReadWorkshops;
