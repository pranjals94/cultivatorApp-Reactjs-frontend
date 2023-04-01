import React, { Component, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import "./Pagination.css";
const Paginate = (props) => {
  const pagesArrey = [];

  if (props.totalRecords <= props.pageSize) {
    return;
  }

  const noOfPages = Math.ceil(props.totalRecords / props.pageSize);
  const offsetItems = 3; // offsetItems and pageSize of pagination are inter related test it b4 changing
  // const noOfItems = noOfPages % 2 === 0 ? offsetItems * 2 : offsetItems * 2 + 1; //check even or odd pages
  const noOfItems =
    noOfPages < offsetItems * 2 + 1 ? noOfPages : offsetItems * 2 + 1;
  for (
    let number =
      props.currentPage <= offsetItems
        ? 1
        : props.currentPage >= noOfPages - offsetItems
        ? noOfPages - (noOfItems - 1)
        : props.currentPage - offsetItems;
    number <=
    (props.currentPage >= noOfPages - offsetItems
      ? noOfPages
      : props.currentPage <= offsetItems
      ? noOfItems
      : props.currentPage + offsetItems);
    number++
  ) {
    pagesArrey.push(number);
  }
  function handleClick(currentPage) {
    props.paginateClicked(currentPage);
  }
  const renderPagination = () => {
    return (
      <nav aria-label="page navigation">
        <ul className="pagination justify-content-center">
          <li
            className={
              props.currentPage === 1 ? "page-item disabled" : "page-item"
            }
            onClick={() => handleClick(1)}>
            <b className="page-link">1</b>
          </li>
          <li
            className={
              props.currentPage === 1 ? "page-item disabled" : "page-item"
            }
            onClick={() =>
              handleClick(props.currentPage < 3 ? 1 : props.currentPage - 1)
            }>
            <b className="page-link">
              <FontAwesomeIcon icon={faAnglesLeft} />
            </b>
          </li>
          {pagesArrey.map((item, indx) => (
            <li
              key={indx}
              className={
                props.currentPage === item ? "page-item active" : "page-item"
              }
              onClick={() => handleClick(item)}>
              <b className="page-link">{item}</b>
            </li>
          ))}
          <li
            className={
              props.currentPage === noOfPages
                ? "page-item disabled"
                : "page-item"
            }
            onClick={() =>
              handleClick(
                props.currentPage >= noOfPages
                  ? noOfPages
                  : props.currentPage + 1
              )
            }>
            <b className="page-link">
              <FontAwesomeIcon icon={faAnglesRight} />
            </b>
          </li>
          <li
            className={
              props.currentPage === noOfPages
                ? "page-item disabled"
                : "page-item"
            }
            onClick={() => handleClick(noOfPages)}>
            <b className="page-link">{noOfPages}</b>
          </li>
        </ul>
      </nav>
    );
  };
  return <>{props.totalRecords === 0 ? "" : renderPagination()}</>;
};

export default Paginate;
