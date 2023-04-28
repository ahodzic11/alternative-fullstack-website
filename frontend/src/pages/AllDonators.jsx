import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { formatPath } from "../js/namechange";
import Donator from "../components/Donator";
import filterIcon from "./../assets/filters.png";
import Button from "react-bootstrap/Button";
import "./../css/AllDonators.css";

function AllDonators() {
  const [donatorList, setDonators] = useState([]);
  const [filteredDonators, setFilteredDonators] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("allyears");
  const navigate = useNavigate();

  useEffect(() => {
    const getDonators = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/donators`);
        setDonators(res.data.data);
        setFilteredDonators(res.data.data);
      } catch (err) {}
    };
    getDonators();
    setSort("asc");
  }, []);

  function sortiraj() {
    if (sort === "asc") {
      setFilteredDonators((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv < b.naziv ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredDonators((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv > b.naziv ? -1 : 0;
        })
      );
    }
  }

  useEffect(() => {
    sortiraj();
  }, [sort, nazivFilter, donatorList]);

  const handleClick = (e) => {
    navigate("/projects/details/" + formatPath(e.target.id));
  };

  function getWorkshopYears() {
    var allYears = [];
    filteredDonators.forEach((donator) => {
      var pocetakPodrske = donator.pocetakPodrske;

      var krajPodrske = donator.krajPodrske;
      if (!allYears.includes(pocetakPodrske)) allYears.push(pocetakPodrske);
      if (!allYears.includes(krajPodrske)) allYears.push(krajPodrske);
    });
    setYears(allYears);
  }

  useEffect(() => {
    getWorkshopYears();
  }, [donatorList, sort, filteredDonators]);

  useEffect(() => {
    handleChange();
  }, [nazivFilter]);

  function handleChange() {
    setSort(sort);
    if (nazivFilter) setFilteredDonators(donatorList.filter((item) => item.naziv.toUpperCase().includes(nazivFilter.toUpperCase())));
    else setFilteredDonators(donatorList);
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
        <div className="projectsMainTitle">Donatori</div>
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
                    <Form.Label className="filtersCustomDesign">GODINA</Form.Label>
                    <Form.Select id="yearInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedYear(e.target.value)}>
                      <option value="allyears">Sve godine</option>
                      {years.length == 0 ? (
                        <></>
                      ) : (
                        <>
                          {years
                            .sort((a, b) => {
                              return a > b ? -1 : 0;
                            })
                            .map((year) => (
                              <option value={year}>{year}</option>
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
          <div className="allProjectsContainer">
            {filteredDonators
              .filter((donator) => {
                return (selectedYear <= Number(donator.krajPodrske) && selectedYear >= Number(donator.pocetakPodrske)) || selectedYear == "allyears";
              })
              .map((donator) => (
                <Donator item={donator} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllDonators;
