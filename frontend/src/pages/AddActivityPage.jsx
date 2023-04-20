import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addActivity } from "../redux/apiCalls";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import "./../css/AddWorkshopPage.css";
import { formatPath } from "../js/namechange";

function AddActivityPage() {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);

    try {
      const response = await axios.post(`http://localhost:5000/upload/aktivnosti/` + inputs.naziv, uploadFormData);
    } catch (err) {}

    addActivity({
      naziv: inputs.naziv,
      formatiranNaziv: formatPath(inputs.naziv),
      mjesto: inputs.mjesto,
      datum: inputs.datum,
      nazivDonatora: inputs.nazivDonatora,
      nazivProjekta: inputs.nazivProjekta,
      opisAktivnosti: inputs.opisAktivnosti,
      naslovnaSlika: formatPath(inputs.naziv) + "0.jpg",
    });
  };

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Dodavanje aktivnosti</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv aktivnosti</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv aktivnosti" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto radionice" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col">
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
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input className="uploadImagesInput" type="file" name="image" multiple />
              </form>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis aktivnosti</Form.Label>
              <Form.Control name="opisAktivnosti" as="textarea" rows={4} onChange={handleChange} />
            </Form.Group>
            <div className="addStuffButton">
              <Button type="submit">Dodaj aktivnost</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default AddActivityPage;
