import React from "react";
import "./ActivityBar.css";
import itLogo from "./../assets/it.png";
import kidsCreative from "./../assets/kids.png";
import englishWorkshop from "./../assets/english.png";
import birthdayLogo from "./../assets/gift.png";
import robotLogo from "./../assets/robot.png";
import Button from "react-bootstrap/Button";

function AcitivityBar() {
  return (
    <div className="activityContainer">
      <div id="joinPlace"></div>
      <div className="joinActivityText">Pridružite se aktivnostima u KICK-u</div>
      <div className="activities first-row">
        <div className="IT  activityItem">
          <img className="activityImage" src={itLogo} alt="itLogo" />
          <div className="activityText">Kurs informatike</div>
          <div className="activityDetailedText">Budi u trendu, budi informatički obrazovan. U kicku nudimo različite IT programe</div>
          <Button className="activityButton" variant="outline-dark">
            <div className="activityButtonText">SAZNAJ VIŠE</div>
          </Button>
        </div>
        <div className="kidsCreativeWorkshops activityItem">
          <img className="activityImage" src={kidsCreative} alt="kidsLogo" />
          <div className="activityText">Dječje kreativne radionice</div>
          <div className="activityDetailedText">Učimo engleski kroz igru. Pametno učenje engleskog jezika namijenjeno je djeci od 4 do 12 godina</div>
          <Button className="activityButton" variant="outline-dark">
            <div className="activityButtonText">SAZNAJ VIŠE</div>
          </Button>
        </div>
        <div className="englishWorkshops activityItem">
          <img className="activityImage" src={englishWorkshop} alt="englishLogo" />
          <div className="activityText">Radionice engleskog jezika</div>
          <div className="activityDetailedText">Kreativno-edukativne radionice za zdrav rast i razvoj vaše djece</div>
          <Button className="activityButton" variant="outline-dark">
            <div className="activityButtonText">SAZNAJ VIŠE</div>
          </Button>
        </div>
      </div>
      <div className="activities second-row">
        <div className="birthdays activityItem">
          <img className="activityImage" src={birthdayLogo} alt="birthdayLogo" />
          <div className="activityText">Dječji rođendani</div>
          <div className="activityDetailedText">Napravite najbolji party u Kicku pun smijeha, zabave i nezaboravnog druženja</div>
          <Button className="activityButton" variant="outline-dark">
            <div className="activityButtonText">SAZNAJ VIŠE</div>
          </Button>
        </div>
        <div className="robotics activityItem">
          <img className="activityImage" src={robotLogo} alt="robotLogo" />
          <div className="activityText">Kurs robotike</div>
          <div className="activityDetailedText">Učenje robotike je zabavno i izazovno ali i važno za budućnost vašeg djeteta</div>
          <Button className="activityButton" variant="outline-dark">
            <div className="activityButtonText">SAZNAJ VIŠE</div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AcitivityBar;
