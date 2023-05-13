import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Workshop from "../components/Workshop";
import { useParams, useNavigate } from "react-router-dom";
import "./../css/WorkshopList.css";
import { formatPath } from "../js/namechange";
import Pagination from "../components/Pagination";
import GoToTop from "../components/GoToTop";

function WorkshopList() {
  const [workshopList, setWorkshops] = useState([]);
  let { area } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = workshopList.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(workshopList.length / recordsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops/area/` + area);
        setWorkshops(res.data.data);
      } catch (err) {}
    };

    getWorkshops();
  }, []);

  const handleClick = (e) => {
    navigate("/workshops/details/" + formatPath(e.target.id));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Navigation />
      <div className="workshopsMainWrapper">
        <div className="workshopsMainTitle">{area}</div>
        <div className="workshopsContainer">
          {workshopList.length == 0 ? (
            <div className="noWorkshopsContainer">Nisu unesene radionice odabrane oblasti!</div>
          ) : (
            <div className="foundWorkshopsContainer">
              <div className="oneWorkshopDetail" onClick={handleClick}>
                {workshopList.map((item) => (
                  <Workshop item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {workshopList.length != 0 ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : <></>}

      <GoToTop />
      <Footer />
    </>
  );
}

export default WorkshopList;
