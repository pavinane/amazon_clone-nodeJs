import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner-content position-relative p-3">
                <img
                  src="images/main-banner-1.jpg"
                  alt="main-banner"
                  className="img-fluid rounded-3"
                />
                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>IPad S13+ Pro.</h5>
                  <p>From $999 0r $41.62/mo.</p>
                  <Link className="button">Buy Now</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              {/* <div className="d-flex flex-wrap justify-content-between align-items-center "> */}
              <div className="small-banner-content position-relative p-3">
                <img
                  src="images/main-banner-1.jpg"
                  alt="small-banner"
                  className="img-fluid rounded-3"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>IPad S13+ Pro.</h5>
                  <p>From $999 0r $41.62/mo.</p>
                  <Link className="button">Buy Now</Link>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
