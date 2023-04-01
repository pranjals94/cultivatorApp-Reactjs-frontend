import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import UploadExcelFile from "./UploadExcelFile";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import pic from "./user.jpg";
import axios from "axios";
import { CultivatorAppContext } from "../../context/CultivatorAppContext";
import Modal from "react-bootstrap/Modal";
import Paginate from "../Common/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateOrientation from "./CreateOrientation";
import UploadVisitExcelFile from "./UploadVisitExcelFile";

import {
  faSearch,
  faFilter,
  faFilterCircleDollar,
  faFilterCircleXmark,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reception = () => {
  const [showCreateOrientationModal, setShowCreateOrientationModal] =
    useState(false);
  const [showViewParticipants, setShowViewParticipants] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [searchResult, setSearchResult] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [reload, setReload] = useState(false); //use effect dependency on state change
  const [activeCultivatorINDX, setActiveCultivatorINDX] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [VisitsCheckedItems, setVisitsCheckedItems] = useState([]);
  const [visits, setVisits] = useState([]);
  const a = useContext(CultivatorAppContext);
  const [activeCultivator, setActiveCultivator] = useState({
    id: null,
    name: "",
  });

  const [activeOrientation, setActiveOrientation] = useState();

  const [pageSize, setPageSize] = useState(15);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [guests, setGuests] = useState([]);
  const [cultivators, setCultivators] = useState([]);
  const [orientations, setOrientations] = useState([]);

  // const fullscreen_values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);

  function refresh() {
    setReload(!reload);
  }

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

  function handleModalShow() {
    setFullscreen("sm-down");
    setShow(true);
  }

  const navigate = useNavigate();

  useEffect(() => {
    HttpService.get(
      process.env.REACT_APP_API_URL + "/reception/getvisits"
    ).then(
      (response) => setVisits(response.data.visits),
      (error) => {}
    );

    HttpService.get(
      process.env.REACT_APP_API_URL + "/reception/getorientations"
    ).then(
      (response) => setOrientations(response.data.orientations),
      (error) => {}
    );

    setShow(false); // hide excel upload modal
    if (searchResult) {
      // notify("search result is true");
      HttpService.get(
        process.env.REACT_APP_API_URL +
          "/reception/search?currentPage=1&pageSize=" +
          pageSize.toString() +
          "&search_input=" +
          searchInput.toString()
      ).then((response) => {
        setGuests(response.data.persons);
        setTotalCount(response.data.totalGuests);
      });
    } else {
      HttpService.get(
        process.env.REACT_APP_API_URL + "/reception/getcultivators"
      ).then(
        (response) => {
          setCultivators(response.data.cultivators);
          console.log(response);
        },
        (error) => {
          // notify("OOps!.. Somwthing went wrong");
        }
      );

      HttpService.get(
        process.env.REACT_APP_API_URL +
          "/reception/getguests?currentPage=1&pageSize=" +
          pageSize.toString()
      ).then(
        (response) => {
          setGuests(response.data.guests);
          setTotalCount(response.data.totalGuests);
        },
        (error) => {
          // notify("OOps!.. Somwthing went wrong");
        }
      );
    }
  }, [reload]);

  function selectHandle(e) {
    const { value, name, checked } = e.target;
    let temp;
    if (name === "isAllSelected") {
      temp = guests.map((item) => {
        return { ...item, isChecked: checked };
      });
    } else {
      temp = guests.map((item) =>
        item.id == value ? { ...item, isChecked: checked } : item
      );
    }
    console.log("temp", temp);
    let temp1 = [];
    temp.map((item) => {
      if (item?.isChecked) {
        temp1.push(item.id);
      }
    });
    setCheckedItems(temp1);
    setGuests(temp);
  }

  function visitCheckboxHandle(e) {
    const { value, name, checked } = e.target;
    let temp;
    if (name === "isAllSelected") {
      temp = visits.map((item) => {
        return { ...item, isChecked: checked };
      });
    } else {
      temp = visits.map((item) =>
        item.id == value ? { ...item, isChecked: checked } : item
      );
    }
    console.log("temp", temp);
    let temp1 = [];
    temp.map((item) => {
      if (item?.isChecked) {
        temp1.push({ visit_id: item.id, visitor_name: item.visitor_name });
      }
    });
    setVisitsCheckedItems(temp1);
    setVisits(temp);
  }

  function onAssignVisitorsButtonClicked() {
    if (!activeOrientation) {
      notify("No Orientation Selected");
      // notify("No Cultivator Selected");
      return;
    }
    if (!VisitsCheckedItems.length) {
      notify("please select Visitor(s)");
      // notify("please select person(s)");
      return;
    }

    HttpService.post(
      process.env.REACT_APP_API_URL + "/reception/addparticipants",
      {
        orientation: activeOrientation,
        visitors: VisitsCheckedItems,
      }
    ).then(
      (response) => {
        setReload(!reload); //just change state to trigger useEffect
        notify(response.data.msg);
        // console.log("assign cultivator to person response", response.data);
      },
      (error) => {
        // notify("OOps!.. Somwthing went wrong");
      }
    );
  }
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------
  function orientationRadioHandle(e) {
    setActiveOrientation(e.target.value);
  }

  function logout() {
    HttpService.get(process.env.REACT_APP_API_URL + "/auth/logout").then(
      (response) => {
        navigate("/");
        console.log("log out = ", response);
      },
      (error) => {
        console.log(error);
        notify("something Went Wrong");
      }
    );
  }

  const onAssignButtonClicked = () => {
    if (!activeCultivator.id) {
      notify("No Cultivator Selected");
      // notify("No Cultivator Selected");
      return;
    }
    if (!checkedItems.length) {
      notify("please select person(s)");
      // notify("please select person(s)");
      return;
    }
    // console.log("Assign Button clicked");

    HttpService.post(
      process.env.REACT_APP_API_URL + "/reception/assign-persons-to-cultivator",
      {
        cultivator: activeCultivator,
        persons: checkedItems,
      }
    ).then(
      (response) => {
        setReload(!reload); //just change state to trigger useEffect
        notify("Cultivator Assigned to Persons.");
        // console.log("assign cultivator to person response", response.data);
      },
      (error) => {
        // notify("OOps!.. Somwthing went wrong");
      }
    );
  };

  // console.log("active cultivator out", activeCultivator);
  // console.log("Checked ITEMS", checkedItems);

  const setCultivator = (e) => {
    var temp = activeCultivator;
    temp["id"] = e.target.value;
    // temp["name"] = e.target.name;
    setActiveCultivator(temp);
    // setActiveCultivatorINDX(indx);
  };

  function handleSearch() {
    if (!searchInput) {
      notify("emty Search");
      return;
    }
    setSearchResult(true);
    HttpService.get(
      process.env.REACT_APP_API_URL +
        "/reception/search?currentPage=1&pageSize=" +
        pageSize.toString() +
        "&search_input=" +
        searchInput.toString()
    ).then((response) => {
      console.log(response.data.persons);
      setGuests(response.data.persons);
      setTotalCount(response.data.totalGuests);
      setCurrentPage(1);
    });
  }

  const onchangeInputHandler = (e) => {
    console.log(e.target.value);
    let temp = searchInput;
    temp = e.target.value;
    setSearchInput(temp);
  };

  const clearSearch = () => {
    setSearchResult(false);
    setSearchInput("");
    refreshList(1);
  };

  const notify = (e) => {
    toast.clearWaitingQueue();
    toast.dismiss();
    toast.info(e, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  function handleOrientationParticipants(e) {
    HttpService.get(
      process.env.REACT_APP_API_URL +
        "/reception/getparticipants?orientation_id=" +
        e.toString()
    ).then(
      (response) => {
        setParticipants(response.data.participants);
      },
      (error) => {}
    );
    setShowViewParticipants(true);
  }

  return (
    <>
      <ToastContainer limit={1} />
      <Modal
        size="lg"
        animation={false}
        show={showCreateOrientationModal}
        onHide={() => setShowCreateOrientationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Orientation.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrientation showModal={setShowCreateOrientationModal} />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        animation={false}
        show={showFilterMenu}
        onHide={() => setShowFilterMenu(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply Search Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="inputEmail4" />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
              />
            </div>
            <div className="col-12">
              <label for="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="col-12">
              <label for="inputAddress2" className="form-label">
                Address 2
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label">
                City
              </label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="col-md-4">
              <label for="inputState" className="form-label">
                State
              </label>
              <select id="inputState" className="form-select">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="col-md-2">
              <label for="inputZip" className="form-label">
                Zip
              </label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
            <div className="col-12 d-flex">
              <div className="mx-auto">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                  className="btn btn-primary">
                  Go
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Excel File. (.xlsx)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadExcelFile notify={notify} refresh={refresh} />
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        animation={false}
        onHide={() => setShowViewParticipants(false)}
        show={showViewParticipants}>
        <Modal.Header closeButton>
          <Modal.Title>Participants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="table-responsive mt-2">
            <h6>participants</h6>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Sl No.</th>
                  <th scope="col">visitor Name</th>
                  <th scope="col">check In Time</th>
                  <th scope="col">Attended</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((item, indx) => (
                  <tr key={indx}>
                    <th scope="row">{indx + 1}</th>
                    <td>{item.visitor_name}</td>
                    <td>{item.check_in_time}</td>
                    <td>{item.attended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

      {/* //--------------------------------------------- */}
      <Modal show={showVisitModal} onHide={() => setShowVisitModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Visit Excel File. (.xlsx)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadVisitExcelFile notify={notify} />
        </Modal.Body>
      </Modal>
      {/* //---------------------------------------------------------------- */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <b className="navbar-brand pl-3">Reception</b>
        <i className="navbar-brand d-lg-none"> {activeCultivator.name}</i>
        {/*hide on screens wider than lg*/}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <Link className="nav-link" to={"/app/userhomepage"}>
                Home{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={""}>
                About{" "}
              </Link>
            </li>
          </ul>
          <span className="navbar-text mr-3">
            Welcome {a.user.role}{" "}
            <i style={{ color: "red" }}>{a.user.nameOfUser}</i> !
          </span>
          <span className="navbar-text mr-3">
            <Button onClick={logout} variant="primary">
              Logout
            </Button>
          </span>
        </div>
      </nav>
      {/* //-------------------------------------------nav bar ends--------------------------------- */}

      <div className="container" style={{ marginTop: "90px" }}>
        {/* //-----------------search bar------------------------ */}
        <div
          className="row px-2 py-2 border rounded"
          style={{ backgroundColor: "lightgrey" }}>
          <div
            className="btn-toolbar justify-content-between"
            role="toolbar"
            aria-label="Toolbar with button groups">
            <div className="btn-group" role="group" aria-label="First group">
              <button
                onClick={handleModalShow}
                type="button"
                className="btn btn-outline-secondary">
                Import persons
              </button>
              <button
                onClick={() => setShowVisitModal(true)}
                type="button"
                className="btn btn-outline-secondary">
                Import Visits
              </button>

              <button
                onClick={() => setShowCreateOrientationModal(true)}
                type="button"
                className="btn btn-outline-secondary">
                Schedule Orientation
              </button>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Actions
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Dropdown link
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dropdown link
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="input-group">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon1">
                <FontAwesomeIcon className="fa-1x" icon={faFilter} />
              </button>
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
        {/* //------------------Tabs start ------------------------------------ */}
        <nav className="pt-3">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="na-visit-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-visit"
              type="button"
              role="tab"
              aria-controls="nav-visit"
              aria-selected="true">
              Visits
            </button>
            <button
              className="nav-link"
              id="nav-assignCultivator-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-assignCultivator"
              type="button"
              role="tab"
              aria-controls="nav-assignCultivator"
              aria-selected="false">
              Assign Cultivator
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-visit"
            role="tabpanel"
            aria-labelledby="nav-visit-tab"
            tabIndex="0">
            {/* //-----------------Visits tab  start --- */}
            {/* //----------------------orientation and visitor row----------------------------------------------------------------- */}
            <div className="row pt-3">
              <div className="col-md-6">
                <div className="container border rounded pb-3">
                  {/* //-------------Orientation table start------------------*/}
                  <div className="table-responsive mt-2">
                    <h6>Scheduled Orientations.</h6>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Sl No.</th>
                          <th scope="col">Orientation Name</th>
                          <th scope="col">Venue</th>
                          <th scope="col">Start date Time</th>
                          <th scope="col">End Date Time</th>
                          <th scope="col">Cultivator Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orientations.map((item, indx) => (
                          <tr key={indx}>
                            <th scope="row">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="radio_input"
                                value={item.id}
                                onChange={(e) => orientationRadioHandle(e)}
                              />
                              {indx + 1}
                            </th>
                            <td
                              onClick={() =>
                                handleOrientationParticipants(item.id)
                              }>
                              {item.orientation_name}
                            </td>
                            <td
                              onClick={() =>
                                handleOrientationParticipants(item.id)
                              }>
                              {item.venue}
                            </td>
                            <td
                              onClick={() =>
                                handleOrientationParticipants(item.id)
                              }>
                              {item.orientation_start_date_time}
                            </td>
                            <td
                              onClick={() =>
                                handleOrientationParticipants(item.id)
                              }>
                              {item.orientation_end_date_time}
                            </td>
                            <td
                              onClick={() =>
                                handleOrientationParticipants(item.id)
                              }>
                              {item.cultivator_name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/*//-------------Orientation list end------------------ */}
                </div>
              </div>
              <div className="col-md-6">
                {visits.length ? (
                  <div className="container border rounded">
                    <div className="table-responsive mt-2">
                      <h6>Visitors List.</h6>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="gridCheck"
                                name="isAllSelected"
                                checked={
                                  visits.filter(
                                    (item) => item?.isChecked !== true
                                  ).length < 1
                                }
                                onChange={(e) => visitCheckboxHandle(e)}
                              />
                              Sl No.
                            </th>
                            <th scope="col">Visitor name</th>
                            <th scope="col">Phone No.</th>
                            <th scope="col">Check in Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visits.map((item, indx) => (
                            <tr key={indx}>
                              <th scope="row">
                                <div className="form-group">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="gridCheck"
                                      checked={item?.isChecked || false}
                                      name={item.name}
                                      value={item.id}
                                      onChange={(e) => visitCheckboxHandle(e)}
                                    />
                                    {indx + 1}
                                  </div>
                                </div>
                              </th>
                              <td>
                                [{item.id}] {item.visitor_name}
                              </td>
                              <td>{item.phone_no}</td>
                              <td>{item.check_in_date_time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <input
                      type="checkbox"
                      id="gridCheck"
                      name="isAllSelected"
                      checked={
                        visits.filter((item) => item?.isChecked !== true)
                          .length < 1
                      }
                      onChange={(e) => visitCheckboxHandle(e)}
                    />
                    Select All.
                    <Button onClick={onAssignVisitorsButtonClicked}>
                      Add Participants
                    </Button>
                    <br />
                  </div>
                ) : (
                  <b>No Visitor(s) found</b>
                )}
              </div>
            </div>

            {/* //-----------visits end----- */}
          </div>
          <div
            className="tab-pane fade"
            id="nav-assignCultivator"
            role="tabpanel"
            aria-labelledby="nav-assignCultivator-tab"
            tabIndex="0">
            {/* //--------assign Cultivator tab starts----- */}
            {/* //----------------------cultivator and preson table row----------------------------------------------------------------- */}
            <div className="row pt-3">
              <div className="col-md-5">
                <div className="container border rounded pb-3">
                  <h5>Select a Cultivator.</h5>
                  <select
                    id="selectedCultivator"
                    className="form-select"
                    aria-label="Default select example"
                    // (indx, item.name, item.id)
                    onChange={(e) => setCultivator(e)}>
                    <option label={"Select One ..."}></option>
                    {cultivators.map((item, indx) => (
                      <option key={indx} label={item.name} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
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
                {guests.length ? (
                  <div className="container border rounded">
                    <div className="table-responsive">
                      <Paginate
                        totalRecords={totalCount}
                        paginateClicked={paginationClicked}
                        currentPage={currentPage}
                        pageSize={pageSize}
                      />
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="gridCheck"
                                name="isAllSelected"
                                checked={
                                  guests.filter(
                                    (item) => item?.isChecked !== true
                                  ).length < 1
                                }
                                onChange={(e) => selectHandle(e)}
                              />
                              Sl No.
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone No.</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guests.map((item, indx) => (
                            <tr key={indx}>
                              <th scope="row">
                                <div className="form-group">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="gridCheck"
                                      checked={item?.isChecked || false}
                                      name={item.name}
                                      value={item.id}
                                      onChange={(e) => selectHandle(e)}
                                    />
                                    {indx + 1 + (currentPage - 1) * pageSize}
                                  </div>
                                </div>
                              </th>
                              <td>
                                [{item.id}] {item.name}
                              </td>
                              <td>{item.phone_no}</td>
                              <td>{item.email}</td>
                              <td>{item.gender}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <input
                      type="checkbox"
                      id="gridCheck"
                      name="isAllSelected"
                      checked={
                        guests.filter((item) => item?.isChecked !== true)
                          .length < 1
                      }
                      onChange={(e) => selectHandle(e)}
                    />
                    Select All.
                    <Button onClick={onAssignButtonClicked}>Assign</Button>
                    <br />
                  </div>
                ) : (
                  <b>No person(s) found</b>
                )}
              </div>
            </div>

            {/* //-----------assign Cultivator end----- */}
          </div>
        </div>
        {/* //-------------------tabs End------------------------------- */}
      </div>
    </>
  );
};

export default Reception;
