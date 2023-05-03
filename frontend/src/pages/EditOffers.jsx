import React, { useEffect } from "react";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { englishFormatDate, formatDate, formatPath } from "../js/namechange";
import "./../css/ReadWorkshops.css";

function EditOffers() {
  const [offer, setOffer] = useState([]);
  let { name } = useParams();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    const form = event.currentTarget;
    console.log(formDataObj.tipPonude);
    if (formDataObj.tipPonude == "Tip ponude") {
      alert("Morate unijeti tip ponude!");
      return;
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    updateOffer(formDataObj);
  };

  const updateOffer = async (formDataObj) => {
    try {
      var firstDate = formDataObj.pocetakPonude.split("-");
      var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
      var secondDate = formDataObj.krajPonude.split("-");
      var secondCorrectDate = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
      const updatedOffer = {
        id: offer.id,
        naziv: formDataObj.naziv,
        formatiranNaziv: formatPath(formDataObj.naziv),
        opis: formDataObj.opis,
        sadrzajPonude: formDataObj.sadrzajPonude,
        trener: formDataObj.trener,
        pocetakPonude: formatDate(firstCorrectDate),
        krajPonude: formatDate(secondCorrectDate),
        cijena: formDataObj.cijena,
        uzrast: formDataObj.uzrast,
        napomene: formDataObj.napomene,
        tipPonude: formDataObj.tipPonude,
      };
      const res = await axios.patch(`http://localhost:5000/api/offers/`, updatedOffer);
    } catch (err) {}
  };

  useEffect(() => {
    const getOffer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/offers/` + name);
        const dummyWorkshop = res.data.data;
        setOffer(dummyWorkshop);
      } catch (err) {}
    };
    getOffer();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Izmjena ponude</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv ponude</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv ponude" defaultValue={offer.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Uzrast</Form.Label>
                <Form.Control name="uzrast" required type="text" placeholder="Uzrast" defaultValue={offer.uzrast} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cijena</Form.Label>
                <Form.Control name="cijena" required type="text" placeholder="U KM" defaultValue={offer.cijena} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Početak ponude</Form.Label>
                  {offer.pocetakPonude ? <Form.Control name="pocetakPonude" type="date" placeholder="datum" defaultValue={englishFormatDate(offer.pocetakPonude)} /> : <Form.Control name="pocetakPonude" type="date" placeholder="datum" />}
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Kraj ponude</Form.Label>
                  {offer.pocetakPonude ? <Form.Control name="krajPonude" type="date" placeholder="datum" defaultValue={englishFormatDate(offer.krajPonude)} /> : <Form.Control name="krajPonude" type="date" placeholder="datum" />}
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md={4} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Trener</Form.Label>
                <Form.Control name="trener" required type="text" placeholder="Trener" defaultValue={offer.trener} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Tip ponude</Form.Label>
                <Form.Select required name="tipPonude" aria-label="Default select example" value={offer.tipPonude}>
                  <option>Tip ponude</option>
                  <option value="Jednodnevna">Jednodnevna</option>
                  <option value="Višednevna">Višednevna</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input id="uploadedFiles" className="uploadImagesInput" type="file" name="image" multiple />
              </form>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis ponude</Form.Label>
              <Form.Control required name="opis" as="textarea" rows={2} defaultValue={offer.opis} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Sadržaj ponude</Form.Label>
              <Form.Control required name="sadrzajPonude" as="textarea" rows={4} defaultValue={offer.sadrzajPonude} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Upute/napomene</Form.Label>
              <Form.Control required name="napomene" as="textarea" rows={4} defaultValue={offer.napomene} />
            </Form.Group>
            <div className="addStuffButton">
              <Button type="submit">Sačuvaj izmjene</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default EditOffers;
