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

function EditNews() {
  const [news, setNews] = useState([]);
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
    updateNews(formDataObj);
  };

  const updateNews = async (formDataObj) => {
    try {
      const updatedNewsArticle = {
        id: news.id,
        naziv: formDataObj.naziv,
        tema: formDataObj.tema,
        datum: formDataObj.datum,
        tekstVijesti: formDataObj.tekstVijesti,
      };
      const res = await axios.patch(`http://localhost:5000/api/news/`, updatedNewsArticle);
    } catch (err) {}
  };

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/` + name);
        setNews(res.data.data);
      } catch (err) {}
    };
    getNews();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Izmjena vijesti</div>
        <div className="addWorkshopForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv vijesti" defaultValue={news.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Tema</Form.Label>
                <Form.Control name="tema" required type="text" placeholder="Tema vijesti" defaultValue={news.tema} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col-md-4">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  <Form.Control name="datum" type="date" placeholder="datum" defaultValue={news.datum} />
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input className="uploadImagesInput" type="file" name="image" multiple />
              </form>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Tekst vijesti</Form.Label>
              <Form.Control name="tekstVijesti" as="textarea" rows={4} defaultValue={news.tekstVijesti} />
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

export default EditNews;
