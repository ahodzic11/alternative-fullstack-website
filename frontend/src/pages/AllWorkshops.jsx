import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import "./..//components/AllWorkshops.css";
import axios from "axios";
import Workshop from "../components/Workshop";
import Form from "react-bootstrap/Form";

function AllWorkshops() {
  const [workshopList, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [naslovFilter, setNaslovFilter] = useState("");
  const [trenerFilter, setTrenerFilter] = useState("");
  const [sort, setSort] = useState("newest");

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
    console.log("uslo u sortiraj " + sort);
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

  const handleClick = (e) => {
    console.log(e.target.id);
    window.location.replace("http://localhost:3000/workshops/details/" + e.target.id);
  };

  useEffect(() => {
    handleChange();
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
                <input name="naslov" type="text" onChange={(e) => setNaslovFilter(e.target.value)} />
              </div>
              <div className="filtersSection">
                Trener:
                <input name="trener" type="text" onChange={(e) => setTrenerFilter(e.target.value)} />
              </div>
            </div>
          </div>
          <Form.Group className="sortingContainer">
            <Form.Label className="filtersHeadline">Sortiraj po</Form.Label>
            <Form.Select name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSort(e.target.value)}>
              <option value="newest">Najnovije ka najstarijem</option>
              <option value="oldest">Najstarije ka najnovijem</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="allWorkshopsContainer" onClick={handleClick}>
          {filteredWorkshops.map((item) => (
            <Workshop item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllWorkshops;
