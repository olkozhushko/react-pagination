import React, { Component } from "react";
import Countries from "countries-api";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import goToPage from "./utils/goToPage";

import Pagination from "./components/Pagination";
import CountryCard from "./components/CountryCard";

class App extends Component {
  constructor() {
    super();
    this.pageLimit = 18;
    this.pageNeighbours = 1;
    this.state = {
      allCountries: [],
      currentCountries: [],
      currentPage: 1,
      totalPages: null
    };
  }

  componentDidMount() {
    const { data: allCountries = [] } = Countries.findAll();
    this.setState({
      allCountries,
      currentCountries: allCountries.slice(0, this.pageLimit),
      totalPages: Math.ceil(allCountries.length / this.pageLimit)
    });
  }

  handleNavClick(e) {
    e.preventDefault();

    const target = e.target.closest("li");

    if (!target) return;

    if (target.dataset.id === "Left") {
      let result = goToPage(
        this.state.currentPage - this.pageNeighbours * 2 - 1,
        this.state,
        this.pageLimit
      );

      this.setState({
        ...result
      });
      return;
    }

    if (target.dataset.id === "Right") {
      let result = goToPage(
        this.state.currentPage + this.pageNeighbours * 2 + 1,
        this.state,
        this.pageLimit
      );

      this.setState({
        ...result
      });
      return;
    }

    if (typeof +target.dataset.id === "number") {
      const page = target.dataset.id;

      const result = goToPage(page, this.state, this.pageLimit);

      this.setState({
        ...result
      });
      return;
    }
  }

  render() {
    const {
      allCountries,
      currentCountries,
      currentPage,
      totalPages
    } = this.state;

    const totalCountries = allCountries.length;

    console.log(this.state);

    if (totalCountries === 0) return null;

    return (
      <div className="container-fluid px-5 py-3 text-center">
        <header className="container">
          <h1 className="text-primary">React Pagination App</h1>
        </header>
        <div className="app__content row d-flex flex-column px-2 py-2 justify-content-around">
          <div className="d-flex justify-content-between">
            <div className="app__inform-block d-flex flex-row">
              <h3 className="d-flex align-items-center pr-2 text-secondary border-right border-gray ">
                <span className="font-weight-bold d-inline-block pr-2">{totalCountries + " "}</span>
                Coutries
              </h3>
              <h3 className="d-flex align-items-center pl-2">
                Page <span className="d-inline-block pl-2">{currentPage}</span> / <span>{totalPages}</span>
              </h3>
            </div>
            <Pagination
              currentPage={currentPage}
              pageLimit={this.pageLimit}
              pageNeighbours={this.pageNeighbours}
              totalRecord={+totalCountries}
              onClick={e => this.handleNavClick(e)}
            />
          </div>
          <div className="row">
            {currentCountries.map(country => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
