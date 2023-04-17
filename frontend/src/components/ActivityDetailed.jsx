import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../css/ActivityDetailed.css";

function ActivityDetailed() {
  const [activity, setActivity] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/activities/` + name);
        setActivity(res.data.data);
      } catch (err) {}
    };

    getActivity();
  }, []);

  const handleClick = (e) => {
    navigate("/activities/activitydetails/" + name);
  };

  return (
    <>
      <Navigation />
      <div className="randomAssDiv">
        <div className="workshopDetailedMainWrapper">
          <div className="firstWrapper">
            <div className="workshopDetailedTitle">{activity.naziv}</div>
            <div className="workshopDetailedGoal">{activity.opisAktivnosti}</div>
            <div className="workshopDetailedGoal">
              <p className="moreAboutWorkshopLink" onClick={handleClick}>
                Više o aktivnosti &gt;
              </p>
            </div>
          </div>
          <div className="secondWrapper">
            <img className="workshopImageElement" src={"http://localhost:5000/newuploads/" + name.replace(/ /g, "") + "/" + activity.naslovnaSlika} alt="workshopImageElement" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ActivityDetailed;
