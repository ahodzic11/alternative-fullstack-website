import { formatPath } from "../js/namechange";
import "./../css/Project.css";

const Project = ({ item }) => {
  const path = "http://localhost:5000/newuploads/projekti/" + formatPath(item.naziv) + "/" + item.naslovnaSlika;

  return (
    <div className="workshopAreaContainer">
      <div className="workshopAreaItem">
        <div className="workshopAreaImageContainer">
          <img id={item.naziv} className="workshopAreaImage" src={path} alt="workshopAreaImage" />
        </div>
        <div className="projectAreaTitle">{item.naziv.toUpperCase()}</div>
      </div>
    </div>
  );
};

export default Project;
