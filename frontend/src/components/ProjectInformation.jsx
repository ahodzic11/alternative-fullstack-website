import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../css/WorkshopDetailed.css";
import { formatPath } from "../js/namechange";

function ProjectInformation() {
  const [project, setProject] = useState([]);
  const [images, setImages] = useState([]);
  const { name } = useParams();
  const path = "http://localhost:5000/newuploads/projekti/" + name + "/";

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/` + name);
        setProject(res.data.data);
      } catch (err) {}
    };

    const getSlike = async () => {
      console.log(path);
      try {
        const response = await axios.get(`http://localhost:5000/projekti/` + name);
        setImages(response.data);
      } catch (err) {}
    };

    getProject();
    getSlike();
  }, []);

  return (
    <>
      <Navigation />
      <div className="workshopInformationContainer">
        <div className="workshopInformationTitle">{project.naziv}</div>
        <div className="workshopInformationImage">
          <img src={"http://localhost:5000/newuploads/projekti/" + name + "/" + project.naslovnaSlika} alt="naslovnaSlika" />
        </div>
        <div className="workshopInformationAbout">
          <span>Sadržaj projekta: </span>
          {project.opisProjekta}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Lokacija: </span> {project.mjesto}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Početak implementacije: </span> {project.pocetakImplementacije}
        </div>

        <div className="workshopInformationPlace informationalText">
          <span>Kraj implementacije: </span> {project.krajImplementacije}
        </div>
        <div className="workshopInformationDonator informationalText">
          <span>Donator: </span>
          {project.nazivDonatora}
        </div>
        <div className="workshopInformationProject informationalText">
          <span>Grant: </span>
          {project.projektniGrant} KM
        </div>
        <div className="workshopInformationProject informationalText">
          <span>Ciljna grupa: </span>
          {project.ciljnaGrupa} KM
        </div>
        <div className="workshopImagesHeadline">
          <span>Slike:</span>{" "}
        </div>
        <div className="workshopImages">
          {images.map((image) => (
            <img id={image} className="workshopInformationImageElement" src={path + image} alt="slikaSRadionice" />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProjectInformation;
