import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Project from "../components/Project";
import { formatPath } from "../js/namechange";
import filterIcon from "./../assets/filters.png";
import Button from "react-bootstrap/Button";
import GoToTop from "../components/GoToTop";
import "./../css/AllArticles.css";

function AllArticles() {
  const [articleList, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [donators, setDonators] = useState([]);
  const [selectedDonator, setSelectedDonator] = useState("allDonators");
  const [selectedRange, setSelectedRange] = useState("allValues");
  const [selectedYear, setSelectedYear] = useState("allyears");
  const [years, setYears] = useState([]);
  const path = "http://localhost:5000/newuploads/clanci/";
  const navigate = useNavigate();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/articles`);
        setArticles(res.data.data);
        setFilteredArticles(res.data.data);
      } catch (err) {}
    };
    getArticles();
    getArticlesYears();
    setSort("asc");
  }, []);

  function getArticlesYears() {
    var allYears = [];
    filteredArticles.forEach((article) => {
      var date = article.datum.split("-");
      var fullDate = new Date(date[0], date[1] - 1, date[2]);
      let year = fullDate.getFullYear();
      if (!allYears.includes(year)) allYears.push(year);
    });
    setYears(allYears);
  }

  function sortiraj() {
    if (sort === "asc") {
      setFilteredArticles((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv < b.naziv ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredArticles((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv > b.naziv ? -1 : 0;
        })
      );
    }
  }

  function getDonators() {
    var allDonators = [];
    filteredArticles.forEach((project) => {
      if (!allDonators.includes(project.nazivDonatora)) allDonators.push(project.nazivDonatora);
    });
    setDonators(allDonators);
  }

  useEffect(() => {
    getDonators();
  }, [articleList, sort, filteredArticles]);

  useEffect(() => {
    sortiraj();
  }, [sort, nazivFilter, articleList]);

  const handleClick = (e) => {
    navigate("/projects/details/" + formatPath(e.target.id));
  };

  useEffect(() => {
    handleChange();
  }, [nazivFilter]);

  function handleChange() {
    setSort(sort);
    if (nazivFilter) setFilteredArticles(articleList.filter((item) => item.naziv.toUpperCase().includes(nazivFilter.toUpperCase())));
    else setFilteredArticles(articleList);
    sortiraj();
  }

  function ellipsify(str) {
    if (str.length > 10) {
      return str.substring(0, 830) + "...";
    } else {
      return str;
    }
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
  };

  const displayResults = () => {
    var resultNumber =
      filteredArticles
        .filter((item) => {
          return item.nazivDonatora == selectedDonator || selectedDonator == "allDonators";
        })
        .filter((item) => {
          if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
          else return 1;
        })
        .filter((article) => {
          var date = article.datum.split("-");
          var fullDate = new Date(date[0], date[1] - 1, date[2]);
          let year = fullDate.getFullYear();
          return year == selectedYear || selectedYear == "allyears";
        }).length % 100;
    if (resultNumber == 0) return <>članaka</>;
    else if (resultNumber == 1) return <>članak</>;
    else if (resultNumber >= 2 && resultNumber <= 4) return <>članka</>;
    else if (resultNumber >= 5 && resultNumber <= 20) return <>članaka</>;
  };

  return (
    <>
      <Navigation />
      <div className="articlesMainWrapper">
        <div className="heading text-center">
          <h2>ČLANCI</h2>
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
                filteredArticles
                  .filter((item) => {
                    return item.nazivDonatora == selectedDonator || selectedDonator == "allDonators";
                  })
                  .filter((item) => {
                    if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
                    else return 1;
                  })
                  .filter((article) => {
                    var date = article.datum.split("-");
                    var fullDate = new Date(date[0], date[1] - 1, date[2]);
                    let year = fullDate.getFullYear();
                    return year == selectedYear || selectedYear == "allyears";
                  }).length
              }
            </div>
            <div className="resultsNumberName">{displayResults()}</div>
          </div>
        </div>
        <div className="articlesSomeWrapper">
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
                  <Form.Group className="sortingContainers">
                    <Form.Label className="filtersCustomDesign">TIP MEDIJA</Form.Label>
                    <Form.Select id="iznosSredstava" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedRange(e.target.value)}>
                      <option value="allValues">Svi mediji</option>
                      <option value="Web portal">Web portal</option>
                      <option value="Društvene mreže">Društvene mreže</option>
                      <option value="TV">TV</option>
                      <option value="Štampa">Štampa</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="newFilterSection">
                  <Form.Group className="sortingContainers">
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
          <div id="allArticlesContainer" className="allArticlesContainer">
            {donators.length == 0 ? (
              <>
                {filteredArticles.map((item) => (
                  <Project item={item} />
                ))}
              </>
            ) : (
              <>
                {filteredArticles
                  .filter((item) => {
                    return item.nazivDonatora == selectedDonator || selectedDonator == "allDonators";
                  })
                  .filter((item) => {
                    if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
                    else return 1;
                  })
                  .filter((article) => {
                    var date = article.datum.split("-");
                    var fullDate = new Date(date[0], date[1] - 1, date[2]);
                    let year = fullDate.getFullYear();
                    return year == selectedYear || selectedYear == "allyears";
                  })
                  .map((article) => (
                    <div className="articleItem">
                      <div className="articleTopBar">
                        <div className="articleTopBarTextContainer">
                          {article.datum} | {article.nazivMedija}
                        </div>
                      </div>
                      <div className="articleImageTextContainer">
                        <div className="articleImage">
                          <img className="articleImageElement" src={path + formatPath(article.naziv) + "/" + article.naslovnaSlika} />
                        </div>
                        <div className="articleTextContainer">
                          <div className="articleMainTitle">{article.naziv}</div>
                          <div className="articleText">{ellipsify(article.tekst)}</div>
                          {article.link ? (
                            <div className="readMoreArticle">
                              Pročitaj više na:
                              <a className="readMoreLink" href={article.link}>
                                {article.link}
                              </a>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      <GoToTop />
      <Footer />
    </>
  );
}

export default AllArticles;
