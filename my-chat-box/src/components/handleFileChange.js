import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

const handleFileChange = (e, name, chat, setChat) => {
  const file = e.target.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file); // Create a URL for the file

    setChat([
      ...chat,
      {
        name,
        text: (
          <div className="file-upload">
            <FontAwesomeIcon icon={faPaperclip} className="file-icon" />
            <a
              href={fileURL}
              download={file.name} // Makes the file downloadable
              className="file-name"
            >
              {file.name}
            </a>
          </div>
        ),
      },
    ]);
  }
};

export default handleFileChange;
