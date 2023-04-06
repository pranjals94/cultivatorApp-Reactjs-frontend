import React, { useEffect, useState, useContext } from "react";
import Modaltabs from "../Cultivator/ModalTabs";
import { CultivatorAppContext } from "../../context/CultivatorAppContext";
const ListAssignedPersons = (props) => {
  const a = useContext(CultivatorAppContext);
  const [collapseExpanded, setCollapseExpanded] = useState(true);

  const onModelShow = (item) => {
    a.setTemp(item);
  };

  function handleModalClose() {
    setCollapseExpanded(true);
    const collapseElement = document.getElementById("collapseExample");
    collapseElement?.classList.remove("show"); //collapse the tab in modalTabs component use react-bootstrap to avoid coads like this
  }

  return (
    <>
      <div className="table-responsive mt-2">
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
                [{a.temp?.id}] {a.temp?.name}
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
