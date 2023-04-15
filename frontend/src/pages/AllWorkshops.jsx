import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import "./../components/AllWorkshops.css";
import axios from "axios";
import Workshop from "../components/Workshop";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AllWorkshops() {
  const [workshopList, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [naslovFilter, setNaslovFilter] = useState("");
  const [trenerFilter, setTrenerFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("allyears");

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
          var firstDate = a.datum.split("-");
          var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
          var secondDate = b.datum.split("-");
          var secondCorrectDate = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
          return firstCorrectDate > secondCorrectDate ? -1 : 0;
        })
      );
    } else if (sort === "oldest") {
      setFilteredWorkshops((prev) =>
        [...prev].sort((a, b) => {
          var firstDate = a.datum.split("-");
          var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
          var secondDate = b.datum.split("-");
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
    console.log(filteredWorkshops);
    filteredWorkshops.forEach((workshop) => {
      var date = workshop.datum.split("-");
      var fullDate = new Date(date[0], date[1] - 1, date[2]);
      let year = fullDate.getFullYear();
      if (!allYears.includes(year)) allYears.push(year);
    });
    setYears(allYears);
  }

  useEffect(() => {
    getWorkshopYears();
  }, [workshopList, sort, filteredWorkshops]);

  const handleClick = (e) => {
    window.location.replace("http://localhost:3000/workshops/details/" + e.target.id);
  };

  useEffect(() => {
    handleChange();
    getWorkshopYears();
  }, [naslovFilter, trenerFilter]);

  function handleChange() {
    //console.log(years);
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
      <div className="workshopsMainWrapper">
        <div className="workshopsMainTitle">Sve radionice</div>
        <div className="filterAndSortingSection">
          <div className="filtersContainer">
            <div className="filtersHeadline">Pretraži po</div>
            <div className="filteringInputs">
              <div className="filtersSection">
                Naslov:
                <input id="naslovInput" name="naslov" type="text" onChange={(e) => setNaslovFilter(e.target.value)} />
              </div>
              <div className="filtersSection">
                Trener:
                <input id="trenerInput" name="trener" type="text" onChange={(e) => setTrenerFilter(e.target.value)} />
              </div>
              <div className="filtersSection">
                Godina:
                <Form.Group className="sortingContainer">
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
              <div className="filtersSection">
                Sortiraj:
                <Form.Group className="sortingContainer">
                  <Form.Select id="sortInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSort(e.target.value)}>
                    <option value="newest">Najnovije ka najstarijem</option>

                    <option value="oldest">Najstarije ka najnovijem</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="filtersSection">
                <Button className="resetFilters" variant="danger" onClick={resetujFiltere}>
                  <p className="buttonText">RESETUJ FILTERE</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="allWorkshopsContainer" onClick={handleClick}>
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
                  var date = item.datum.split("-");
                  var fullDate = new Date(date[0], date[1] - 1, date[2]);
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
      <Footer />
    </>
  );
}

export default AllWorkshops;
