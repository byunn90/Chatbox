import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import "./imagePreview.css";
const handleFileChange = async (e, name, chat, setChat) => {
  const file = e.target.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    const isImage = file.type.startsWith("image/jpg");
    const isPDF = file.type === "application/pdf";

    setChat([
      ...chat,
      {
        name,
        text: (
          <div className="file-upload">
            <FontAwesomeIcon icon={faPaperclip} className="file-icon" />
            {isImage ? (
              <img src={fileURL} alt={file.name} className="image-preview" />
            ) : isPDF ? (
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
              <a href={fileURL} download={file.name} className="file-name">
                {file.name}
              </a>
            )}
          </div>
        ),
      },
    ]);

    // Send the file to the backend
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:5228/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
};

export default handleFileChange;
