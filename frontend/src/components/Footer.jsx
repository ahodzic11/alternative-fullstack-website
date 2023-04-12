import React from "react";
import "./Footer.css";
import logo from "../assets/logo.png";
import facebookLogo from "../assets/facebook.jpg";
import instagramLogo from "../assets/instagram.jpg";
import youtubeLogo from "../assets/youtube.jpg";

function Footer() {
  return (
    <div className="footerDiv">
      <div className="mainDiv">
        <div className="emptyDiv1"></div>
        <div className="mainInformation">
          <a href="/">
            <img className="alternativeLogo" src={logo} alt="alternativeLogo" />
          </a>
          <div className="alternativeInfoContainer">
            <div className="alternativeInfo">Ulica Šehida 5</div>
            <div className="alternativeInfo">Kakanj 72240</div>
            <div className="alternativeInfo">+387 32 556 288</div>
            <div className="alternativeInfo">Bosna i Hercegovina</div>
          </div>
        </div>
        <div className="emptyDiv2"></div>
        <div className="references">
          <div className="title">POVEZNICE</div>
          <a href="/onama">
            <div className="reference">O NAMA</div>
          </a>
          <div className="reference">PROJEKTI</div>
          <div className="reference">DONATORI</div>
          <div className="reference">VIJESTI</div>
          <a href="/drugionama">
            <div className="reference">DRUGI O NAMA</div>
          </a>
          <div className="reference">KONTAKT</div>
        </div>
      </div>
      <div className="copyrightFooter">Copyright © Udruženje Alternative Kakanj 2023</div>
    </div>
  );
}

export default Footer;
