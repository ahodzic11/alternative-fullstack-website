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

function ReadNews() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  const getNews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/news`);
      setNews(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getNews();
  }, []);

  const editNews = (e, item) => {
    e.preventDefault();
    navigate("/editnews/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/news/" + formatPath(item.naziv));
  };

  async function deleteNewsItem(e, item) {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/api/news/` + item.id);
    } catch (err) {}
    getNews();
  }

  return (
    <>
      <AdminNavigation />
      <div className="readProjectContainer">
        <div className="currentLocationHeadline">Unesene vijesti</div>
        <div className="filterAndSortingContainer"></div>
        {news.map((item) => (
          <div className="basicInfo">
            <div className="firstProjectInformation">
              <div className="projectTitle">{item.naziv}</div>
              <div className="infoItem">{item.tema}</div>
              <div className="infoItem">{item.datum}</div>
              <div className="infoItem">{item.krajImplementacije}</div>
              <div className="infoItem">{item.tekstVijesti}</div>
            </div>
            <div className="projectOptions">
              <div className="editProject projectEditOption" onClick={(e) => editNews(e, item)}>
                <img src={editIcon} />
              </div>
              <div className="changePictureOption projectEditOption" onClick={(e) => chooseImage(e, item)}>
                <img src={changePictureIcon} />
              </div>
              <div className="deleteProject projectEditOption" onClick={(e) => deleteNewsItem(e, item)}>
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

export default ReadNews;
