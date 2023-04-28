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
import "./../css/ReadWorkshops.css";
import { formatPath } from "../js/namechange";

function EditOffers() {
  const [offer, setOffer] = useState([]);
  let { name } = useParams();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    updateOffer(formDataObj);
  };

  const updateOffer = async (formDataObj) => {
    try {
      const updatedOffer = {
        id: offer.id,
        naziv: formDataObj.naziv,
        formatiranNaziv: formatPath(formDataObj.naziv),
        opis: formDataObj.opis,
        sadrzajPonude: formDataObj.sadrzajPonude,
        trener: formDataObj.trener,
        pocetakPonude: formDataObj.pocetakPonude,
        krajPonude: formDataObj.krajPonude,
        cijena: formDataObj.cijena,
        uzrast: formDataObj.uzrast,
        napomene: formDataObj.napomene,
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
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            </Row>
            <Row className="mb-3">
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Početak ponude</Form.Label>
                  <Form.Control name="pocetakPonude" type="date" placeholder="datum" defaultValue={offer.pocetakPonude} />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Kraj ponude</Form.Label>
                  <Form.Control name="krajPonude" type="date" placeholder="datum" defaultValue={offer.krajPonude} />
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cijena</Form.Label>
                <Form.Control name="cijena" required type="text" placeholder="U KM" defaultValue={offer.cijena} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Trener</Form.Label>
                <Form.Control name="trener" required type="text" placeholder="Trener" defaultValue={offer.trener} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input className="uploadImagesInput" type="file" name="image" multiple />
              </form>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis ponude</Form.Label>
              <Form.Control name="opis" as="textarea" rows={2} defaultValue={offer.opis} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Sadržaj ponude</Form.Label>
              <Form.Control name="sadrzajPonude" as="textarea" rows={4} defaultValue={offer.sadrzajPonude} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Upute/napomene</Form.Label>
              <Form.Control name="napomene" as="textarea" rows={4} defaultValue={offer.napomene} />
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
