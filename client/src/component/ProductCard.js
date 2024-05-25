import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function ProductCard() {
  return (
    <div className="col-3">
      <div className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <Link>
            <img src="images/wish.svg" alt="" />
          </Link>
        </div>
        <div className="product-image">
          <img
            src="images/watch.jpg"
            className="img-fluid"
            alt="product images"
          />
          <img
            src="images/watch-1.webp"
            className="img-fluid"
            alt="product images"
          />
        </div>
        <div className="product-details">
          <h6 className="brand"> Havels</h6>
          <h5 className="brand">
            {" "}
            Smart Watch bulk 10 multi color for students
          </h5>
          <ReactStars
            count={5}
            // onChange={ratingChanged}
            value={3}
            edit={false}
            size={15}
            activeColor="#ffd700"
          />
          <p className="price">$100.00</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <Link>
              <img src="images/prodcompare.svg" alt="compare" />
            </Link>
            <Link>
              <img src="images/view.svg" alt="view" />
            </Link>
            <Link>
              <img src="images/add-cart.svg" alt="cart" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
