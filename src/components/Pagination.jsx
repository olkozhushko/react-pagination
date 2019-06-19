import React from "react";
import PropTypes from "prop-types";

import getPageLayout from "../utils/getPagesLayout";

const Pagination = props => {
  console.log(props);
  const pages = getPageLayout(props);

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul
          className="pagination"
          onClick={props.onClick}
        >
          {pages.map((page, i) => {
            if (page === "Left") {
              return (
                <li className="page-item" key={i} data-id="Left">
                  <button className="page-link"  aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
              );
            }
            if (page === "Right") {
              return (
                <li className="page-item" key={i} data-id="Right">
                  <button className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              );
            }

            const btnActive = props.currentPage === +page ? "page-link btn-active" : "page-link";

            return (
              <li className="page-item" key={i} data-id={+page}>
                <button className={btnActive}>
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
