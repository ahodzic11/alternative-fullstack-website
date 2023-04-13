import "./../components/WorkshopArea.css";

const WorkshopArea = ({ item, image }) => {
  return (
    <div className="workshopAreaContainer">
      <div className="workshopAreaItem">
        <div className="workshopAreaImageContainer">
          <img id={item} className="workshopAreaImage" src={image} />
        </div>
        <div className="workshopAreaTitle">{item}</div>
      </div>
    </div>
  );
};

export default WorkshopArea;
