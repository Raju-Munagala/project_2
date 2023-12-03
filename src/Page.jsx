import React from "react";

const Page = ({ pageNumber }) => {
  return (
    <li className="page-item" style={{ margin: 5 + "px" }}>
      <button className="page-link">{pageNumber}</button>
    </li>
  );
};

export default Page;