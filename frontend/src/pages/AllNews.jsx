import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import News from "../components/News";
import "./../css/AllProjects.css";

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
    navigate("/news/details/" + e.target.id);
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
        <div className="workshopsMainTitle">Vijesti</div>
        <div className="filterAndSortingSection">
          <div className="filtersContainer">
            <div className="filtersHeadline">Pretraži po</div>
            <div className="filteringInputs">
              <div className="filtersSection">
                Naziv:
                <input id="nazivInput" name="naziv" type="text" onChange={(e) => setNazivFilter(e.target.value)} />
              </div>
              <div className="filtersSection">
                Tema:
                <Form.Group className="sortingContainer">
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

              <div className="filtersSection">
                Sortiraj:
                <Form.Group className="sortingContainer">
                  <Form.Select id="sortInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSort(e.target.value)}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="filtersSection">
                Godina:
                <Form.Group className="sortingContainer">
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
            </div>
          </div>
        </div>
        <div className="allWorkshopsContainer" onClick={handleClick}>
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
      <Footer />
    </>
  );
}

export default AllNews;
