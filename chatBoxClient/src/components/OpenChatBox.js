import React from "react";
import "./OpenChatBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

function OpenChatBox() {
  return (
    <div className="OpenChatBox">
      <FontAwesomeIcon icon={faComment} />
    </div>
  );
}

export default OpenChatBox;
