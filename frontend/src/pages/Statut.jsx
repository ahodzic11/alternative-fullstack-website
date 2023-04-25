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
  const [secondPageNumber, setSecondPageNumber] = useState(2);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = (e) => {
    e.preventDefault();
    setPageNumber(pageNumber - 2 <= 1 ? 1 : pageNumber - 2);
    setSecondPageNumber(secondPageNumber - 2 <= 2 ? 2 : secondPageNumber - 2);
  };

  const goToNextPage = (e) => {
    e.preventDefault();
    if (pageNumber == 9 || secondPageNumber == 10) return;
    setPageNumber(pageNumber + 2 >= numPages ? numPages : pageNumber + 2);
    setSecondPageNumber(secondPageNumber + 2 >= numPages ? numPages : secondPageNumber + 2);
  };
  return (
    <>
      <Navigation />
      <div className="statutMainContainer">
        <div className="statutHeadline">Statut</div>

        <div className="statutDescription">Udruženje Alternative je osnovano sa svrhom zaštite i promocije ljudskih prava, osiguranje jednakih mogućnosti za sve i održiv razvoj lokalne zajednice.</div>

        <div>
          <Document className="statutDocumentFile" file={statut} onLoadSuccess={onDocumentLoadSuccess}>
            <div className="pages">
              <Page pageNumber={pageNumber} />
              <Page pageNumber={secondPageNumber} />
            </div>
          </Document>
          <nav>
            <div className="statutDocumentFileButtonsContainer">
              {pageNumber == 1 ? (
                <div className="disabledButton">
                  <Button className="statutDocumentFileButton" onClick={(e) => goToPrevPage(e)} variant="outline-danger" disabled={true}>
                    Prethodni list
                  </Button>
                </div>
              ) : (
                <div className="enabledButton">
                  <Button className="statutDocumentFileButton" onClick={(e) => goToPrevPage(e)} variant="outline-danger">
                    Prethodni list
                  </Button>
                </div>
              )}
              <p className="statutDocumentPageNumber">
                List {secondPageNumber / 2} od {numPages / 2}
              </p>
              {pageNumber == 9 ? (
                <div className="disabledButton">
                  <Button className="statutDocumentFileButton" onClick={(e) => goToNextPage(e)} variant="outline-danger" disabled={true}>
                    Naredni list
                  </Button>
                </div>
              ) : (
                <div className="enabledButton">
                  <Button className="statutDocumentFileButton" onClick={(e) => goToNextPage(e)} variant="outline-danger">
                    Naredni list
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Statut;
