import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Workshop from "../components/Workshop";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import filterIcon from "./../assets/filters.png";
import "./../css/AllWorkshops.css";
import { formatPath } from "../js/namechange";

function AllWorkshops() {
  const [workshopList, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [naslovFilter, setNaslovFilter] = useState("");
  const [trenerFilter, setTrenerFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("allyears");
  const navigate = useNavigate();

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops`);
        setWorkshops(res.data.data);
        setFilteredWorkshops(res.data.data);
      } catch (err) {}
    };
    getWorkshops();
    setSort("newest");
  }, []);

  function sortiraj() {
    if (sort === "newest") {
      setFilteredWorkshops((prev) =>
        [...prev].sort((a, b) => {
          var firstDate = a.datum.split(".");
          var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
          var secondDate = b.datum.split(".");
          var secondCorrectDate = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
          return firstCorrectDate > secondCorrectDate ? -1 : 0;
        })
      );
    } else if (sort === "oldest") {
      setFilteredWorkshops((prev) =>
        [...prev].sort((a, b) => {
          var firstDate = a.datum.split(".");
          var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
          var secondDate = b.datum.split(".");
          var secondCorrectDate = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
          return firstCorrectDate < secondCorrectDate ? -1 : 0;
        })
      );
    } else if (sort === "asc") {
      setFilteredWorkshops((prev) =>
        [...prev].sort((a, b) => {
          return a.naslov < b.naslov ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredWorkshops((prev) =>
        [...prev].sort((a, b) => {
          return a.naslov > b.naslov ? -1 : 0;
        })
      );
    }
  }

  useEffect(() => {
    sortiraj();
  }, [sort, trenerFilter, naslovFilter, workshopList]);

  function getWorkshopYears() {
    var allYears = [];
    filteredWorkshops.forEach((workshop) => {
      var date = workshop.datum.split(".");
      var fullDate = new Date(date[2], date[1] - 1, date[0]);
      let year = fullDate.getFullYear();
      if (!allYears.includes(year)) allYears.push(year);
    });
    setYears(allYears);
  }

  useEffect(() => {
    getWorkshopYears();
  }, [workshopList, sort, filteredWorkshops]);

  const handleClick = (e) => {
    navigate("/workshops/details/" + formatPath(e.target.id));
  };

  useEffect(() => {
    handleChange();
    getWorkshopYears();
  }, [naslovFilter, trenerFilter]);

  function handleChange() {
    setSort(sort);
    if (naslovFilter && trenerFilter) {
      let newFilteredWorkshops = [];
      newFilteredWorkshops = workshopList.filter((item) => item.naslov.toUpperCase().includes(naslovFilter.toUpperCase()));
      newFilteredWorkshops = newFilteredWorkshops.filter((item) => item.trener.toUpperCase().includes(trenerFilter.toUpperCase()));
      setFilteredWorkshops(newFilteredWorkshops);
    } else if (naslovFilter) setFilteredWorkshops(workshopList.filter((item) => item.naslov.toUpperCase().includes(naslovFilter.toUpperCase())));
    else if (trenerFilter) setFilteredWorkshops(workshopList.filter((item) => item.trener.toUpperCase().includes(trenerFilter.toUpperCase())));
    else setFilteredWorkshops(workshopList);
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
    setSelectedYear("allyears");
    setSort("newest");
    setTrenerFilter("");
    setNaslovFilter("");
    var yearInput = document.getElementById("yearInput");
    yearInput.value = "allyears";
    var sortInput = document.getElementById("sortInput");
    sortInput.value = "newest";
    var naslovInput = document.getElementById("naslovInput");
    naslovInput.value = "";
    var trenerInput = document.getElementById("trenerInput");
    trenerInput.value = "";
  };

  return (
    <>
      <Navigation />
      <div className="projectsMainWrapper">
        <div className="workshopsMainTitle">Sve radionice</div>
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
                    <Form.Label className="filtersCustomDesign">NASLOV</Form.Label>
                    <Form.Control id="naslovInput" type="naslov" placeholder="Naslov" onChange={(e) => setNaslovFilter(e.target.value)} />
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="filtersCustomDesign">TRENER</Form.Label>
                    <Form.Control id="trenerInput" type="trener" placeholder="Trener" onChange={(e) => setTrenerFilter(e.target.value)} />
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
                      <option value="newest">Najnovije ka najstarijem</option>
                      <option value="oldest">Najstarije ka najnovijem</option>
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
            {years.length == 0 ? (
              <>
                {filteredWorkshops.map((item) => (
                  <Workshop item={item} />
                ))}
              </>
            ) : (
              <>
                {filteredWorkshops
                  .filter((item) => {
                    var date = item.datum.split(".");
                    var fullDate = new Date(date[2], date[1] - 1, date[0]);
                    let year = fullDate.getFullYear();
                    return year == selectedYear || selectedYear == "allyears";
                  })
                  .map((item) => (
                    <Workshop item={item} />
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

export default AllWorkshops;
