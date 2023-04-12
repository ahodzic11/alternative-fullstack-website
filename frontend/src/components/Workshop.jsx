import "./../components/Workshops.css";

const Workshop = ({ item }) => {
  return <div className="containerWorkshopItem">{item.naslov}</div>;
};

export default Workshop;
