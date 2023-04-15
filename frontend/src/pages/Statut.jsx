import React, { useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import statut from "./../assets/pdffiles/Statut.pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Button from "react-bootstrap/Button";
import "./../css/Statut.css";

function Statut() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () => setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
  return (
    <>
      <Navigation />
      <div className="statutMainContainer">
        <div className="statutHeadline">Statut</div>

        <div className="statutDescription">Udruženje Alternative je osnovano sa svrhom zaštite i promocije ljudskih prava, osiguranje jednakih mogućnosti za sve i održiv razvoj lokalne zajednice.</div>

        <div>
          <Document className="statutDocumentFile" file={statut} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <nav>
            <div className="statutDocumentFileButtonsContainer">
              <Button className="statutDocumentFileButton" onClick={goToPrevPage} variant="outline-danger">
                Prethodna stranica
              </Button>
              <p className="statutDocumentPageNumber">
                Stranica {pageNumber} od {numPages}
              </p>
              <Button className="statutDocumentFileButton" onClick={goToNextPage} variant="outline-danger">
                Naredna stranica
              </Button>
            </div>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Statut;
