import "./../css/WorkshopArea.css";

const WorkshopArea = ({ item }) => {
  const path = "http://localhost:5000/newuploads/oblastiRadionice/" + item.replace(/ /g, "") + ".jpg";

  return (
    <div className="workshopAreaContainer">
      <div className="workshopAreaItem">
        <div className="workshopAreaImageContainer">
          <img id={item} className="workshopAreaImage" src={path} alt="workshopAreaImage" />
        </div>
        <div className="workshopAreaTitle">
          <div>{item.toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopArea;
