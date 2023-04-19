import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addWorkshop } from "../redux/apiCalls";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import "./../css/AddWorkshopPage.css";
import { formatPath } from "../js/namechange";

function AddWorkshopPage() {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    //event.preventDefault();
    if (inputs.oblastRadionice == null) return;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);

    try {
      const response = await axios.post(`http://localhost:5000/upload/radionice/` + inputs.naslov, uploadFormData);
    } catch (err) {}

    addWorkshop({
      naslov: inputs.naslov,
      mjesto: inputs.mjesto,
      formatiranNaslov: formatPath(inputs.naslov),
      datum: inputs.datum,
      trener: inputs.trener,
      ucesnici: inputs.ucesnici,
      nazivDonatora: inputs.nazivDonatora,
      nazivProjekta: inputs.nazivProjekta,
      cilj: inputs.cilj,
      opisRadionice: inputs.opisRadionice,
      oblastRadionice: inputs.oblastRadionice,
      naslovnaSlika: formatPath(inputs.naslov) + "0.jpg",
    });
  };

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Dodavanje radionice</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naslov</Form.Label>
                <Form.Control name="naslov" required type="text" placeholder="Naslov radionice" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto radionice" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col-md-4">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  <Form.Control name="datum" type="date" placeholder="datum" onChange={handleChange} />
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" required type="text" placeholder="Naziv donatora" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Projekat</Form.Label>
                <Form.Control name="nazivProjekta" required type="text" placeholder="Naziv projekta" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Trener</Form.Label>
                <Form.Control name="trener" required type="text" placeholder="Ime trenera" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Učesnici</Form.Label>
                <Form.Control name="ucesnici" required type="text" placeholder="Broj ili ime učesnika" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cilj</Form.Label>
                <Form.Control name="cilj" required type="text" placeholder="Cilj radionice" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Oblast radionice</Form.Label>
                <Form.Select name="oblastRadionice" aria-label="Default select example" onClick={handleChange}>
                  <option>Oblast radionice</option>
                  <option value="Civilno društvo">Civilno društvo</option>
                  <option value="Izgradnja samopoštovanja i samopouzdanja">Izgradnja samopoštovanja i samopouzdanja</option>
                  <option value="Ekologija i zdravlje">Ekologija i zdravlje</option>
                  <option value="Dječje kreativne radionice">Dječje kreativne radionice</option>
                  <option value="Izgradnja mira">Izgradnja mira</option>
                  <option value="Kultura i obrazovanje">Kultura i obrazovanje</option>
                  <option value="Ljudska prava">Ljudska prava</option>
                  <option value="Prevencija rodno zasnovanog nasilja">Prevencija rodno zasnovanog nasilja</option>
                  <option value="Prevencija bolesti ovisnosti">Prevencija bolesti ovisnosti</option>
                  <option value="Jačanje kompetencija mladih">Jačanje kompetencija mladih</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input className="uploadImagesInput" type="file" name="image" multiple />
              </form>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis radionice</Form.Label>
              <Form.Control name="opisRadionice" as="textarea" rows={4} onChange={handleChange} />
            </Form.Group>
            <div className="addStuffButton">
              <Button type="submit">Dodaj radionicu</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default AddWorkshopPage;
