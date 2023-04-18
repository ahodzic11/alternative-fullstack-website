import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../css/NewsDetailed.css";

function NewsDetailed() {
  const [news, setNews] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/` + name);
        setNews(res.data.data);
      } catch (err) {}
    };

    getNews();
  }, []);

  const handleClick = (e) => {
    navigate("/news/newsdetails/" + name);
  };

  return (
    <>
      <Navigation />
      <div className="randomAssDiv">
        <div className="workshopDetailedMainWrapper">
          <div className="firstWrapper">
            <div className="workshopDetailedTitle">{news.naziv}</div>
            <div className="workshopDetailedGoal">{news.tema}</div>
            <div className="workshopDetailedGoal">
              <p className="moreAboutWorkshopLink" onClick={handleClick}>
                Više o vijesti &gt;
              </p>
            </div>
          </div>
          <div className="secondWrapper">
            <img className="workshopImageElement" src={"http://localhost:5000/newuploads/" + name.replace(/ /g, "") + "/" + news.naslovnaSlika} alt="workshopImageElement" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NewsDetailed;
