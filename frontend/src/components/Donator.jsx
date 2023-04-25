import { formatPath } from "../js/namechange";
import "./../css/Donator.css";

const Donator = ({ item }) => {
  const path = "http://localhost:5000/newuploads/donatori/" + formatPath(item.naziv) + "/" + item.naslovnaSlika;

  return (
    <div className="donatorAreaContainer">
      <div className="donatorAreaItem">
        <div className="donatorAreaImageContainer">
          <img id={item.naziv} className="donatorAreaImage" src={path} alt="donatorAreaImage" />
        </div>
        <div className="donatorSecondWrapper">
          <div className="donatorAreaTitle">{item.naziv.toUpperCase()}</div>
          <div className="donatorPeriod">
            {item.pocetakPodrske == item.krajPodrske ? (
              <div>{item.pocetakPodrske}. godina</div>
            ) : (
              <div>
                {item.pocetakPodrske}. - {item.krajPodrske}. godina{" "}
              </div>
            )}
          </div>
          <div className="donatorLink">
            {item.link ? (
              <div>
                <a href={item.link}>{item.link}</a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donator;
