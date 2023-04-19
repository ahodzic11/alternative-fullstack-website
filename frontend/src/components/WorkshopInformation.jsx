import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../css/WorkshopDetailed.css";

function WorkshopInformation() {
  const [workshop, setWorkshop] = useState([]);
  const [images, setImages] = useState([]);
  const { name } = useParams();
  const path = "http://localhost:5000/newUploads/radionice/" + name + "/";

  useEffect(() => {
    const getWorkshop = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops/` + name);
        setWorkshop(res.data.data);
      } catch (err) {}
    };

    const getSlike = async () => {
      console.log(path);
      try {
        const response = await axios.get(`http://localhost:5000/radionice/` + name);
        setImages(response.data);
      } catch (err) {}
    };

    getWorkshop();
    getSlike();
  }, []);

  return (
    <>
      <Navigation />
      <div className="workshopInformationContainer">
        <div className="workshopInformationTitle">{workshop.naslov}</div>
        <div className="workshopInformationImage">
          <img src={"http://localhost:5000/newuploads/radionice/" + name + "/" + workshop.naslovnaSlika} alt="naslovnaSlika" />
        </div>
        <div className="workshopInformationAbout">
          <span>Sadržaj radionice: </span>
          {workshop.opisRadionice}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Lokacija: </span> {workshop.mjesto}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Datum: </span> {workshop.datum}
        </div>
        <div className="workshopInformationTrainer informationalText">
          <span>Trener/i: </span> {workshop.trener}
        </div>
        <div className="workshopInformationParticipants informationalText">
          <span>Učesnici: </span>
          {workshop.ucesnici}
        </div>
        <div className="workshopInformationDonator informationalText">
          <span>Donator: </span>
          {workshop.nazivDonatora}
        </div>
        <div className="workshopInformationProject informationalText">
          <span>Projekat: </span>
          {workshop.nazivProjekta}
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

export default WorkshopInformation;
