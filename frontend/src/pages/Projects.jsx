import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../css/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/`);
        setProjects(res.data.data);
      } catch (err) {}
    };

    getProjects();
  }, []);

  const handleClick = (e) => {
    navigate("/workshops/" + e.target.id);
  };

  const handleClickAllWorkshops = (e) => {
    navigate("/allworkshops/");
  };

  return (
    <>
      <Navigation />
      <div className="projectsMainWrapper">
        <div className="projectsMainTitle">Aktuelni projekti</div>
        <div className="projectsIntro">
          U udruženju Alternative kakanj uspješno se oblikuju radionice za djecu i odrasle i koriste priručnici sa dobro razvijenim trening materijalima. Za nove teme kao npr. Prevencija rodno zasnovanog nasilja, Različite uloge vijećnika i dr. Uz razvijanje materijal organizujemo trening za trenere kako bismo na najbolji mogući način odgovorili na potrebe u zajednici. Osim radionica u okviru
          naših projekata i aktivnosti pružamo i trenerske usluge za druge projekte i organizacije.
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Projects;
