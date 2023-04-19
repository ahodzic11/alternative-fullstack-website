import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Project from "../components/Project";
import "./../css/AllProjects.css";
import { formatPath } from "../js/namechange";

function AllProjects() {
  const [projectList, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [donators, setDonators] = useState([]);
  const [selectedDonator, setSelectedDonator] = useState("allDonators");
  const [selectedRange, setSelectedRange] = useState("allValues");
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects`);
        setProjects(res.data.data);
        setFilteredProjects(res.data.data);
      } catch (err) {}
    };
    getProjects();
    setSort("asc");
  }, []);

  function sortiraj() {
    if (sort === "asc") {
      setFilteredProjects((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv < b.naziv ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredProjects((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv > b.naziv ? -1 : 0;
        })
      );
    }
  }

  function getDonators() {
    var allDonators = [];
    filteredProjects.forEach((project) => {
      if (!allDonators.includes(project.nazivDonatora)) allDonators.push(project.nazivDonatora);
    });
    setDonators(allDonators);
  }

  useEffect(() => {
    getDonators();
  }, [projectList, sort, filteredProjects]);

  useEffect(() => {
    sortiraj();
  }, [sort, nazivFilter, projectList]);

  const handleClick = (e) => {
    navigate("/projects/details/" + formatPath(e.target.id));
  };

  useEffect(() => {
    handleChange();
  }, [nazivFilter]);

  function handleChange() {
    setSort(sort);
    if (nazivFilter) setFilteredProjects(projectList.filter((item) => item.naziv.toUpperCase().includes(nazivFilter.toUpperCase())));
    else setFilteredProjects(projectList);
    sortiraj();
  }

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
      <div className="workshopsMainWrapper">
        <div className="workshopsMainTitle">Projekti</div>
        <div className="filterAndSortingSection">
          <div className="filtersContainer">
            <div className="filtersHeadline">Pretraži po</div>
            <div className="filteringInputs">
              <div className="filtersSection">
                Naziv:
                <input id="nazivInput" name="naziv" type="text" onChange={(e) => setNazivFilter(e.target.value)} />
              </div>
              <div className="filtersSection">
                Donator:
                <Form.Group className="sortingContainer">
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
              <div className="filtersSection">
                Iznos sredstava:
                <Form.Group className="sortingContainer">
                  <Form.Select id="iznosSredstava" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedRange(e.target.value)}>
                    <option value="allValues">Svi iznosi</option>
                    <option value="0to10">0 KM do 10000 KM</option>
                    <option value="10to50">10000 KM do 50000 KM</option>
                    <option value="50to100">50000 KM do 100000 KM</option>
                    <option value="over100">Preko 100000 KM</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="filtersSection">
                Sortiraj:
                <Form.Group className="sortingContainer">
                  <Form.Select id="sortInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSort(e.target.value)}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="allWorkshopsContainer" onClick={handleClick}>
          {donators.length == 0 ? (
            <>
              {filteredProjects.map((item) => (
                <Project item={item} />
              ))}
            </>
          ) : (
            <>
              {filteredProjects
                .filter((item) => {
                  return item.nazivDonatora == selectedDonator || selectedDonator == "allDonators";
                })
                .filter((item) => {
                  if (selectedRange == "allValues") return 1;
                  else if (selectedRange == "0to10") return Number(item.projektniGrant) >= 0 && Number(item.projektniGrant) <= 10000;
                  else if (selectedRange == "10to50") return Number(item.projektniGrant) >= 10000 && Number(item.projektniGrant) <= 50000;
                  else if (selectedRange == "50to100") return Number(item.projektniGrant) >= 50000 && Number(item.projektniGrant) <= 100000;
                  else if (selectedRange == "over100") return Number(item.projektniGrant) >= 100000;
                })
                .filter((item) => {
                  if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
                  else return 1;
                })
                .map((item) => (
                  <Project item={item} />
                ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllProjects;

/*
<div className="filtersSection">
                <Button className="resetFilters" variant="danger" onClick={resetujFiltere}>
                  <p className="buttonText">RESETUJ FILTERE</p>
                </Button>
              </div>
*/
