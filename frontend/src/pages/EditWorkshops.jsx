import React, { useEffect } from "react";
import "./../components/ReadWorkshops.css";
import { useState } from "react";
import { addActivity } from "../redux/apiCalls";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import editIcon from "./../assets/editIcon.png";
import changePictureIcon from "./../assets/changePicture.png";
import deleteIcon from "./../assets/deleteIcon.png";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function EditWorkshops() {
  const [workshop, setWorkshop] = useState([]);
  let { name } = useParams();
  const [oblast, setOblast] = useState({});
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    console.log(workshop.oblastRadionice[0]);
    event.preventDefault();
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    console.log(workshop);
    updateWorkshop(formDataObj);
  };

  const updateWorkshop = async (formDataObj) => {
    try {
      const updatedWorkshop = {
        id: workshop.id,
        naslov: formDataObj.naslov,
        mjesto: formDataObj.mjesto,
        datum: formDataObj.datum,
        trener: formDataObj.trener,
        ucesnici: formDataObj.ucesnici,
        nazivDonatora: formDataObj.nazivDonatora,
        nazivProjekta: formDataObj.nazivProjekta,
        cilj: formDataObj.cilj,
        opisRadionice: formDataObj.opisRadionice,
        oblastRadionice: formDataObj.oblastRadionice,
      };
      console.log(updatedWorkshop);
      const res = await axios.patch(`http://localhost:5000/api/workshops/`, updatedWorkshop);
      //setWorkshop(res.data.data);

      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(workshop);
    const getWorkshop = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops/` + name);
        const dummyWorkshop = res.data.data;
        //let arrayWorkshop = [];
        //arrayWorkshop.push(dummyWorkshop.oblastRadionice);
        //dummyWorkshop.oblastRadionice = arrayWorkshop;
        setOblast(dummyWorkshop.oblastRadionice);
        setWorkshop(dummyWorkshop);
        console.log(dummyWorkshop);
      } catch (err) {
        console.log(err);
      }
    };
    getWorkshop();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Izmjena radionice</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naslov</Form.Label>
                <Form.Control name="naslov" required type="text" placeholder="Naslov radionice" defaultValue={workshop.naslov} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto radionice" defaultValue={workshop.mjesto} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col-md-4">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  <Form.Control name="datum" type="date" placeholder="datum" defaultValue={workshop.datum} />
                </Form.Group>
              </div>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" required type="text" placeholder="Naziv donatora" defaultValue={workshop.nazivDonatora} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Projekat</Form.Label>
                <Form.Control name="nazivProjekta" required type="text" placeholder="Naziv projekta" defaultValue={workshop.nazivProjekta} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Trener</Form.Label>
                <Form.Control name="trener" required type="text" placeholder="Ime trenera" defaultValue={workshop.trener} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Učesnici</Form.Label>
                <Form.Control name="ucesnici" required type="text" placeholder="Broj ili ime učesnika" defaultValue={workshop.ucesnici} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cilj</Form.Label>
                <Form.Control name="cilj" required type="text" placeholder="Cilj radionice" defaultValue={workshop.cilj} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Oblast radionice</Form.Label>
                <Form.Select name="oblastRadionice" aria-label="Default select example" value={oblast} onChange={(e) => setOblast(e.target.value)}>
                  <option value="Oblast radionice">Oblast radionice</option>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis radionice</Form.Label>
              <Form.Control name="opisRadionice" as="textarea" rows={4} defaultValue={workshop.opisRadionice} />
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

export default EditWorkshops;
