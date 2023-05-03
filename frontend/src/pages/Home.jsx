import React from "react";
import AcitivityBar from "../components/AcitivityBar";
import DetailedProjectsBar from "../components/DetailedProjectsBar";
import FillerBar from "../components/FillerBar";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ProjectsBar from "../components/ProjectsBar";
import Statements from "../components/Statements";
import GoToTop from "../components/GoToTop";

function Home() {
  return (
    <div>
      <Navigation />
      <FillerBar />
      <ProjectsBar />
      <AcitivityBar />
      <DetailedProjectsBar />
      <GoToTop />
      <Footer />
    </div>
  );
}

export default Home;
