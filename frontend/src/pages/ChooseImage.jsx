import React, { useEffect } from "react";
import "./../components/AddWorkshopPage.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import { useParams } from "react-router-dom";

function ChooseImage() {
  const [workshop, setWorkshop] = useState({});
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState({});
  let { name } = useParams();
  const path = "https://www.nvo-alternative.org/images/radionice/" + name.replace(/ /g, "") + "/";

  useEffect(() => {
    const getSlike = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/` + name.replace(/ /g, ""));
        //console.log(response.data);
        setImages(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getWorkshop = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops/` + name);
        const dummyWorkshop = res.data.data;
        setWorkshop(dummyWorkshop);
        console.log(dummyWorkshop);
        setSelected(dummyWorkshop.naslovnaSlika);
      } catch (err) {
        console.log(err);
      }
    };

    const getSelected = async () => {
      try {
        console.log(name);
        const res = await axios.get(`http://localhost:5000/api/workshops/selectedImage/` + workshop.id);
        //console.log(res);
        //setSelected(dummyWorkshop);
      } catch (err) {
        console.log(err);
      }
    };

    getWorkshop();
    getSlike();
    getSelected();
  }, []);

  const updateImage = async () => {
    try {
      const updatedWorkshop = {
        id: workshop.id,
        naslovnaSlika: selected,
      };
      const res = await axios.patch(`http://localhost:5000/api/workshops/updateImage`, updatedWorkshop);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const selectedImage = (e) => {
    e.preventDefault();
    const slika = document.getElementById(e.target.id);
    setSelected(slika.id);
  };

  return (
    <>
      <AdminNavigation />
      <div className="currentLocationHeadline">Odabir naslovne slike</div>
      <div className="clickContainer">
        {images.length == 0 ? (
          <div className="nemaSlikaContainer">NEMATE UNESENIH</div>
        ) : (
          <>
            {images.map((image) => (
              <div className="imageSelection">
                {image == selected ? (
                  <div className="selectedImage">
                    <img id={image} className="chooseImageElement" src={path + image} alt="slikaSRadionice" onClick={(e) => selectedImage(e)} />
                    <div className="selectedDiv">ODABRANA</div>
                  </div>
                ) : (
                  <img id={image} className="chooseImageElement" src={path + image} alt="slikaSRadionice" onClick={(e) => selectedImage(e)} />
                )}
              </div>
              //<img id={image} className="chooseImageElement" src={path + image} alt="slikaSRadionice" onClick={(e) => selectedImage(e)} />
            ))}
          </>
        )}
      </div>
      <div id="saveSelectedImage" className="addStuffButton" onClick={updateImage}>
        <Button>Sačuvaj naslovnu</Button>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default ChooseImage;

/*
<img src={path} alt="slikaSRadionice" />;
          <div className="slikice">PROBA</div>;
*/
