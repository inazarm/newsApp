import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newUrl, author, date, source } =
      this.props;
    return (
      <div>
        {/* <div className="card" style={{ width: "18rem" }}> */}
        <div className="card">
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
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
