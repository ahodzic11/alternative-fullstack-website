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
import { formatDate, formatPath } from "../js/namechange";

function EditArticles() {
  const [article, setArticle] = useState([]);
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
    /*var datum = "24.01.2023";
    var date = datum.split(".");
    console.log(date[0]);
    console.log(date[1]);
    console.log(date[2]);
    var fullDate = new Date(date[2], date[1] - 1, date[0]);
    console.log(fullDate);
    let year = fullDate.getFullYear();
    //console.log(fullDate);
    return;
    */
    setValidated(true);
    updateArticle(formDataObj);
  };

  const updateArticle = async (formDataObj) => {
    var firstDate = formDataObj.datum.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
    try {
      const updatedArticle = {
        id: article.id,
        naziv: formDataObj.naziv,
        formatiranNaziv: formatPath(formDataObj.naziv),
        nazivMedija: formDataObj.nazivMedija,
        tipMedija: formDataObj.tipMedija,
        tekst: formDataObj.tekst,
        datum: formatDate(firstCorrectDate),
      };
      const res = await axios.patch(`http://localhost:5000/api/articles/`, updatedArticle);
    } catch (err) {}
  };

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/articles/` + name);
        setArticle(res.data.data);
      } catch (err) {}
    };
    getArticle();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Izmjena članka</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv članka" defaultValue={article.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Naziv medija</Form.Label>
                <Form.Control name="nazivMedija" required type="text" placeholder="Naziv medija" defaultValue={article.nazivMedija} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Link</Form.Label>
                <Form.Control name="link" required type="text" placeholder="Link" defaultValue={article.link} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col-md-4">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  <Form.Control name="datum" type="date" placeholder="datum" defaultValue={article.datum} />
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Tip medija</Form.Label>
                <Form.Select name="tipMedija" aria-label="Default select example" value={article.tipMedija}>
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
              <Form.Control name="tekst" as="textarea" rows={4} defaultValue={article.tekst} />
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

export default EditArticles;
