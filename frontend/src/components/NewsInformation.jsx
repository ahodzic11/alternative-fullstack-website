import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../css/WorkshopDetailed.css";
import { formatPath } from "../js/namechange";

function NewsInformation() {
  const [news, setNews] = useState([]);
  const [images, setImages] = useState([]);
  const { name } = useParams();
  const path = "http://localhost:5000/newUploads/vijesti/" + name + "/";

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/` + name);
        setNews(res.data.data);
      } catch (err) {}
    };

    const getSlike = async () => {
      console.log(path);
      try {
        const response = await axios.get(`http://localhost:5000/vijesti/` + name);
        setImages(response.data);
      } catch (err) {}
    };

    getNews();
    getSlike();
  }, []);

  return (
    <>
      <Navigation />
      <div className="workshopInformationContainer">
        <div className="workshopInformationTitle">{news.naziv}</div>
        <div className="workshopInformationImage">
          <img src={"http://localhost:5000/newuploads/vijesti/" + name + "/" + news.naslovnaSlika} alt="naslovnaSlika" />
        </div>
        <div className="workshopInformationAbout">
          <span>Sadržaj vijesti: </span>
          {news.tekstVijesti}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Tema: </span> {news.tema}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Datum: </span> {news.datum}
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

export default NewsInformation;
