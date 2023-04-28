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
import "./../css/ReadWorkshops.css";
import { formatPath } from "../js/namechange";

function ReadArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const getArticles = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/articles`);
      setArticles(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getArticles();
  }, []);

  const editArticle = (e, item) => {
    e.preventDefault();
    navigate("/editarticle/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/clanak/" + formatPath(item.naziv));
  };

  async function deleteArticleItem(e, item) {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/api/articles/` + item.id);
    } catch (err) {}
    getArticles();
  }

  return (
    <>
      <AdminNavigation />
      <div className="readWorkshopContainer">
        <div className="currentLocationHeadline">Uneseni članci</div>
        <div className="filterAndSortingContainer"></div>
        {articles.map((item) => (
          <div className="basicInfo">
            <div className="firstWorkshopInformation">
              <div className="workshopTitle">{item.naziv}</div>
              <div className="infoItem">{item.nazivMedija}</div>
              <div className="infoItem">{item.tipMedija}</div>
              <div className="infoItem">{item.tekst}</div>
              <div className="infoItem">{item.datum}</div>
            </div>
            <div className="workshopOptions">
              <div className="editWorkshop workshopEditOption" onClick={(e) => editArticle(e, item)}>
                <img src={editIcon} />
              </div>
              <div className="changePictureOption workshopEditOption" onClick={(e) => chooseImage(e, item)}>
                <img src={changePictureIcon} />
              </div>
              <div className="deleteWorkshop workshopEditOption" onClick={(e) => deleteArticleItem(e, item)}>
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

export default ReadArticles;
