import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./../css/AllProjects.css";
import { formatPath } from "../js/namechange";
import Donator from "../components/Donator";

function AllDonators() {
  const [donatorList, setDonators] = useState([]);
  const [filteredDonators, setFilteredDonators] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [selectedRange, setSelectedRange] = useState("allValues");
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

  useEffect(() => {
    handleChange();
  }, [nazivFilter]);

  function handleChange() {
    setSort(sort);
    if (nazivFilter) setFilteredDonators(donatorList.filter((item) => item.naziv.toUpperCase().includes(nazivFilter.toUpperCase())));
    else setFilteredDonators(donatorList);
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
        <div className="workshopsMainTitle">Donatori</div>
        <div className="filterAndSortingSection">
          <div className="filtersContainer">
            <div className="filtersHeadline">Pretraži po</div>
            <div className="filteringInputs">
              <div className="filtersSection">
                Naziv:
                <input id="nazivInput" name="naziv" type="text" onChange={(e) => setNazivFilter(e.target.value)} />
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
          {filteredDonators.map((donator) => (
            <Donator item={donator} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllDonators;
