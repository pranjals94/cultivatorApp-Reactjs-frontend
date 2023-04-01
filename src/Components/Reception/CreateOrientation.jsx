import React, { Component, useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import HttpService from "../../Services/HttpService";
const CreateOrientation = (props) => {
  let date_Time_start = new Date();
  date_Time_start.setHours("15");
  date_Time_start.setMinutes("00");
  date_Time_start.setSeconds("00");

  let date_Time_end = new Date();
  date_Time_end.setHours("16");
  date_Time_end.setMinutes("00");
  date_Time_end.setSeconds("00");

  const [date_time_start, SetDate_Time_Start] = useState(date_Time_start);
  const [date_time_end, SetDate_time_End] = useState(date_Time_end);
  const [formData, setFormData] = useState({
    orientation_name: "",
    venue: "",
    orientation_start_date_time: date_Time_start,
    orientation_end_date_time: date_time_end,
  });
  const [cultivators, setCultivators] = useState([]);

  useEffect(() => {
    HttpService.get(
      process.env.REACT_APP_API_URL + "/reception/getcultivators"
    ).then(
      (response) => {
        setCultivators(response.data.cultivators);
      },
      (error) => {}
    );
  }, []);

  const handleDateTimePickerChangeStart = (value) => {
    SetDate_Time_Start(value);
  };

  const handleDateTimePickerChangeEnd = (value) => {
    SetDate_time_End(value);
  };

  const onchangeHandler = (e) => {
    let temp = { ...formData };
    temp[e.target.name] = e.target.value;
    setFormData(temp);
  };

  const handleCreate = () => {
    let temp = { ...formData };
    temp["orientation_start_date_time"] = date_time_start;
    temp["orientation_end_date_time"] = date_time_end;
    setFormData(temp);
    HttpService.post(
      process.env.REACT_APP_API_URL + "/reception/createorientation",
      formData
    ).then(
      (response) => {
        alert("Orientation Scheduled");
        props.showModal(false);
      },
      (error) => {
        alert("Something Went Worng !");
      }
    );
  };
  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="orientation_name" className="form-label">
            Orientation Name *
          </label>
          <input
            name="orientation_name"
            onChange={(e) => onchangeHandler(e)}
            type="text"
            className="form-control"
            id="orientation_name"
            value={formData.orientation_name}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="venue" className="form-label">
            Venue *
          </label>
          <input
            onChange={(e) => onchangeHandler(e)}
            type="text"
            className="form-control"
            id="venue"
            name="venue"
            value={formData.venue}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="orientation_start" className="form-label">
            Orientation start Date and Time *
          </label>
          <DateTimePicker
            name="startTime"
            id="orientation_start"
            clearIcon={null}
            value={date_time_start}
            // format={"y-MM-dd h:mm:ss a"}
            onChange={(value) => handleDateTimePickerChangeStart(value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="orientation_end" className="form-label">
            Orientation End Date and Time *
          </label>
          <DateTimePicker
            name="endTime"
            id="orientation_end"
            clearIcon={null}
            value={date_time_end}
            // format={"y-MM-dd h:mm:ss a"}
            onChange={(value) => handleDateTimePickerChangeEnd(value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="cultivator_id" className="form-label">
            cultivator
          </label>
          <select
            id="cultivator_id"
            name="cultivator_id"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => onchangeHandler(e)}
            // (indx, item.name, item.id)
            // onChange={(e) => setCultivator(e)}
          >
            <option label={"Select One ..."}></option>
            {cultivators.map((item, indx) => (
              <option key={indx} label={item.name} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="cultivator_assistant_id" className="form-label">
            cultivator Assistant
          </label>
          <select
            name="cultivator_assistant_id"
            id="cultivator_assistant_id"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => onchangeHandler(e)}
            // (indx, item.name, item.id)
            // onChange={(e) => setCultivator(e)}
          >
            <option label={"Select One ..."}></option>
            <option value={1} label={"Lucy"}></option>
            <option value={2} label={"Willium"}></option>
            {/* {cultivators.map((item, indx) => (
              <option key={indx} label={item.name} value={item.id}>
                {item.name}
              </option>
            ))} */}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="orienter" className="form-label">
            Orienter
          </label>
          <select
            id="orienter_id"
            name="orienter_id"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => onchangeHandler(e)}
            // (indx, item.name, item.id)
            // onChange={(e) => setCultivator(e)}
          >
            <option label={"Select One ..."}></option>
            <option value={1} label={"Lucy"}></option>
            <option value={2} label={"Willium"}></option>
            {/* {cultivators.map((item, indx) => (
              <option key={indx} label={item.name} value={item.id}>
                {item.name}
              </option>
            ))} */}
          </select>
        </div>
        <div className="col-12 d-flex">
          <div className="mx-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCreate();
              }}
              className="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateOrientation;
