import React from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import "./../css/Navigation.css";

function Navigation() {
  function contactUs() {
    const element = document.getElementById("footerContactUsPoint");
    element.scrollIntoView();
  }

  return (
    <div className="navigation">
      <div className="logoSocialMediaContainer">
        <div className="randomEmptyDiv"></div>
        <LinkContainer to="/">
          <img id="navigationLogo" src={logo} alt="logo" />
        </LinkContainer>
        <div class="wrapper">
          <a href="https://www.facebook.com/groups/180492052013718">
            <div class="icon facebook">
              <div class="tooltip">Facebook</div>
              <span>
                <i class="fab fa-facebook-f"></i>
              </span>
            </div>
          </a>

          <a href="https://www.youtube.com/@udruzenjealternativekakanj442/videos">
            <div class="icon youtube">
              <div class="tooltip">YouTube</div>
              <span>
                <i class="fab fa-youtube"></i>
              </span>
            </div>
          </a>
        </div>
      </div>
      <Nav className="justify-content-center navigation-bar">
        <div className="dropdown">
          <div className="dropdown-headline">
            <a className="aboutUsLink" href="/onama">
              O NAMA
            </a>
          </div>
          <div className="dropdown-content">
            <div className="dropdown-content-item">
              <a id="nasTimPadding" href="/nastim">
                NAŠ TIM
              </a>
            </div>
            <div className="dropdown-content-item">
              <a href="/statut">STATUT</a>
            </div>
            <div className="dropdown-content-item">
              <a href="/historijat">HISTORIJAT</a>
            </div>
          </div>
        </div>
        <Nav.Item href="#link">PROJEKTI</Nav.Item>
        <Nav.Item href="#link">DONATORI</Nav.Item>
        <Nav.Item href="#link">VIJESTI</Nav.Item>
        <LinkContainer to="/drugionama">
          <Nav.Item>DRUGI O NAMA</Nav.Item>
        </LinkContainer>
        <LinkContainer to="/workshops">
          <Nav.Item>RADIONICE</Nav.Item>
        </LinkContainer>
        <LinkContainer to="/treneri">
          <Nav.Item>TRENERI</Nav.Item>
        </LinkContainer>
        <Nav.Item onClick={contactUs}>KONTAKT</Nav.Item>
      </Nav>
      <div className="yearsBanner">
        <div className="yearsBannerText">25 GODINA POSTOJANJA</div>
      </div>
    </div>
  );
}

export default Navigation;
