import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      laoding: false,
      page: 1,
    };
    console.info("this is constructor");
  }
  async componentDidMount() {
    console.log("cdm");
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=58991216dc2a4358817b03cec424ba55&pageSize=12";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.info(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  handlePrev = async () => {
    console.info("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=58991216dc2a4358817b03cec424ba55&page=${
      this.state.page - 1
    }&pageSize=12`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.info(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
    });
  };
  handleNext = async () => {
    console.info("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 12)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=58991216dc2a4358817b03cec424ba55&page=${
        this.state.page + 1
      }&pageSize=12`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.info(parsedData);
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
      });
    }
  };
  render() {
    return (
      <div className="container my-3">
        <h2>Apna News - Top Headlines</h2>
        <hr />
        <div className="row my-3">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 88) : ""}
                  description={element.description}
                  imgUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"
                  }
                  newUrl={element.url}
                ></NewsItem>
              </div>
            );
          })}
        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handlePrev}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            onClick={this.handleNext}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
