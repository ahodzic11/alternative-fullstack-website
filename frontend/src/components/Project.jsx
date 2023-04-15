import "./../css/Project.css";

const Project = ({ item }) => {
  const path = "http://localhost:5000/newuploads/" + item.naziv.replace(/ /g, "") + "/" + item.naslovnaSlika;

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
