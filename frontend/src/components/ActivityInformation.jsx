import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../css/WorkshopDetailed.css";

function ActivityInformation() {
  const [activity, setActivity] = useState([]);
  const [images, setImages] = useState([]);
  const { name } = useParams();
  const path = "http://localhost:5000/newUploads/" + name.replace(/ /g, "") + "/";

  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/activities/` + name);
        setActivity(res.data.data);
      } catch (err) {}
    };

    const getSlike = async () => {
      console.log(path);
      try {
        const response = await axios.get(`http://localhost:5000/` + name.replace(/ /g, ""));
        setImages(response.data);
      } catch (err) {}
    };

    getActivity();
    getSlike();
  }, []);

  return (
    <>
      <Navigation />
      <div className="workshopInformationContainer">
        <div className="workshopInformationTitle">{name}</div>
        <div className="workshopInformationImage">
          <img src={"http://localhost:5000/newuploads/" + name.replace(/ /g, "") + "/" + activity.naslovnaSlika} alt="naslovnaSlika" />
        </div>
        <div className="workshopInformationAbout">
          <span>Sadržaj aktivnosti: </span>
          {activity.opisAktivnosti}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Lokacija: </span> {activity.mjesto}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Datum: </span> {activity.datum}
        </div>
        <div className="workshopInformationDonator informationalText">
          <span>Donator: </span>
          {activity.nazivDonatora}
        </div>
        <div className="workshopInformationProject informationalText">
          <span>Projekat: </span>
          {activity.nazivProjekta}
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

export default ActivityInformation;
