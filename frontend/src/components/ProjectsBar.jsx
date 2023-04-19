import React from "react";
import "./../css/ProjectsBar.css";

function ProjectsBar() {
  return (
    <div className="projectsContainer">
      <div className="projectsIntro">
        <div className="projectsIntroText">Kroz učešće građana identifikovali smo njihove stvarne potrebe i uz podršku donatora radili na najboljim rješenjima.</div>
      </div>

      <div className="projectInfo">
        <div className="youth">
          <div className="projectNumbers projectNumbersKICK"></div>
          <div className="projectDetailText">mladih je koristilo usluge KICK-a</div>
        </div>
        <div className="projects">
          <div className="projectNumbers projectNumbersPROJECT"></div>
          <div className="projectDetailText">implementiranih projekata kroz 25 godina postojanja</div>
        </div>

        <div className="donators">
          <div className="projectNumbers projectNumbersDONATORS"></div>
          <div className="projectDetailText">donatora su podržala naše projekte</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsBar;
