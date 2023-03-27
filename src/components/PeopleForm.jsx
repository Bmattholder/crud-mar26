import React, { useState } from "react";
import axios from "axios";
import PeopleList from "./PeopleList";

import "./PeopleForm.css";

function PeopleForm(props) {
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    praenomens: [""],
    cognomen: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const { praenomens, cognomen, number, street, city, state, zip } = formData;

  const formChangeHandler = (e) => {
    if (e.target.name === "praenomens") {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  let url = `http://localhost:8080/api/v1/people`;

  const resetStateHelper = () => {
    setFormData({
      praenomens: [""],
      cognomen: "",
      number: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  const setToggleHelper = () => {
    setToggle(!toggle);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.post(url, formData);
    resetStateHelper();
    setToggle(!toggle);
  };

  return (
    <>
      <form className="people-form" onSubmit={formSubmitHandler}>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            name="praenomens"
            id="praenomens"
            value={praenomens}
            onChange={formChangeHandler}
            placeholder="Praenomens"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            onChange={formChangeHandler}
            placeholder="Cognomen"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            name="number"
            id="number"
            value={number}
            onChange={formChangeHandler}
            placeholder="Number"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            name="street"
            id="street"
            value={street}
            onChange={formChangeHandler}
            placeholder="Street"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            name="city"
            id="city"
            value={city}
            onChange={formChangeHandler}
            placeholder="City"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            name="state"
            id="state"
            value={state}
            onChange={formChangeHandler}
            placeholder="State"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            className="form-input"
            name="zip"
            id="zip"
            value={zip}
            onChange={formChangeHandler}
            placeholder="Zip"
            required
          />
        </div>
        <button className="btn">Submit</button>
      </form>
      <PeopleList toggle={toggle} setToggleHelper={setToggleHelper} />
    </>
  );
}

export default PeopleForm;
