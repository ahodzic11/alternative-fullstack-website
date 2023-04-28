import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addArticle } from "../redux/apiCalls";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import { formatDate, formatPath } from "../js/namechange";
import "./../css/AddWorkshopPage.css";

function AddArticlePage() {
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
      const response = await axios.post(`http://localhost:5000/upload/clanci/` + inputs.naziv, uploadFormData);
    } catch (err) {}
    var firstDate = inputs.datum.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);

    addArticle({
      naziv: inputs.naziv,
      formatiranNaziv: formatPath(inputs.naziv),
      nazivMedija: inputs.nazivMedija,
      tipMedija: inputs.tipMedija,
      tekst: inputs.tekst,
      datum: formatDate(firstCorrectDate),
      link: inputs.link,
      naslovnaSlika: formatPath(inputs.naziv) + "0.jpg",
    });
  };

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Dodavanje članka</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv članka" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Naziv medija</Form.Label>
                <Form.Control name="nazivMedija" required type="text" placeholder="Naziv medija" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Link</Form.Label>
                <Form.Control name="link" required type="text" placeholder="Link" onChange={handleChange} />
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
                <Form.Label className="itemTitleElement">Tip medija</Form.Label>
                <Form.Select name="tipMedija" aria-label="Default select example" onClick={handleChange}>
                  <option>Tip medija</option>
                  <option value="Web portal">Web portal</option>
                  <option value="Društvene mreže">Društvene mreže</option>
                  <option value="TV">TV</option>
                  <option value="Štampa">Štampa</option>
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
              <Form.Label className="itemTitleElement">Tekst</Form.Label>
              <Form.Control name="tekst" as="textarea" rows={4} onChange={handleChange} />
            </Form.Group>
            <div className="addStuffButton">
              <Button type="submit">Dodaj članak</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default AddArticlePage;
