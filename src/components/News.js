import React, { Component } from "react";
import Spinner from "../Spinner";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      laoding: false,
      page: 1,
    };
    console.info("this is constructor");
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58991216dc2a4358817b03cec424ba55&page=${this.state.page} &pageSize=${this.props.pageSize}`;
    this.setState({ laoding: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.info(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      laoding: false,
    });
  }
  async componentDidMount() {
    // console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58991216dc2a4358817b03cec424ba55&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ laoding: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.info(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   laoding: false,
    // });
    this.updateNews();
  }

  handlePrev = async () => {
    // console.info("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=58991216dc2a4358817b03cec424ba55&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ laoding: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.info(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   laoding: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNext = async () => {
    // console.info("Next");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=58991216dc2a4358817b03cec424ba55&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ laoding: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.info(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     page: this.state.page + 1,
    //     laoding: false,
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Apna News - Top Headlines</h2>
        <hr />
        {this.state.laoding && <Spinner />}
        <div className="row my-3">
          {!this.state.laoding &&
            this.state.articles.map((element) => {
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
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
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
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
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
