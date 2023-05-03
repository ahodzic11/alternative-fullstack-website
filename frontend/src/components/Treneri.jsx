import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "./../css/OurTeam.css";

function Treneri() {
  return (
    <>
      <Navigation />
      <div className="outterContainer">
        <div class="responsive-container-block container">
          <p class="text-blk team-head-text">Treneri</p>
          <div class="responsive-container-block">
            <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
              <div class="card">
                <div class="team-image-wrapper">
                  <img class="team-member-image" src={"http://localhost:5000/newuploads/ponude/"} />
                </div>
                <p class="text-blk name">Dalibor Lovrić</p>
                <p class="text-blk position">Predsjednik Skupštine</p>
                <p class="text-blk feature-text">Aktivan od 1999.</p>
                <div class="social-icons">
                  <a href="https://www.twitter.com" target="_blank">
                    <img class="twitter-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Icon.svg" />
                  </a>
                  <a href="https://www.facebook.com" target="_blank">
                    <img class="facebook-icon" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Icon-1.svg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
/**/

export default Treneri;
