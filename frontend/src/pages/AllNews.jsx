import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import News from "../components/News";
import filterIcon from "./../assets/filters.png";
import "./../css/AllProjects.css";
import { formatPath } from "../js/namechange";
import Button from "react-bootstrap/Button";
import GoToTop from "../components/GoToTop";

function AllNews() {
  const [newsList, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [teme, setTeme] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedTema, setSelectedTema] = useState("allTeme");
  const [selectedYear, setSelectedYear] = useState("allYears");
  const navigate = useNavigate();

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news`);
        setNews(res.data.data);
        setFilteredNews(res.data.data);
      } catch (err) {}
    };
    getNews();
    setSort("asc");
  }, []);

  function sortiraj() {
    if (sort === "asc") {
      setFilteredNews((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv < b.naziv ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredNews((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv > b.naziv ? -1 : 0;
        })
      );
    }
  }

  function getTeme() {
    var allTeme = [];
    filteredNews.forEach((vijest) => {
      if (!allTeme.includes(vijest.tema)) allTeme.push(vijest.tema);
    });
    setTeme(allTeme);
  }

  useEffect(() => {
    getTeme();
  }, [newsList, sort, filteredNews]);

  useEffect(() => {
    sortiraj();
  }, [sort, nazivFilter, newsList]);

  function getNewsYears() {
    var allYears = [];
    filteredNews.forEach((newsArticle) => {
      var date = newsArticle.datum.split("-");
      var fullDate = new Date(date[0], date[1] - 1, date[2]);
      let year = fullDate.getFullYear();
      if (!allYears.includes(year)) allYears.push(year);
    });
    setYears(allYears);
  }

  useEffect(() => {
    getNewsYears();
  }, [newsList, sort, filteredNews]);

  const handleClick = (e) => {
    navigate("/news/details/" + formatPath(e.target.id));
  };

  useEffect(() => {
    handleChange();
  }, [nazivFilter]);

  function handleChange() {
    setSort(sort);
    if (nazivFilter) setFilteredNews(newsList.filter((item) => item.naziv.toUpperCase().includes(nazivFilter.toUpperCase())));
    else setFilteredNews(newsList);
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
    setNazivFilter("");
    setSelectedTema("allTeme");
    setSelectedYear("allYears");
    setSort("asc");
    var nazivInput = document.getElementById("nazivInput");
    nazivInput.value = "";
    var sortInput = document.getElementById("sortInput");
    sortInput.value = "asc";
    var temaInput = document.getElementById("temaInput");
    temaInput.value = "allTeme";
    var yearInput = document.getElementById("yearInput");
    yearInput.value = "allYears";
  };

  const displayResults = () => {
    var resultNumber =
      filteredNews
        .filter((item) => {
          return item.tema == selectedTema || selectedTema == "allTeme";
        })
        .filter((item) => {
          var date = item.datum.split("-");
          var fullDate = new Date(date[0], date[1] - 1, date[2]);
          let year = fullDate.getFullYear();
          return year == selectedYear || selectedYear == "allYears";
        })
        .filter((item) => {
          if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
          else return 1;
        }).length % 10;
    if (resultNumber == 0) return <>novosti</>;
    else if (resultNumber == 1) return <>novost</>;
    else return <>novosti</>;
  };

  return (
    <>
      <Navigation />
      <GoToTop />
      <div className="projectsMainWrapper">
        <div className="heading text-center">
          <h2>NOVOSTI</h2>
        </div>
        <div id="filtersIcons" className="filtersIcons">
          <div id="filteringSmallerContainer" className="filteringSmallerContainer" onClick={(e) => prikaziFiltere(e)}>
            <img className="filterIcon" src={filterIcon} />
            <div className="filterIconText">FILTERI</div>
            <div id="filteringSmallerContainerTwo" className="filteringSmallerContainerTwo"></div>
          </div>
          <div className="resultsNumber">
            <div className="resultsNumberLength">
              {
                filteredNews
                  .filter((item) => {
                    return item.tema == selectedTema || selectedTema == "allTeme";
                  })
                  .filter((item) => {
                    var date = item.datum.split("-");
                    var fullDate = new Date(date[0], date[1] - 1, date[2]);
                    let year = fullDate.getFullYear();
                    return year == selectedYear || selectedYear == "allYears";
                  })
                  .filter((item) => {
                    if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
                    else return 1;
                  }).length
              }
            </div>
            <div className="resultsNumberName">{displayResults()}</div>
          </div>
        </div>
        <div className="projectsSomeWrapper">
          <div id="filterIconsContainer" className="filterIconsContainer">
            <div id="filteringDiv" className="newFilterWrapper">
              <div className="newFilterContainer">
                <div className="newFilterSection">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="filtersCustomDesign">NAZIV</Form.Label>
                    <Form.Control id="nazivInput" type="naziv" placeholder="Naziv" onChange={(e) => setNazivFilter(e.target.value)} />
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Form.Group className="sortingContainer">
                    <Form.Label className="filtersCustomDesign">TEMA</Form.Label>
                    <Form.Select id="temaInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedTema(e.target.value)}>
                      <option value="allTeme">Sve teme</option>
                      {teme.length == 0 ? (
                        <></>
                      ) : (
                        <>
                          {teme
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
                    <Form.Label className="filtersCustomDesign">GODINA</Form.Label>
                    <Form.Select id="yearInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedYear(e.target.value)}>
                      <option value="allYears">Sve godine</option>
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
                  <Button className="resetFilters" variant="danger" onClick={(e) => resetujFiltere(e)}>
                    <div className="resetFiltersText">RESETUJ FILTERE</div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="allProjectsContainer" onClick={handleClick}>
            {teme.length == 0 ? (
              <>
                {filteredNews.map((item) => (
                  <News item={item} />
                ))}
              </>
            ) : (
              <>
                {filteredNews
                  .filter((item) => {
                    return item.tema == selectedTema || selectedTema == "allTeme";
                  })
                  .filter((item) => {
                    var date = item.datum.split("-");
                    var fullDate = new Date(date[0], date[1] - 1, date[2]);
                    let year = fullDate.getFullYear();
                    return year == selectedYear || selectedYear == "allYears";
                  })
                  .filter((item) => {
                    if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
                    else return 1;
                  })
                  .map((item) => (
                    <News item={item} />
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

export default AllNews;
