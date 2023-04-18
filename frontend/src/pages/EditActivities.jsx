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
import "./../css/EditProjects.css";

function EditActivities() {
  const [activity, setActivity] = useState([]);
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
    updateActivity(formDataObj);
  };

  const updateActivity = async (formDataObj) => {
    try {
      const updatedActivity = {
        id: activity.id,
        naziv: formDataObj.naziv,
        mjesto: formDataObj.mjesto,
        datum: formDataObj.datum,
        nazivDonatora: formDataObj.nazivDonatora,
        nazivProjekta: formDataObj.nazivProjekta,
        opisAktivnosti: formDataObj.opisAktivnosti,
      };
      const res = await axios.patch(`http://localhost:5000/api/activities/`, updatedActivity);
    } catch (err) {}
  };

  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/activities/` + name);
        console.log(res.data.data);
        setActivity(res.data.data);
      } catch (err) {}
    };
    getActivity();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Izmjena aktivnosti</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv aktivnosti</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv aktivnosti" defaultValue={activity.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto radionice" defaultValue={activity.mjesto} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  <Form.Control name="datum" type="date" placeholder="datum" defaultValue={activity.datum} />
                </Form.Group>
              </div>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" required type="text" placeholder="Naziv donatora" defaultValue={activity.nazivDonatora} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Projekat</Form.Label>
                <Form.Control name="nazivProjekta" required type="text" placeholder="Naziv projekta" defaultValue={activity.nazivProjekta} />
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
              <Form.Control name="opisAktivnosti" as="textarea" rows={4} defaultValue={activity.opisAktivnosti} />
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

export default EditActivities;
