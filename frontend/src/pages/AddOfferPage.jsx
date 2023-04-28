import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addOffer } from "../redux/apiCalls";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import { formatPath } from "../js/namechange";
import "./../css/AddWorkshopPage.css";

function AddOfferPage() {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);

    try {
      const response = await axios.post(`http://localhost:5000/upload/ponude/` + inputs.naziv, uploadFormData);
    } catch (err) {}

    addOffer({
      naziv: inputs.naziv,
      formatiranNaziv: formatPath(inputs.naziv),
      opis: inputs.opis,
      sadrzajPonude: inputs.sadrzajPonude,
      trener: inputs.trener,
      pocetakPonude: inputs.pocetakPonude,
      krajPonude: inputs.krajPonude,
      cijena: inputs.cijena,
      uzrast: inputs.uzrast,
      napomene: inputs.napomene,
      naslovnaSlika: formatPath(inputs.naziv) + "0.jpg",
    });
  };

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Dodavanje ponude</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv ponude</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv ponude" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Uzrast</Form.Label>
                <Form.Control name="uzrast" required type="text" placeholder="Uzrast" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Početak ponude</Form.Label>
                  <Form.Control name="pocetakPonude" type="date" placeholder="datum" onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Kraj ponude</Form.Label>
                  <Form.Control name="krajPonude" type="date" placeholder="datum" onChange={handleChange} />
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cijena</Form.Label>
                <Form.Control name="cijena" required type="text" placeholder="U KM" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Trener</Form.Label>
                <Form.Control name="trener" required type="text" placeholder="Trener" onChange={handleChange} />
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
              <Form.Control name="opis" as="textarea" rows={2} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Sadržaj ponude</Form.Label>
              <Form.Control name="sadrzajPonude" as="textarea" rows={4} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Upute/napomene</Form.Label>
              <Form.Control name="napomene" as="textarea" rows={4} onChange={handleChange} />
            </Form.Group>
            <div className="addStuffButton">
              <Button type="submit">Dodaj ponudu</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default AddOfferPage;
