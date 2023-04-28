import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Activity from "../components/Activity";
import filterIcon from "./../assets/filters.png";
import Button from "react-bootstrap/Button";
import { formatPath } from "../js/namechange";
import "./../css/AllActivities.css";

function AllActivities() {
  const [activityList, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [donators, setDonators] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedDonator, setSelectedDonator] = useState("allDonators");
  const [selectedProject, setSelectedProject] = useState("allProjects");
  const navigate = useNavigate();

  useEffect(() => {
    const getActivities = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/activities`);
        setActivities(res.data.data);
        setFilteredActivities(res.data.data);
      } catch (err) {}
    };
    getActivities();
    setSort("asc");
  }, []);

  function sortiraj() {
    if (sort === "asc") {
      setFilteredActivities((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv < b.naziv ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredActivities((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv > b.naziv ? -1 : 0;
        })
      );
    }
  }

  function getDonators() {
    var allDonators = [];
    filteredActivities.forEach((activity) => {
      if (!allDonators.includes(activity.nazivDonatora)) allDonators.push(activity.nazivDonatora);
    });
    setDonators(allDonators);
  }

  function getProjects() {
    var allProjects = [];
    filteredActivities.forEach((activity) => {
      if (!allProjects.includes(activity.nazivProjekta)) allProjects.push(activity.nazivProjekta);
    });
    setProjects(allProjects);
  }

  useEffect(() => {
    getDonators();
    getProjects();
  }, [activityList, sort, filteredActivities]);

  useEffect(() => {
    sortiraj();
  }, [sort, nazivFilter, activityList]);

  const handleClick = (e) => {
    navigate("/activities/details/" + formatPath(e.target.id));
  };

  useEffect(() => {
    handleChange();
  }, [nazivFilter]);

  function handleChange() {
    setSort(sort);
    if (nazivFilter) setFilteredActivities(activityList.filter((item) => item.naziv.toUpperCase().includes(nazivFilter.toUpperCase())));
    else setFilteredActivities(activityList);
    sortiraj();
  }

  const prikaziFiltere = (e) => {
    e.preventDefault();
    var filteringDiv = document.getElementById("filterIconsContainer");
    var filteringIcons = document.getElementById("filteringSmallerContainer");
    var filteringIconsTwo = document.getElementById("filteringSmallerContainerTwo");
    var allProjectsContainer = document.getElementById("allProjectsContainer");
    if (filteringDiv.style.left === "0px") {
      filteringDiv.style.left = "-300px";
      filteringIconsTwo.style.left = "-300px";
      filteringIcons.style.color = "black";
      allProjectsContainer.style.paddingLeft = "0px";
    } else {
      filteringDiv.style.transition = "1s";
      filteringDiv.style.left = "0px";
      filteringIconsTwo.style.left = "0px";
      filteringIcons.style.transition = "1s";
      filteringIcons.style.color = "white";
      //DA NE BUDE OVERLAY
      //allProjectsContainer.style.transition = "1s";
      //allProjectsContainer.style.paddingLeft = "260px";
    }
  };

  const resetujFiltere = (e) => {
    e.preventDefault();
    /*setSort("newest");
    setTrenerFilter("");
    setNaslovFilter("");
    var yearInput = document.getElementById("yearInput");
    yearInput.value = "allyears";
    var sortInput = document.getElementById("sortInput");
    sortInput.value = "newest";
    var naslovInput = document.getElementById("naslovInput");
    naslovInput.value = "";
    var trenerInput = document.getElementById("trenerInput");
    trenerInput.value = "";*/
  };

  return (
    <>
      <Navigation />
      <div className="projectsMainWrapper">
        <div className="projectsMainTitle">Aktivnosti</div>
        <div id="filtersIcons" className="filtersIcons">
          <div id="filteringSmallerContainer" className="filteringSmallerContainer" onClick={(e) => prikaziFiltere(e)}>
            <img className="filterIcon" src={filterIcon} />
            <div className="filterIconText">FILTERI</div>
            <div id="filteringSmallerContainerTwo" className="filteringSmallerContainerTwo"></div>
          </div>
        </div>
        <div className="projectsSomeWrapper">
          <div id="filterIconsContainer" className="filterIconsContainer">
            <div id="filteringDiv" className="newFilterWrapper">
              <div className="newFilterContainer">
                <div className="newFilterSection">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="filtersCustomDesign">NAZIV</Form.Label>
                    <Form.Control type="naziv" placeholder="Naziv" onChange={(e) => setNazivFilter(e.target.value)} />
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Form.Group className="sortingContainer">
                    <Form.Label className="filtersCustomDesign">DONATOR</Form.Label>
                    <Form.Select id="donatorInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedDonator(e.target.value)}>
                      <option value="allDonators">Svi donatori</option>
                      {donators.length == 0 ? (
                        <></>
                      ) : (
                        <>
                          {donators
                            .sort((a, b) => {
                              return a > b ? -1 : 0;
                            })
                            .map((donator) => (
                              <option value={donator}>{donator}</option>
                            ))}
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Form.Group className="sortingContainer">
                    <Form.Label className="filtersCustomDesign">PROJEKAT</Form.Label>
                    <Form.Select id="projekatInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedProject(e.target.value)}>
                      <option value="allProjects">Svi projekti</option>
                      {projects.length == 0 ? (
                        <></>
                      ) : (
                        <>
                          {projects
                            .sort((a, b) => {
                              return a > b ? -1 : 0;
                            })
                            .filter((project) => {
                              return project.length > 0 ? -1 : 0;
                            })
                            .map((project) => (
                              <option value={project}>{project}</option>
                            ))}
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="newFilterSection">
                  <Form.Group className="sortingContainer">
                    <Form.Label className="filtersCustomDesign">SORTIRAJ</Form.Label>
                    <Form.Select id="sortInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSort(e.target.value)}>
                      <option value="asc">A-Z</option>
                      <option value="desc">Z-A</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Button className="resetFilters" variant="danger">
                    <div className="resetFiltersText">RESETUJ FILTERE</div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="allProjectsContainer" onClick={handleClick}>
            {donators.length == 0 ? (
              <>
                {filteredActivities.map((item) => (
                  <Activity item={item} />
                ))}
              </>
            ) : (
              <>
                {filteredActivities
                  .filter((item) => {
                    return item.nazivDonatora == selectedDonator || selectedDonator == "allDonators";
                  })
                  .filter((item) => {
                    return item.nazivProjekta == selectedProject || selectedProject == "allProjects";
                  })
                  .filter((item) => {
                    if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
                    else return 1;
                  })
                  .map((item) => (
                    <Activity item={item} />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllActivities;
