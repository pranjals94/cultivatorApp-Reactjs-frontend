import React, { useEffect, useState } from "react";
import HttpService from "../../Services/HttpService";
const ListPersons = (props) => {

  const [modalData, setModalData] = useState({});
  const [modalFormData, setModalFormData] = useState({
    person_id: "",
    username: "",
    password: "",
    role_id: "",
  });

  const onchangeHandler = (e) => {
    let temp = modalFormData;
    temp[e.target.name] = e.target.value;
    setModalFormData(temp);
  };

  const onModelShow = (item) => {
    console.log("item", item);
    let temp = modalFormData;
    if (item.role != null) {
      setModalData(item);
      return;
    }
    temp["person_id"] = item.id;
    setModalFormData(temp);
    setModalData(item);
  };
  
  const createUserClicked = () => {
    console.log("modalFormData", modalFormData);
    HttpService.post("/admin/createuser", modalFormData).then(
      (response) => {
        alert(response.data.msg);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  };

  return (
    <>
      {props.name}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sl No.</th>
              <th scope="col">Name</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Gender</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {props.persons.map((item, indx) => (
              <tr
              key={indx}
                onClick={() => onModelShow(item)}
                data-toggle="modal"
                data-target="#exampleModal">
                <th scope="row">{indx + 1}</th>
                <td>{item.name}</td>
                <td>{item.phone_no}</td>
                <td>{item.gender}</td>
                <td>
                  <span className={item.role ? "userHighliter px-2" : null}>
                    {item.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* //------------------------Modal starts------------------------------------ */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="exampleModalLabel">
                [{modalData.id}] {modalData.name}
              </h6>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {modalData.role ? (
              <div className="modal-body">
                This Person is Already Registered
              </div>
            ) : (
              <div className="modal-body">
                <div className="form-group ">
                  <label htmlFor="username"> Create Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter a username"
                    name="username"
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="password"> Create Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    placeholder="Enter a Password"
                    name="password"
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
                {/* //-------------input role--------------------------*/}
                <div className="form-group ">
                  <label htmlFor="role">Select a Role</label>
                  <select
                    id="role"
                    className="form-control"
                    name="role_id"
                    onChange={(e) => onchangeHandler(e)}>
                    {props.roles.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                {/* //--------------input role end------------------ */}
              </div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal">
                Close
              </button>
              {modalData.role ? null : (
                <button
                  onClick={createUserClicked}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal">
                  Create User
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* //------------------------Modal ends------------------------------------ */}
    </>
  );
};

export default ListPersons;
