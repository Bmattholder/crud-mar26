import React, { useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

import "./PeopleList.css";

function PeopleList({ toggle, setToggleHelper }) {
  const [peopleList, setPeopleList] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  const url = `http://localhost:8080/api/v1/people?page=${page}&size=${size}`;

  useEffect(() => {
    async function getPeople() {
      const res = await axios.get(url);
      const data = res.data;
      setPeopleList(data.content);
      setTotalPages(data.totalPages);
    }

    getPeople();
  }, [url, toggle]);

  const pageChangeHandler = (e, newPage) => {
    setPage(newPage);
  };

  const pageSizeChangeHandler = (e) => {
    setSize(parseInt(e.target.value, 10));
    setPage(0);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <>
      <div className="pagination">
        Show
        <select value={size} onChange={pageSizeChangeHandler}>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        entries
      </div>
      {peopleList.map((person) => (
        <Person
          key={person.id}
          id={person.id}
          firstName={person.personalName.givenNames[0].value}
          lastName={person.personalName.surname.value}
          address={person.address}
          setToggleHelper={setToggleHelper}
        />
      ))}
      <div className="paginationNumber">
        <button
          disabled={page === 0}
          onClick={(e) => pageChangeHandler(e, page - 1)}
        >
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <p
            key={pageNumber}
            className={pageNumber === page ? "active num" : "num"}
            onClick={
              pageNumber !== page
                ? (e) => pageChangeHandler(e, pageNumber)
                : null
            }
          >
            {pageNumber + 1}
          </p>
        ))}
        <button
          disabled={peopleList.length < size || page === totalPages - 1}
          onClick={(e) => pageChangeHandler(e, page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PeopleList;
