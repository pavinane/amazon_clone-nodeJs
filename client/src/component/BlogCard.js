import React from "react";
import { Link } from "react-router-dom";

function BlogCard() {
  return (
    <div className="col-3">
      <div className="blog-card">
        <div className="card-image">
          <img src="images/blog-1.jpg" className="img-fluid" alt="blog" />
        </div>
        <div className="blog-content">
          <p className="date">24 May, 2024</p>
          <h5 className="title">A beautiful website create with tough Code </h5>
          <p className="dec">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled
          </p>
          <Link to="/" className="button cursor-pointer">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
