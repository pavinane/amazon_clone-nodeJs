import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../component/BlogCard";
import ProductCard from "../component/ProductCard";
import SpecialProduct from "../component/SpecialProduct";

function Home() {
  return (
    <div>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
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
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center ">
                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-01.jpg"
                    alt="small-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SALE</h4>
                    <h5>IPad S13+ Pro.</h5>
                    <p>
                      From $999 <br /> 0r $41.62/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-02.jpg"
                    alt="small-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRAVIAL</h4>
                    <h5>IPad Air</h5>
                    <p>
                      From $999 <br />
                      0r $41.62/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-04.jpg"
                    alt="small-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>IPad S13+ Pro.</h5>
                    <p>
                      From $999 <br /> 0r $41.62/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-03.jpg"
                    alt="small-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>IPad S13+ Pro.</h5>
                    <p>
                      From $999 <br /> 0r $41.62/mo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10 ">
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Free shipping</h6>
                    <p>From all orders over $100</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10 ">
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Daily Suprise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10 ">
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10 ">
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Afforable Price</h6>
                    <p className="mb-0">Get Factory direct Price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10 ">
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className="mb-0">100% Protection Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Music & games</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/speaker.jpg" alt="camera" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Smart Watch</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Smart tv</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Music & games</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Smart Watch</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
                <div className="d-flex  align-items-center">
                  <div>
                    <h6>Samrt tv</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper  card-wrapper">
                <Marquee className="d-flex ">
                  <div className="w-25 mx-4">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="w-25 mx-4">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="w-25 mx-4">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="w-25 mx-4">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="w-25 mx-4">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="w-25 mx-4">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="w-25 mx-4">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="w-25 mx-4">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Feature Collection</h3>
            </div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>
      <section className="famous-wrapper py-2 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="famous-card  p-2 position-relative">
                <img src="images/famous-1.webp" alt="watch" />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch series 7</h6>
                  <p>From $399 0r $16.2/mo. For 25 mo.</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card  p-2 position-relative ">
                <img src="images/famous-2.webp" alt="watch" />
                <div className="famous-content position-absolute text-secondary">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch series 7</h6>
                  <p>From $399 0r $16.2/mo. For 25 mo.</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card  p-2 position-relative">
                <img
                  src="https://pyxis.nymag.com/v1/imgs/b5b/619/500208ec042839981432cc44057d20d11d-2023-03-01-bluetooth-speaker7805-final.1x.rsquare.w200.jpg"
                  alt="watch"
                />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch series 7</h6>
                  <p>From $399 0r $16.2/mo. For 25 mo.</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card  p-2  position-relative">
                <img
                  src="https://imageio.forbes.com/specials-images/imageserve/63fa2c2ad4092acbb40f01ad/Apple--iPhone-15--iPhone-15-Pro-Max--iPhone-15-Pro--iPhone-15-Pro-design--iPhone-15/0x0.jpg?crop=4855,3644,x567,y0,safe&height=533&width=711&fit=bounds"
                  alt="watch"
                />
                <div className="famous-content position-absolute ">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch series 7</h6>
                  <p>From $399 0r $16.2/mo. For 25 mo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row ">
            <div className="col-12">
              <h3 className="section-heading">Special Product</h3>
            </div>
            <div className="row ">
              <SpecialProduct />
              <SpecialProduct />
              <SpecialProduct />
            </div>
          </div>
        </div>
      </section>

      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
            <div className="col-2"></div>
            <div className="col-2"></div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Latest Blog</h3>
            </div>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
