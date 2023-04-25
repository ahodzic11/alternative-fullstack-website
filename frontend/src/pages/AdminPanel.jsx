import React from "react";
import AdminLogout from "../components/AdminLogout";
import AdminNavigation from "../components/AdminNavigation";
import { useNavigate } from "react-router-dom";
import "./../css/AdminPanel.css";

function AdminPanel() {
  const navigate = useNavigate();

  const addWorkshop = (e) => {
    e.preventDefault();
    navigate("/dodajradionicu");
  };

  const addProject = (e) => {
    e.preventDefault();
    navigate("/dodajprojekat");
  };

  const addActivity = (e) => {
    e.preventDefault();
    navigate("/dodajaktivnost");
  };

  const addNews = (e) => {
    e.preventDefault();
    navigate("/dodajvijest");
  };

  const readNews = (e) => {
    e.preventDefault();
    navigate("/readnews");
  };

  const addDonator = (e) => {
    e.preventDefault();
    navigate("/dodajdonatora");
  };

  const readDonators = (e) => {
    e.preventDefault();
    navigate("/readdonators");
  };

  const readWorkshops = (e) => {
    e.preventDefault();
    navigate("/readworkshops");
  };

  const readProjects = (e) => {
    e.preventDefault();
    navigate("/readprojects");
  };

  const readActivities = (e) => {
    e.preventDefault();
    navigate("/readactivities");
  };

  const addOffer = (e) => {
    e.preventDefault();
    navigate("/dodajponudu");
  };

  const readOffers = (e) => {
    e.preventDefault();
    navigate("/readoffers");
  };

  return (
    <>
      <AdminNavigation />
      <div className="adminPanelContainer">
        <div className="addingContainer">
          <div className="addWorkshopsContainer addingItem" onClick={addWorkshop}>
            DODAJ RADIONICU
          </div>
          <div className="viewWorkshopsContainer addingItem" onClick={readWorkshops}>
            POGLEDAJ RADIONICE
          </div>
          <div className="addProjectContainer addingItem" onClick={addProject}>
            DODAJ PROJEKAT
          </div>
          <div className="viewProjectsContainer addingItem" onClick={readProjects}>
            POGLEDAJ PROJEKTE
          </div>
          <div className="addActivityContainer addingItem" onClick={addActivity}>
            DODAJ AKTIVNOST
          </div>
          <div className="viewActivitiesContainer addingItem" onClick={readActivities}>
            POGLEDAJ AKTIVNOSTI
          </div>
          <div className="addActivityContainer addingItem" onClick={addNews}>
            DODAJ VIJEST
          </div>
          <div className="viewActivitiesContainer addingItem" onClick={readNews}>
            POGLEDAJ VIJESTI
          </div>
          <div className="addActivityContainer addingItem" onClick={addDonator}>
            DODAJ DONATORA
          </div>
          <div className="viewActivitiesContainer addingItem" onClick={readDonators}>
            POGLEDAJ DONATORE
          </div>
          <div className="addActivityContainer addingItem" onClick={addOffer}>
            DODAJ PONUDU
          </div>
          <div className="viewActivitiesContainer addingItem" onClick={readOffers}>
            POGLEDAJ PONUDE
          </div>
        </div>
      </div>
      <AdminLogout />
    </>
  );
}

export default AdminPanel;
