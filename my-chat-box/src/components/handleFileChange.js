import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import "./imagePreview.css";
const handleFileChange = (e, name, chat, setChat) => {
  const file = e.target.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file); // Create a URL for the file
    const isImage = file.type.startsWith("image/jpg"); // Check if the file is an image
    const isPDF = file.type === "application/pdf"; // Check if the file is a PDF

    setChat([
      ...chat,
      {
        name,
        text: (
          <div className="file-upload">
            <FontAwesomeIcon icon={faPaperclip} className="file-icon" />
            {isImage ? (
              // If the file is an image, show a preview with controlled size
              <img src={fileURL} alt={file.name} className="image-preview" />
            ) : isPDF ? (
              // If the file is a PDF, show a PDF icon with a download option
              <div className="pdf-preview">
                <FontAwesomeIcon icon={faFilePdf} className="pdf-icon" />
                <a
                  href={fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file-name"
                >
                  {file.name}
                </a>
              </div>
            ) : (
              // For other file types, just show the file name with download option
              <a href={fileURL} download={file.name} className="file-name">
                {file.name}
              </a>
            )}
          </div>
        ),
      },
    ]);
  }
};

export default handleFileChange;
