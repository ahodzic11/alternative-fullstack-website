import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatPath } from "../js/namechange";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "./../css/SingleOffer.css";

function SingleOffer() {
  const [offer, setOffer] = useState([]);
  let { name } = useParams();
  const [images, setImages] = useState([]);
  const path = "http://localhost:5000/newuploads/ponude/" + name + "/";

  useEffect(() => {
    const getOffer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/offers/` + name);
        const dummyWorkshop = res.data.data;
        console.log(dummyWorkshop);
        setOffer(dummyWorkshop);
      } catch (err) {}
    };

    const getSlike = async () => {
      console.log(path);
      try {
        const response = await axios.get(`http://localhost:5000/ponude/` + name);
        setImages(response.data);
      } catch (err) {}
    };
    getOffer();
    getSlike();
  }, []);

  return (
    <>
      <Navigation />

      <div className="offerMainTitle">{offer.naziv}</div>
      <div className="offerContainer">
        <div className="offerContainerFirstColumn">
          <div className="offerImageContainer">
            <img className="offerImageElement" src={"http://localhost:5000/newuploads/ponude/" + name + "/" + offer.naslovnaSlika} />
          </div>
          <div className="offerContainerText">
            <div className="offerOpis">
              <span>Opis: </span>
              {offer.opis}
            </div>
            <div className="offerSadrzajPonude">
              <span>Sadržaj ponude: </span>
              {offer.sadrzajPonude}
            </div>
            <div className="offerTrener">
              <span>Animator/i: </span>
              {offer.trener}
            </div>
            <div className="offerPocetakPonude">
              <span>Početak ponude: </span>
              {offer.pocetakPonude}
            </div>
            <div className="offerKrajPonude">
              <span>Kraj ponude: </span>
              {offer.krajPonude}
            </div>
            <div className="offerCijena">
              <span>Cijena: </span>
              {offer.cijena} KM
            </div>
            <div className="offerUzrast">
              <span>Uzrast: </span>
              {offer.uzrast}
            </div>
          </div>
        </div>
        <div className="offerContainerSecondColumn">
          <div className="onlinePrijava">ONLINE PRIJAVA</div>
          <div className="offerImages">
            {images.map((image) => (
              <img id={image} className="offerInformationImageElement" src={path + image} alt="slikaSRadionice" />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleOffer;
