import React, { Fragment, useState } from "react";

import "./Person.css";
import axios from "axios";

const url = `http://localhost:8080/api/v1/people/`;

function Person({ id, firstName, lastName, address, setToggleHelper }) {
  const [editState, setEditState] = useState(false);
  const [editForm, setEditForm] = useState({
    praenomens: [firstName],
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const { praenomens, cognomen, number, street, city, state, zip } = editForm;

  const resetEditFormHelper = () => {
    setEditForm({
      praenomens: [firstName],
      cognomen: lastName,
      number: address.number,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  };

  const formChangeHandler = (e) => {
    if (e.target.name === "praenomens") {
      setEditForm((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditForm((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const editStateHelper = () => {
    setEditState(!editState);
    resetEditFormHelper();
  };

  const formSubmitHandler = async (e, id) => {
    e.preventDefault();
    await axios.patch(url + id, editForm);
    setToggleHelper();
    editStateHelper();
  };

  const deleteHandler = async (id) => {
    await axios.delete(url + id);
    setToggleHelper();
  };

  return (
    <div className="card">
      {!editState ? (
        <Fragment>
          <h4>
            {id}: {firstName} {lastName}
          </h4>
          <p>
            {address.number} {address.street}
          </p>
          <p>
            {address.city} {address.state} {address.zip}
          </p>
          <button onClick={editStateHelper}>Edit</button>
          <button className="delete" onClick={() => deleteHandler(id)}>
            Delete
          </button>
        </Fragment>
      ) : (
        <>
          <form onSubmit={(e) => formSubmitHandler(e, id)}>
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
            <button>Submit Edit</button>
            <button onClick={editStateHelper}>Cancel</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Person;
