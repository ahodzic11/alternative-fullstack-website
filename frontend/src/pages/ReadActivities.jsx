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
import "./../css/ReadProjects.css";
import { formatPath } from "../js/namechange";

function ReadActivities() {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const getActivities = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/activities`);
      setActivities(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getActivities();
  }, []);

  const editActivity = (e, item) => {
    e.preventDefault();
    navigate("/editactivity/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/activity/" + formatPath(item.naziv));
  };

  async function deleteActivityItem(e, item) {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/api/activities/` + item.id);
    } catch (err) {}
    getActivities();
  }

  return (
    <>
      <AdminNavigation />
      <div className="readProjectContainer">
        <div className="currentLocationHeadline">Unesene aktivnosti</div>
        <div className="filterAndSortingContainer"></div>
        {activities.map((item) => (
          <div className="basicInfo">
            <div className="firstProjectInformation">
              <div className="projectTitle">{item.naziv}</div>
              <div className="infoItem">{item.mjesto}</div>
              <div className="infoItem">{item.datum}</div>
              <div className="infoItem">{item.krajImplementacije}</div>
              <div className="infoItem">{item.nazivDonatora}</div>
              <div className="infoItem">{item.nazivProjekta}</div>
              <div className="infoItem">{item.opisAktivnosti}</div>
            </div>
            <div className="projectOptions">
              <div className="editProject projectEditOption" onClick={(e) => editActivity(e, item)}>
                <img src={editIcon} />
              </div>
              <div className="changePictureOption projectEditOption" onClick={(e) => chooseImage(e, item)}>
                <img src={changePictureIcon} />
              </div>
              <div className="deleteProject projectEditOption" onClick={(e) => deleteActivityItem(e, item)}>
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

export default ReadActivities;
