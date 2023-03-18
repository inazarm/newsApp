import React, { Component } from "react";
import Spinner from "../Spinner";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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

  capitalizedFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      laoding: true,
      page: 1,
      totalResults:0
    };
    document.title = `Apna News - ${this.capitalizedFirstLetter(
      this.props.category
    )}`;
    //console.info("this is constructor");
  }

  async updateNews() {
    this.props.setProgress(5);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58991216dc2a4358817b03cec424ba55&page=${this.state.page} &pageSize=${this.props.pageSize}`;
    this.setState({ laoding: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(80);
    console.info(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      laoding: false,
      
    });
    this.props.setProgress(100);
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
  fetchMoreData = async () => {
    this.setState({page:this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=58991216dc2a4358817b03cec424ba55&page=${this.state.page} &pageSize=${this.props.pageSize}`;
    // this.setState({ laoding: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.info(parsedData);
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // laoding: false,
      
    });
  };
  render() {
    return (
      <>
        <h2 className="text-center my-3">
          Apna News - Top {this.capitalizedFirstLetter(this.props.category)}{" "}
          Headlines
        </h2>
        
        <hr />
        {this.state.laoding && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          // loader={<h4>Loading...</h4>} // to show loadeer text original
          loader={<Spinner/>} // to show loadeer gif
        >
       
        <div className="container my-3">
        <div className="row my-3">
          {/* {!this.state.laoding &&   --used for loading...*/}
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
                  author={element.author ? element.author : "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                ></NewsItem>
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
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
      </>
    );
  }
}
