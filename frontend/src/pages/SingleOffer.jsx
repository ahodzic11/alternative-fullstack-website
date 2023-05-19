import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate, formatPath } from "../js/namechange";
import Form from "react-bootstrap/Form";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import GoToTop from "../components/GoToTop";
import Row from "react-bootstrap/Row";
import { addReservation, addQuestion, addApplication } from "../redux/apiCalls";
import "./../css/SingleOffer.css";

function SingleOffer() {
  let { name } = useParams();
  const [offer, setOffer] = useState([]);
  const [inputs, setInputs] = useState({});
  const [images, setImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState({});
  const [tipKontakta, setTipKontakta] = useState("E-mail");
  const path = "http://localhost:5000/newuploads/ponude/" + name + "/";

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const getOffer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/offers/` + name);
        const dummyWorkshop = res.data.data;
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

  const rezervisiTermin = async () => {
    if (!inputs.imeIPrezime || inputs.imeIPrezime == "") {
      alert("Morate unijeti ime i prezime!");
    }
    if (!inputs.datum || inputs.datum == "dd/mm/yyyy") {
      alert("Morate unijeti datum!");
    }
    var firstDate = inputs.datum.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
    addReservation({
      nazivPonude: offer.naziv,
      imePrezime: inputs.imePrezime,
      datum: formatDate(firstCorrectDate),
      vrijeme: document.getElementById("timeInput").value,
      telefon: inputs.telefon,
    });
    alert("Rezervisali ste termin!");
  };

  const handleRadioChange = (event) => {
    if (event.target.id == "inline-radio-1") setTipKontakta("E-mail");
    else if (event.target.id == "inline-radio-2") setTipKontakta("Telefon");
  };

  const postaviUpit = async () => {
    if (document.getElementById("upitImePrezime").value == "") {
      alert("Morate unijeti ime i prezime!");
      return;
    }
    if (document.getElementById("upitEmail").value == "") {
      alert("Morate unijeti email!");
      return;
    }
    if (document.getElementById("upitTelefon").value == "") {
      alert("Morate unijeti broj telefona!");
      return;
    }
    if (document.getElementById("upitPoruka").value == "") {
      alert("Morate unijeti poruku!");
      return;
    }
    addQuestion({
      nazivPonude: offer.naziv,
      imePrezime: document.getElementById("upitImePrezime").value,
      email: document.getElementById("upitEmail").value,
      telefon: document.getElementById("upitTelefon").value,
      poruka: document.getElementById("upitPoruka").value,
      tipKontakta: tipKontakta,
    });
    alert("Poslali ste upit!");
  };

  const prijaviSe = async () => {
    if (document.getElementById("prijavaImePrezime").value == "") {
      alert("Morate unijeti ime i prezime!");
      return;
    }
    if (document.getElementById("prijavaEmail").value == "") {
      alert("Morate unijeti email!");
      return;
    }

    const date = new Date();
    addApplication({
      nazivPonude: offer.naziv,
      imePrezime: document.getElementById("prijavaImePrezime").value,
      email: document.getElementById("prijavaEmail").value,
      datumPrijave: formatDate(date),
    });
    alert("Prijavili ste se na " + offer.naziv + "!");
  };

  return (
    <>
      <Navigation />
      <GoToTop />
      <div className="offerMainTitle">{offer.naziv}</div>
      <div className="offerContainer">
        <div className="offerContainerFirstColumn">
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
              {offer.cijena}
            </div>
            <div className="offerUzrast">
              <span>Uzrast: </span>
              {offer.uzrast}
            </div>
          </div>
        </div>
        <div className="offerContainerSecondColumn">
          {offer.tipPrijave == "Rezervacija" ? (
            <div className="bookingContainer">
              <div className="bookingTitle">
                <div className="bookingIcon">
                  <img className="bookingImage" src="http://localhost:5000/newuploads/ikone/booking.png" alt="bookingLogo" />
                </div>
                <div className="bookingMainTitle">Booking Formular</div>
              </div>
              <div className="bookingFormular">
                <Form className="customFormContainer">
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom03">
                      <Form.Label className="itemTitleElement">Ime i prezime</Form.Label>
                      <Form.Control name="imePrezime" required type="text" onChange={handleChange} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom03">
                      <Form.Label className="itemTitleElement">Datum</Form.Label>
                      <Form.Control name="datum" required type="date" placeholder="datum" defaultValue="2023/04/28" onChange={handleChange} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom03">
                      <Form.Label className="itemTitleElement">Vrijeme</Form.Label>
                      <input id="timeInput" type="time" defaultValue="19:00" name="appt" min="09:00" max="18:00" required onChange={handleChange}></input>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom03">
                      <Form.Label className="itemTitleElement">Kontakt telefon</Form.Label>
                      <Form.Control name="telefon" required type="text" onChange={handleChange} />
                    </Form.Group>
                  </Row>
                </Form>
                <div className="bookADate" onClick={rezervisiTermin}>
                  Rezerviši termin
                </div>
              </div>
            </div>
          ) : (
            <div className="bookingContainer">
              <div className="bookingTitle">
                <div className="bookingIcon">
                  <img className="bookingImage" src="http://localhost:5000/newuploads/ikone/booking.png" alt="bookingLogo" />
                </div>
                <div className="bookingMainTitle">Pošalji prijavu</div>
              </div>
              <div className="bookingFormular">
                <Form className="customFormContainer">
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom03">
                      <Form.Label className="itemTitleElement">Ime i prezime</Form.Label>
                      <Form.Control id="prijavaImePrezime" name="prijavaImePrezime" required type="text" />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom03">
                      <Form.Label className="itemTitleElement">E-mail</Form.Label>
                      <Form.Control id="prijavaEmail" name="prijavaEmail" required type="text" />
                    </Form.Group>
                  </Row>
                </Form>
                <div className="bookADate" onClick={prijaviSe}>
                  Prijavi se
                </div>
              </div>
            </div>
          )}

          <div className="bookingContainer">
            <div className="bookingTitle">
              <div className="bookingIcon">
                <img className="bookingImage" src="http://localhost:5000/newuploads/ikone/envelope.png" alt="bookingLogo" />
              </div>
              <div className="bookingMainTitle">Pošalji upit za rezervaciju</div>
            </div>
            <div className="bookingFormular">
              <Form className="customFormContainer">
                <Row className="mb-3">
                  <Form.Group md="4" controlId="validationCustom01">
                    <Form.Label className="itemTitleElement">Ime i Prezime</Form.Label>
                    <Form.Control id="upitImePrezime" name="upitImePrezime" required type="text" />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group md="4" controlId="validationCustom01">
                    <Form.Label className="itemTitleElement">E-mail</Form.Label>
                    <Form.Control id="upitEmail" name="upitEmail" required type="text" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group md="4" controlId="validationCustom01">
                    <Form.Label className="itemTitleElement">Telefon</Form.Label>
                    <Form.Control id="upitTelefon" name="upitTelefon" required type="text" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="itemTitleElement">Poruka</Form.Label>
                    <Form.Control id="upitPoruka" required name="upitPoruka" as="textarea" rows={4} placeholder="Upišite poruku ovdje..." />
                  </Form.Group>
                </Row>
                <Form>
                  <Form.Label className="itemTitleElement">Želim da me kontaktirate putem</Form.Label>
                  {["radio"].map((type) => (
                    <div className="offerRadioButtons" key={`inline-${type}`} onChange={(e) => handleRadioChange(e)}>
                      <Form.Check defaultChecked className="itemTitleElement" inline label="E-maila" name="group1" type={type} id={`inline-${type}-1`} />
                      <Form.Check className="itemTitleElement" inline label="Telefona" name="group1" type={type} id={`inline-${type}-2`} />
                    </div>
                  ))}
                </Form>
              </Form>
              <div className="bookADate" onClick={postaviUpit}>
                Pošalji upit
              </div>
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
