import "./../css/Activity.css";

const Activity = ({ item }) => {
  const path = "http://localhost:5000/newuploads/" + item.naziv.replace(/ /g, "") + "/" + item.naslovnaSlika;

  return (
    <div className="workshopAreaContainer">
      <div className="workshopAreaItem">
        <div className="workshopAreaImageContainer">
          <img id={item.naziv} className="workshopAreaImage" src={path} alt="workshopAreaImage" />
        </div>
        <div className="activityAreaTitle">{item.naziv.toUpperCase()}</div>
      </div>
    </div>
  );
};

export default Activity;
