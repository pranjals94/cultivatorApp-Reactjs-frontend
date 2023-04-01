import React, { Component, useState } from "react";
import HttpService from "../../Services/HttpService";
const UploadVisitExcelFile = (props) => {
  const [file, setFile] = useState(null);
  function handleUpload(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  function onSaveClicked() {
    const formData = new FormData();
    formData.append("file", file);
    HttpService.post(
      process.env.REACT_APP_API_URL + "/reception/createvisits",
      formData
    ).then(
      (response) => {
        props.notify(response.data.msg);
        // props.refresh();
        // window.location.reload();
      },
      (error) => {
        console.log(error.message);
        props.notify("OOps!.. Somwthing went wrong");
      }
    );
  }

  return (
    <>
      {" "}
      <label htmlFor="" className="form-label">
        Upload Excel file.{" "}
        <a
          href={process.env.REACT_APP_API_URL + "/SampleFormat1.xlsx"}
          className="link-info">
          Sample.{" "}
        </a>{" "}
      </label>
      <input
        onChange={handleUpload}
        type="file"
        accept=".xlsx"
        className="form-control"
        id="inputGroupFile04"
        aria-describedby="inputGroupFileAddon04"
        aria-label="Upload"
      />
      <div className="col-12 d-flex mt-5">
        <div className="mx-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              onSaveClicked();
            }}
            className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadVisitExcelFile;
