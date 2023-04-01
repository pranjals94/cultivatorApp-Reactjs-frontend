import React, { Component, useState } from "react";
import HttpService from "../../Services/HttpService";

const UploadExcelFile = (props) => {
  const [file, setFile] = useState(null);

  function handleUpload(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  function onSaveClicked() {
    const formData = new FormData();
    formData.append("file", file);
    HttpService.post(
      process.env.REACT_APP_API_URL + "/reception/savefromexcel",
      formData
    ).then(
      (response) => {
        props.notify(response.data.msg);
        props.refresh();
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
      <h5>
        Name: Cannot be Emty. <br />
        Phone No: Cant' be Emty and Non Numeric. <br />
        To download sample file Click{" "}
        <a
          href={process.env.REACT_APP_API_URL + "/SampleFormat.xlsx"}
          className="link-info">
          Here.{" "}
        </a>{" "}
      </h5>
      <div className="input-group mt-4">
        <input
          onChange={handleUpload}
          type="file"
          accept=".xlsx"
          className="form-control"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
        />
        <button
          onClick={onSaveClicked}
          className="btn btn-outline-secondary"
          type="button"
          id="inputGroupFileAddon04">
          Save
        </button>
      </div>
    </>
  );
};

export default UploadExcelFile;
