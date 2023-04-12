import React from "react";
import "./ProjectKick.css";

function ProjectKick() {
  return (
    <div className="detailedProjectContainer">
      <div className="projectEntity">
        <div className="detailedProjectText">
          <span>Naziv projekta:</span> Kreativni inovacijski centar Kakanj - KICK
        </div>
      </div>

      <div className="projectEntity">
        <div className="detailedProjectText">
          <span>Donator:</span> Regionalni program lokalne demokratije na Zapadnom Balkanu - ReLOaD, finansira Evropska unija (EU), a implementira Razvojni program Ujedinjenih nacija (UNDP i Općina Kakanj)
        </div>
      </div>

      <div className="projectEntity">
        <div className="detailedProjectText">
          <span>Iznos granta:</span> 59.376,00 KM
        </div>
      </div>

      <div className="projectEntity">
        <div className="detailedProjectText">
          <span>Vrijeme provedbe projekta: </span>1.9.2018.- 31.5.2019.{" "}
        </div>
        <div className="projectExtras">
          <div>Napomena: Od 31.5.2019. projekat je samoodrživ</div>
          <div>
            Web site: <a href="https://kick.ba">https://kick.ba</a>{" "}
          </div>
        </div>
      </div>

      <div className="projectEntity">
        <div className="detailedProjectText">
          <span>Cilj:</span> Razviti poticajno okruženje za društveno - ekonomsku afirmaciju mladih u općini Kakanj kako bi se bolje odgovorilo na potrebe različitih aktera (poslodavaca, institucija i organizacija)
        </div>
      </div>

      <div className="projectEntity">
        <div className="detailedProjectText">
          <span>Kratki opis projekta: </span>Ideja projekta je ispuniti potrebu za prostorom za umrežavanje, edukaciju, razmjenu i realizaciju društvenih i poslovnih ideja mladih od 15-30 godina starosti.
        </div>
        <div className="detailedProjectText">Kreativni - inovacijski centar Kakanj (KICK) je zamišljen kao napredan omladinski inkubacijski centar koji će biti mjesto susreta i razmjene ideja potencijalnih mladih poduzetnika i inovatora i voditelja društvenih promjena. </div>
      </div>

      <div className="projectEntity">
        <span>Metodologije koje projekat koristi:</span>
        <ul>
          <li>Istraživanje potreba poslovnih subjekata i potreba zajednice te kreiraje izazova koje projekat stavlja pred mlade ljude potičući njihovu kreativnost i inovativnost;</li>
          <li>Radionice za podizanje kapaciteta mladih ljudi; </li>
          <li>Rad u timovima na rješavanju društvenih i problema poslovnih subjekata (Radeći u timovima mladi ljudi su podrška jedni drugima). </li>
          <li>Susreti javnog i biznis sektora sa mladima koji su pokrenuli svoje biznise ili imaju poslovne i projektne ideje </li>
        </ul>
      </div>

      <div className="projectEntity">
        <span>Implementirani programi u Kicku 2019./2020.</span>
        <ol>
          <li>Kick - start your idea</li>
          <li>Kick out local problems</li>
          <li>Girls Kicking-in</li>
        </ol>
      </div>

      <div className="projectEntity">
        <span>Dodana vrijednost:</span>
        <br />
        <div className="detailedProjectText">1) Samoodrživost projekta osigurana je kroz različite grupe aktivnosti:</div>
        <ul>
          <li>Kurs programiranja</li>
          <li>Dječje kreativne radionice</li>
          <li>Zabavno učenje engleskog jezika</li>
          <li>Dječji rođendani</li>
          <li>Robotika</li>
        </ul>
        <div className="detailedProjectText">2) Projekt EPP</div>
        <br />
        <a href="https://kick.ba/epp/">https://kick.ba/epp/</a>
      </div>
    </div>
  );
}

export default ProjectKick;
