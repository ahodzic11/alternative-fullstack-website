import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../css/ProjectDetailed.css";

function ProjectDetailed() {
  const [project, setProject] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/` + name);
        setProject(res.data.data);
      } catch (err) {}
    };

    getProject();
  }, []);

  const handleClick = (e) => {
    navigate("/projects/projectdetails/" + name);
  };

  return (
    <>
      <Navigation />
      <div className="randomAssDiv">
        <div className="workshopDetailedMainWrapper">
          <div className="firstWrapper">
            <div className="workshopDetailedTitle">{project.naziv}</div>
            <div className="workshopDetailedGoal">{project.cilj}</div>
            <div className="workshopDetailedGoal">
              <p className="moreAboutWorkshopLink" onClick={handleClick}>
                Više o projektu &gt;
              </p>
            </div>
          </div>
          <div className="secondWrapper">
            <img className="workshopImageElement" src={"http://localhost:5000/newuploads/" + name.replace(/ /g, "") + "/" + project.naslovnaSlika} alt="workshopImageElement" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProjectDetailed;
