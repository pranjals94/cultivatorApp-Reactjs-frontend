import React, { useState, useEffect, useContext } from "react";
import Modaltabs from "../Cultivator/ModalTabs";
import { CultivatorAppContext } from "../../context/CultivatorAppContext";
import Pagination from "../Common/Pagination";
import HttpService from "../../Services/HttpService";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import {
  faSearch,
  faFilter,
  faFilterCircleDollar,
  faFilterCircleXmark,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
const ListAssignedPersons = (props) => {
  const a = useContext(CultivatorAppContext);
  const [reload, setReload] = useState(false); 
  const [collapseExpanded, setCollapseExpanded] = useState(true);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const onModelShow = (item) => {     a.setTemp(item);   };
  const [searchResult, setSearchResult] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [guests, setGuests] = useState([]);

  const refreshList = (currentPage) => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/cultivator/getguests?cultivator_id=" + a.user.person_id.toString() +"&currentPage=" +
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
 
  const onchangeInputHandler = (e) => {
    console.log(e.target.value);
    let temp = searchInput;
    temp = e.target.value;
    setSearchInput(temp);
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
            "/cultivator/search?cultivator_id=" + a.user.person_id.toString()  + "&currentPage=" +
            currentPageTemp.toString() +
            "&pageSize=" +
            pageSize.toString() +
            "&search_input=" +
            searchInput.toString()
        ).then((response) => {
          setGuests(response.data.guests);
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
// function selectHandle(e) {
//     const { value, name, checked } = e.target;
//     let temp;
//     if (name === "isAllSelected") {
//       temp = guests.map((item) => {
//         return { ...item, isChecked: checked };
//       });
//     } else {
//       temp = guests.map((item) =>
//         item.id == value ? { ...item, isChecked: checked } : item
//       );
//     }
//     console.log("temp", temp);
//     let temp1 = [];
//     temp.map((item) => {
//       if (item?.isChecked) {
//         temp1.push(item.id);
//       }
//     });
   
//     setGuests(temp);
//   }
 
  const notify = (e) => {
    // toast.clearWaitingQueue();
    // toast.dismiss();
    // toast.info(e, {
    //   position: "top-center",
    //   autoClose: 3000,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    // });
  };

  function handleSearch() {
    if (!searchInput) {
      notify("empty Search");
      
      return;
    }
    setSearchResult(true);
    HttpService.get(
      process.env.REACT_APP_API_URL +
      "/cultivator/search?cultivator_id=" + a.user.person_id.toString()  + "&currentPage=1&pageSize=" +
        pageSize.toString() +
        "&search_input=" +
        searchInput.toString()
    ).then((response) => {
      console.log(response.data.guests);
      setGuests(response.data.guests);
      setTotalCount(response.data.totalGuests);
      setCurrentPage(1);
    });
  }
  const clearSearch = () => {
    setSearchResult(false);
    setSearchInput("");
    refreshList(1);
  };
  
  useEffect(() => {

    console.log("Assigned all persoons",guests)
    // setGuests(guests)
    
    if (searchResult) 
      {
        
        HttpService.get(
          process.env.REACT_APP_API_URL +
          "/cultivator/search?cultivator_id=" + a.user.person_id.toString()  + "&currentPage=1&pageSize=" +
            pageSize.toString() +
            "&search_input=" +
            searchInput.toString()
        ).then((response) => {
          console.log("if",response.data)
          setGuests(response.data.guests);
          setTotalCount(response.data.totalGuests);
        });
      } 
    else 
      {
        HttpService.get(
          process.env.REACT_APP_API_URL +  "/cultivator/getguests?cultivator_id=" + a.user.person_id.toString() +"&currentPage=" +
          currentPage.toString() +
          "&pageSize=" +
          pageSize.toString()
        ).then(
          (response) => {
            setGuests(response.data.guests);
            console.log("else",response.data)
            setTotalCount(response.data.totalGuests);
          },
          (error) => {
            // notify("OOps!.. Somwthing went wrong");
          }
        );

        
      }
  }, [reload]);

  return (
    <>
      <div className="table-responsive mt-2">
        {/* <Pagination
          totalRecords={totalCount}
          paginateClicked={paginationClicked}
          currentPage={currentPage}
          pageSize={pageSize}
        /> */}
        <div
            className="btn-toolbar justify-content-between"
            role="toolbar"
            aria-label="Toolbar with button groups">
            <div className="input-group">
                  {/* <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon1">
                    <FontAwesomeIcon className="fa-1x" icon={faFilter} />
                  </button> */}
                  <input
                    type="text"
                    className="form-control border"
                    placeholder="Name or Phone No."
                    value={searchInput}
                    onChange={onchangeInputHandler}
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <button
                    onClick={handleSearch}
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon1">
                    <FontAwesomeIcon
                      // onClick={showSidebar}
                      className="fa-1x"
                      icon={faSearch}
                    />
                  </button>
            </div>
            
        </div>
      </div>
      <div className="col-md-7">
                {searchResult ? (
                  <div>
                    search results{" "}
                    <FontAwesomeIcon
                      style={{ cursor: "pointer" }}
                      onClick={clearSearch}
                      className="fa-2x"
                      icon={faCircleXmark}
                    />
                  </div>
                ) : null}
                { guests.length ? (
                  <div className="container border rounded">
                    <div className="table-responsive">
                      <Pagination
                        totalRecords={totalCount}
                        paginateClicked={paginationClicked}
                        currentPage={currentPage}
                        pageSize={pageSize}
                      />
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col"> Sl No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone No.</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                          </tr>
                        </thead>
                        <tbody>
                          { guests.map((item, indx) => (
                            <tr key={indx}>
                              <th scope="row">
                                <div className="form-group">
                                  <div className="form-check">                                   
                                     {indx + 1 + (currentPage - 1) * pageSize} 
                                  </div>
                                </div>
                              </th>
                              <td>
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
                    
                    
                    
                  </div>
                ) : (
                  <b>No person(s) found</b>
                )}
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
