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

function EditProjects() {
  const [project, setProject] = useState([]);
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
    updateProject(formDataObj);
  };

  const updateProject = async (formDataObj) => {
    try {
      const updatedProject = {
        id: project.id,
        naziv: formDataObj.naziv,
        mjesto: formDataObj.mjesto,
        pocetakImplementacije: formDataObj.pocetakImplementacije,
        krajImplementacije: formDataObj.krajImplementacije,
        nazivDonatora: formDataObj.nazivDonatora,
        projektniGrant: formDataObj.projektniGrant,
        ciljnaGrupa: formDataObj.ciljnaGrupa,
        cilj: formDataObj.cilj,
        opisProjekta: formDataObj.opisProjekta,
      };
      console.log(updatedProject);
      const res = await axios.patch(`http://localhost:5000/api/projects/`, updatedProject);
    } catch (err) {}
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/` + name);
        setProject(res.data.data);
      } catch (err) {}
    };
    getProject();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Izmjena projekta</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv projekta</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv projekta" defaultValue={project.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto implementacije</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto implementacije" defaultValue={project.mjesto} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Početak implementacije</Form.Label>
                  <Form.Control name="pocetakImplementacije" type="date" placeholder="datum" defaultValue={project.pocetakImplementacije} />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Kraj implementacije</Form.Label>
                  <Form.Control name="krajImplementacije" type="date" placeholder="datum" defaultValue={project.krajImplementacije} />
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" required type="text" placeholder="Naziv donatora" defaultValue={project.nazivDonatora} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Grant</Form.Label>
                <Form.Control name="projektniGrant" required type="text" placeholder="Grant" defaultValue={project.projektniGrant} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Ciljna grupa</Form.Label>
                <Form.Control name="ciljnaGrupa" required type="text" placeholder="Ciljna grupa" defaultValue={project.ciljnaGrupa} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label className="itemTitleElement">Cilj</Form.Label>
              <Form.Control name="cilj" required type="text" placeholder="Cilj projekta" defaultValue={project.cilj} />
              <Form.Control.Feedback>Okej!</Form.Control.Feedback>
            </Form.Group>
            <Row className="mb-3"></Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis projekta</Form.Label>
              <Form.Control name="opisProjekta" as="textarea" rows={4} defaultValue={project.opisProjekta} />
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

export default EditProjects;
