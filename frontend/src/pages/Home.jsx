import React from "react";
import AcitivityBar from "../components/AcitivityBar";
import DetailedProjectsBar from "../components/DetailedProjectsBar";
import FillerBar from "../components/FillerBar";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ProjectsBar from "../components/ProjectsBar";

function Home() {
  return (
    <div>
      <Navigation />
      <FillerBar />
      <ProjectsBar />
      <AcitivityBar />
      <DetailedProjectsBar />
      <Footer />
    </div>
  );
}

export default Home;
