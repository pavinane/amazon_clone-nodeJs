import React from "react";
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin, BsInstagram, BsYoutube } from "react-icons/bs";

function Footer() {
  return (
    <div>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row  align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="newletter" />
                <h2 className="mb-0 ">Sign for the Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <h4 className="mb-4">Contact Us</h4>
              <div>
                <address className="fs-6">
                  No.50 The World is Mine <br /> SolarSystem
                </address>
                <a
                  href="tel:+91 8072329880"
                  className="mt-4 d-block mb-1 text-white"
                >
                  +91 8072329880
                </a>
                <a
                  href="mailto:pavimegan77@gmail.com"
                  className="mt-4 d-block mb-0 text-white"
                >
                  pavimegan77@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-10 text-white mt-4">
                  <a href="https://github.com/pavinane" className="text-white">
                    <BsGithub className="fs-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pavithranath-karmegan-425424197/"
                    className="text-white"
                  >
                    <BsLinkedin className="fs-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pavithranath-karmegan-425424197/"
                    className="text-white"
                  >
                    <BsInstagram className="fs-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pavithranath-karmegan-425424197/"
                    className="text-white"
                  >
                    <BsYoutube className="fs-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4">
              <h4 className="mb-4">Information</h4>
              <div className="footer-links d-flex flex-column justify-center">
                <Link className="py-2 mb-1 text-white">Privacy Policy</Link>
                <Link className="py-2 mb-1 text-white">Refund Policy</Link>
                <Link className="py-2 mb-1 text-white">Shipping Policy</Link>
                <Link className="py-2 mb-1 text-white">Terms & Condition</Link>
                <Link className="py-2 mb-1 text-white">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="mb-4">Accounts</h4>
              <div className="footer-links d-flex flex-column justify-center">
                <Link className="py-2 mb-1 text-white">About</Link>
                <Link className="py-2 mb-1 text-white">FAQ</Link>
                <Link className="py-2 mb-1 text-white">Contacts</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="mb-4">Quick Links </h4>
              <div className="footer-links d-flex flex-column justify-center">
                <Link className="py-2 mb-1 text-white">Laptops</Link>
                <Link className="py-2 mb-1 text-white">Headphone</Link>
                <Link className="py-2 mb-1 text-white">Tablets</Link>
                <Link className="py-2 mb-1 text-white">Watches</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy;{new Date().getFullYear()} Powered by Buy Corner{" "}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
