import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatPath } from "../js/namechange";
import Form from "react-bootstrap/Form";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "./../css/SingleOffer.css";
import GoToTop from "../components/GoToTop";

function SingleOffer() {
  const [offer, setOffer] = useState([]);
  let { name } = useParams();
  const [images, setImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState({});
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
      <GoToTop />
      <div className="offerDescription">
        <div className="offerOpis">
          <img className="offerImage" src={path + offer.naslovnaSlika} />
          <div className="offerMainOpis">{offer.opis} </div>
        </div>
      </div>
      <div className="offerContainer">
        <div className="offerContainerFirstColumn">
          <div className="offerMainTitle">{offer.naziv}</div>
          <div className="offerContainerText">
            <div className="offerSadrzajPonude">{offer.sadrzajPonude}</div>
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
          <div className="bookingContainer">
            <div className="bookingTitle">
              <div className="bookingIcon">
                <img className="bookingImage" src="http://localhost:5000/newuploads/ikone/booking.png" alt="bookingLogo" />
              </div>
              <div className="bookingMainTitle">Booking Formular</div>
            </div>
            <div className="bookingFormular">
              <Form className="customFormContainer">
                <Form.Group controlId="validationCustom03">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  <Form.Control name="datum" required type="date" placeholder="datum" defaultValue="2023/04/28" />
                </Form.Group>

                <Form.Label className="itemTitleElement">Vrijeme</Form.Label>
                <Form.Group controlId="validationCustom03">
                  <input id="timeInput" type="time" defaultValue="19:00" name="appt" min="09:00" max="18:00" required></input>
                </Form.Group>
              </Form>
              <div className="bookADate">Rezerviši termin</div>
            </div>
          </div>
          <div className="bookingContainer">
            <div className="bookingTitle">
              <div className="bookingIcon">
                <img className="bookingImage" src="http://localhost:5000/newuploads/ikone/envelope.png" alt="bookingLogo" />
              </div>
              <div className="bookingMainTitle">Pošalji upit za rezervaciju</div>
            </div>
            <div className="bookingFormular">
              <Form className="customFormContainer">
                <Form.Group md="4" controlId="validationCustom01">
                  <Form.Label className="itemTitleElement">Ime i Prezime</Form.Label>
                  <Form.Control name="naslov" required type="text" />
                </Form.Group>

                <Form.Group md="4" controlId="validationCustom01">
                  <Form.Label className="itemTitleElement">E-mail</Form.Label>
                  <Form.Control name="naslov" required type="text" />
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom01">
                  <Form.Label className="itemTitleElement">Telefon</Form.Label>
                  <Form.Control name="naslov" required type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="itemTitleElement">Poruka</Form.Label>
                  <Form.Control required name="opisRadionice" as="textarea" rows={4} placeholder="Upišite poruku ovdje..." />
                </Form.Group>
                <Form>
                  <Form.Label className="itemTitleElement">Želim da me kontaktirate putem</Form.Label>
                  {["radio"].map((type) => (
                    <div className="offerRadioButtons" key={`inline-${type}`}>
                      <Form.Check defaultChecked className="itemTitleElement" inline label="E-maila" name="group1" type={type} id={`inline-${type}-1`} />
                      <Form.Check className="itemTitleElement" inline label="Telefona" name="group1" type={type} id={`inline-${type}-2`} />
                    </div>
                  ))}
                </Form>
              </Form>
              <div className="bookADate">Pošalji upit</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleOffer;

/*
<div className="offerImages">
            {images.map((image) => (
              <img id={image} className="offerInformationImageElement" src={path + image} alt="slikaSRadionice" />
            ))}
          </div>
*/
