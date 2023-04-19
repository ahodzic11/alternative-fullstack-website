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

function ReadProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const getProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects`);
      setProjects(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getProjects();
  }, []);

  const editProject = (e, item) => {
    e.preventDefault();
    navigate("/editproject/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/project/" + formatPath(item.naziv));
  };

  async function deleteProjectItem(e, item) {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/api/projects/` + item.id);
    } catch (err) {}
    getProjects();
  }

  return (
    <>
      <AdminNavigation />
      <div className="readProjectContainer">
        <div className="currentLocationHeadline">Uneseni projekti</div>
        <div className="filterAndSortingContainer"></div>
        {projects.map((item) => (
          <div className="basicInfo">
            <div className="firstProjectInformation">
              <div className="projectTitle">{item.naziv}</div>
              <div className="infoItem">{item.mjesto}</div>
              <div className="infoItem">{item.pocetakImplementacije}</div>
              <div className="infoItem">{item.krajImplementacije}</div>
              <div className="infoItem">{item.nazivDonatora}</div>
              <div className="infoItem">{item.cilj}</div>
              <div className="infoItem">{item.opisProjekta}</div>
            </div>
            <div className="projectOptions">
              <div className="editProject projectEditOption" onClick={(e) => editProject(e, item)}>
                <img src={editIcon} />
              </div>
              <div className="changePictureOption projectEditOption" onClick={(e) => chooseImage(e, item)}>
                <img src={changePictureIcon} />
              </div>
              <div className="deleteProject projectEditOption" onClick={(e) => deleteProjectItem(e, item)}>
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

export default ReadProjects;
