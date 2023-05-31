import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import GoToTop from "../components/GoToTop";
import axios from "axios";
import "./../css/Galerija.css";

function Galerija() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getSlike = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/galerija/`);
        setImages(response.data);
      } catch (err) {}
    };

    getSlike();
  }, []);

  return (
    <>
      <Navigation />
      <div className="heading text-center">
        <h2>NAŠA GALERIJA</h2>
      </div>
      <ul id="hexGrid">
        {images.map((image) => (
          <li class="hex">
            <div class="hexIn">
              <img className="hexImageElement" src={"http://localhost:5000/newuploads/galerija/" + image} alt="" />
              <h1>This is a title</h1>
              <p>Some sample text about the article this hexagon leads to</p>
            </div>
          </li>
        ))}
      </ul>
      <GoToTop />
      <Footer />
    </>
  );
}

export default Galerija;
