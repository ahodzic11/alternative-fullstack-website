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

function EditDonators() {
  const [donator, setDonator] = useState([]);
  let { name } = useParams();
  const [oblast, setOblast] = useState({});
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
    updateDonator(formDataObj);
  };

  const updateDonator = async (formDataObj) => {
    try {
      const updatedDonator = {
        id: donator.id,
        naziv: formDataObj.naziv,
        link: formDataObj.link,
        pocetakPodrske: formDataObj.pocetakPodrske,
        krajPodrske: formDataObj.krajPodrske,
      };
      const res = await axios.patch(`http://localhost:5000/api/donators/`, updatedDonator);
    } catch (err) {}
  };

  useEffect(() => {
    const getDonator = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/donators/` + name);
        const dummyWorkshop = res.data.data;
        setDonator(dummyWorkshop);
      } catch (err) {}
    };
    getDonator();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Izmjena donatora</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv donatora" defaultValue={donator.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Link</Form.Label>
                <Form.Control name="link" required type="text" placeholder="Link na stranicu donatora" defaultValue={donator.link} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Početak podrške</Form.Label>
                <Form.Control name="pocetakPodrske" required type="text" placeholder="npr. 2016" defaultValue={donator.pocetakPodrske} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Kraj podrške</Form.Label>
                <Form.Control name="krajPodrske" required type="text" placeholder="npr. 2019" defaultValue={donator.krajPodrske} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Logo donatora</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input className="uploadImagesInput" type="file" name="image" />
              </form>
            </Row>
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

export default EditDonators;
