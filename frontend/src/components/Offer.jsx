import { formatPath } from "../js/namechange";
import Button from "react-bootstrap/Button";
import "./../css/Workshop.css";

const Offer = ({ item }) => {
  const path = "http://localhost:5000/newuploads/ponude/" + formatPath(item.naziv) + "/" + item.naslovnaSlika;

  return (
    <div className="activityItem">
      <img className="activityImage" src={path} />
      <div className="activityText">{item.naziv}</div>
      <div className="activityDetailedText">{item.opis}</div>
      <Button className="activityButton" variant="outline-dark">
        <div className="activityButtonText">SAZNAJ VIŠE</div>
      </Button>
    </div>
  );
};

export default Offer;
