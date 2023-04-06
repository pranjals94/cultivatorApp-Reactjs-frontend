import React, { useState, useContext } from "react";
import Modaltabs from "../Cultivator/ModalTabs";
import { CultivatorAppContext } from "../../context/CultivatorAppContext";
import Pagination from "./pagination";
import HttpService from "../../Services/HttpService";
import axios from "axios";

const ListAssignedPersons = (props) => {
  const a = useContext(CultivatorAppContext);
  const [collapseExpanded, setCollapseExpanded] = useState(true);

  const onModelShow = (item) => {
    a.setTemp(item);
  };
  const [searchResult, setSearchResult] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [guests, setGuests] = useState([]);
  const refreshList = (currentPage) => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/reception/getguests?currentPage=" +
          currentPage.toString() +
          "&pageSize=" +
          pageSize.toString()
      )
      .then((response) => {
        let { totalGuests, guests } = response.data;
        setTotalCount(totalGuests);
        setGuests(guests);
        setCurrentPage(currentPage);
      });
  };
  const paginationClicked = (currentPageTemp) => {
    if (
      !(
        (currentPage === Math.ceil(totalCount / pageSize) &&
          currentPage === currentPageTemp) ||
        (currentPage === 1 && currentPage === currentPageTemp)
      )
    ) {
      if (searchResult) {
        // notify("search result is true");
        HttpService.get(
          process.env.REACT_APP_API_URL +
            "/reception/search?currentPage=" +
            currentPageTemp.toString() +
            "&pageSize=" +
            pageSize.toString() +
            "&search_input=" +
            searchInput.toString()
        ).then((response) => {
          setGuests(response.data.persons);
          setTotalCount(response.data.totalGuests);
          setCurrentPage(currentPageTemp);
        });
      } else {
        refreshList(currentPageTemp);
      }
    }
  };

  function handleModalClose() {
    setCollapseExpanded(true);
    const collapseElement = document.getElementById("collapseExample");
    collapseElement?.classList.remove("show"); //collapse the tab in modalTabs component use react-bootstrap to avoid coads like this
  }

  return (
    <>
      <div className="table-responsive mt-2">
        <Pagination
          totalRecords={totalCount}
          paginateClicked={paginationClicked}
          currentPage={currentPage}
          pageSize={pageSize}
        />
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sl No.</th>
              <th scope="col">Name</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
            </tr>
          </thead>
          <tbody>
            {props.assignedPersons.map((item, indx) => (
              <tr
                key={indx}
                onClick={() => onModelShow(item)}
                data-toggle="modal"
                data-target="#exampleModal">
                <th scope="row">
                  <div className="form-group">
                    <div className="form-check">{indx + 1}</div>
                  </div>
                </th>
                <td>
                  {/* [{item.id}] {item.name} */}
                  {item.name}
                </td>
                <td>{item.phone_no}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* //------------------------Modal starts------------------------------------ */}
      <div
        className="modal top fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content overflow-auto">
            <div className="modal-header">
              <h6 className="modal-title" id="exampleModalLabel">
                {a.temp?.name}
              </h6>
              <button
                onClick={handleModalClose}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Modaltabs
              collapseExpanded={collapseExpanded}
              setCollapseExpanded={setCollapseExpanded}
            />
          </div>
        </div>
      </div>
      {/* //------------------------Modal ends------------------------------------ */}
    </>
  );
};

export default ListAssignedPersons;
