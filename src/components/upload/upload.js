//import {useState} from "react";
import "./upload.css";

const isDnDPossible = () => {
  const div = document.createElement("div");
  return [
    "draggable" in div || ("ondragstart" in div && "ondrop" in div),
    "FormData" in window,
    "FileReader" in window,
  ].every((v) => v);
};

const Upload = ({
  multiple = true,
  fileTypes = ["png", "jpeg", "bmp", "jpg"],
}) => {
  const handleFiles = (e) => console.log(e);
  const allowedFiles = fileTypes.map((ext) => `.${ext}`);
  const formClasses = [
    "dnd-container",
    "rounded-lg",
    "relative p-8",
    "bg-gray-800",
    "flex",
    "flex-col",
    "font-bold",
    "text-center",
    "cursor-pointer",
    "justify-center",
    isDnDPossible ? "border-dashed border-2" : "border-1",
  ].join(" ");

  return (
    <div className="p-4 relative flex flex-col">
      <form className={formClasses}>
        {isDnDPossible && (
          <p className="p-2">Drag and drop multiple images in this area.</p>
        )}
        {!isDnDPossible && <p className="p-2">Select multiple images</p>}
        <div className="opacity-60 text-sm">
          Supported file types:
          <div className="flex flex-row divide-x justify-center p-2">
            {allowedFiles.map((ext) => (
              <div className="px-6">{ext}</div>
            ))}
          </div>
        </div>
        <input
          className="self-center p-6"
          type="file"
          hidden={!isDnDPossible}
          multiple={multiple}
          accept={allowedFiles}
          onChange={handleFiles}
        />
      </form>
    </div>
  );
};
export default Upload;
