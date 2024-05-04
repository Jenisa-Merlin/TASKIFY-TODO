import Modal from "./Modal";

import React, { useState } from "react";
import { useCookies } from "react-cookie";

// declaring `ListHeader` functional component which receives `listname` (name of the list) and `getData` (function to fetch data) as props
const ListHeader = ({ listName, getData }) => {
  // to control the visibility of the modal define state variable showModal
  const [showModal, setShowModal] = useState(false);
  // to access cookies containing user info define cookies state variable
  const [cookies,, removeCookie] = useCookies(null);
  // removes `User` and `AuthToken` cookies from browser 
  const signOut = () => {
    removeCookie("User");
    removeCookie("AuthToken");
  };
  // JSX representing component's UI
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT {cookies && `(${cookies?.User.username})`}
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;