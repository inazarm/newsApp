import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newUrl, author, date, source } =
      this.props;
    return (
      <div>
        {/* <div className="card" style={{ width: "18rem" }}> */}
        <div className="card">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: "1" }}
          >
            {source}
          </span>
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="text-muted">
              By {author} on {new Date(date).toGMTString()}
            </p>
          </div>
          <div className="card-footer">
            <a
              rel="noreferrer"
              href={newUrl}
              target="_blank"
              className="btn btn-dark btn-sm"
            >
              Read more...
            </a>
          </div>
        </div>
      </div>
    );
  }
}
