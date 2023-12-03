import React from "react";
import Table from "./Table";
import Page from "./Page";
import { getPages, paginate } from "./service";
import axios from "axios";
import { useEffect, useState } from "react";

const Layout = () => {
  const makeBackendCall = () => {
    return axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => err.message);
  };
  const [reserveData, setReserveData] = useState([]);
  const [word, setWord] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]); //For deletion
  const pageSize = 10;
  const [data, setData] = useState([]);
  const pagesCount = Math.ceil(data.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = getPages(pagesCount);
  const currentPageData = paginate(data, currentPage, pageSize);

  const handleSearch = (word) => {
    if (word === "") {
      setData(reserveData);
    }
    setData(
      reserveData.filter(
        (user) =>
          user.name.toLowerCase().includes(word.toLowerCase()) ||
          user.email.toLowerCase().includes(word.toLowerCase()) ||
          user.role.toLowerCase().includes(word.toLowerCase())
      )
    );
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const newData = data.filter((user) => user.id !== id);
    setReserveData(newData);
    setData(newData);
  };

  const hadleMultipleDelete = (arrayOfUsers) => {
    const newUsers = data.filter((user) => !arrayOfUsers.includes(user.id));
    setData(newUsers);
    setSelectedUsers([]);
    if (arrayOfUsers.length === currentPageData.length) {
      setCurrentPage(pages.length - 1);
    }
  };

  useEffect(() => {
    makeBackendCall().then((res) => {
      setData(res);
      setReserveData(res);
    });
  }, []);
  //   console.log(paginate(data, 1, 10));

  return (
    <React.Fragment>
      <div style={{ overflow: "hidden" }}>
        <input
          type="text"
          style={{ width: 300 + "px", margin: "20px 50px" }}
          placeholder="Enter value"
          onChange={(e) => {
            setWord(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        {/* <button
          onClick={() => {
            console.log("clicked");
            handleSearch(word);
          }}
        >
          Search
        </button> */}
        <button
          style={{ position: "relative", left: 50 + "%" }}
          onClick={() => {
            hadleMultipleDelete(selectedUsers);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
        <div style={{ width: 90 + "%", margin: "auto", position: "relative" }}>
          <Table
            data={currentPageData}
            deleteUser={handleDelete}
            selectedUsers={selectedUsers}
            selectUser={setSelectedUsers}
          />
        </div>
        <div
          style={{
            position: "relative",
            left: 70 + "%",
            width: 100 + "%",
          }}
        >
          <p>
            You are on {currentPage} of {pages.length} pages
          </p>
          {/* For pagination */}
          <nav
            aria-label="Page navigation example"
            style={{ display: "inline" }}
          >
            <ul className="pagination">
              {pages.map((page) => {
                return (
                  <div key={page} onClick={() => setCurrentPage(page)}>
                    <Page pageNumber={page} />
                  </div>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;