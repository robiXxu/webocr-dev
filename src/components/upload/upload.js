import { Component, createRef } from "react";
import "./upload.css";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.multiple = props.multiple || true;
    this.fileTypes = props.fileTypes || ["png", "jpeg", "bmp", "jpg"];

    this.dndContainerRef = createRef();
    this.fileInputRef = createRef();

    this.state = {
      formHighlight: false,
      files: [],
    };
  }

  loadPreviewFiles = (files) => {
  };

  handleFiles = (files) => {
    files.forEach((f) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onloadend = () => {
        this.setState((state) => {
          const existsAlready = state.files.find(sf => sf.data === reader.result);
          return existsAlready ? {} : {
            files: [...state.files, {
              name: f.name,
              data: reader.result
            }],
          };
        });
      };
    });
  };

  render = () => {
    return (
      <div className="p-4 relative flex flex-col">
        <form ref={this.dndContainerRef} className={this.formClasses()}>
          {this.isDnDPossible() && (
            <p className="p-2">Drag and drop multiple files in this area.</p>
          )}
          {!this.isDnDPossible() && (
            <p className="p-2">Select multiple files</p>
          )}
          <div className="opacity-60 text-sm">
            Supported file types:
            <div className="flex flex-row divide-x pointer-events-none justify-center">
              {this.allowedFiles().map((ext) => (
                <div key={ext} className="px-6">
                  {ext}
                </div>
              ))}
            </div>
          </div>
          <input
            ref={this.fileInputRef}
            className="self-center p-6"
            type="file"
            hidden={this.isDnDPossible()}
            multiple={this.multiple}
            accept={this.allowedFiles().join(", ")}
            onChange={this.handleFiles}
          />
        </form>
        {this.state.files.length > 0 && (<div>
          {this.state.files.map(f => (
            <img key={f.name} src={f.data} alt={f.name} />
          ))}
        </div>)}
      </div>
    );
  };

  componentDidMount = () => {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((e) => {
      this.dndContainerRef.current.addEventListener(
        e,
        this.preventDefault,
        false
      );
    });

    ["dragenter", "dragover"].forEach((e) => {
      this.dndContainerRef.current.addEventListener(
        e,
        () => this.dndState(true),
        false
      );
    });

    ["dragleave", "drop"].forEach((e) => {
      this.dndContainerRef.current.addEventListener(
        e,
        () => this.dndState(false),
        false
      );
    });

    this.dndContainerRef.current.addEventListener(
      "drop",
      this.handleDrop,
      false
    );
  };

  handleDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    this.handleFiles(Array.from(files));
  };

  dndState = (formHighlight) => {
    this.setState(() => ({
      formHighlight,
    }));
  };

  preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  isDnDPossible = () => {
    const div = document.createElement("div");
    return [
      "draggable" in div || ("ondragstart" in div && "ondrop" in div),
      "FormData" in window,
      "FileReader" in window,
    ].every((v) => v);
  };

  formClasses = () => {
    return [
      "rounded-lg",
      "relative p-8",
      "bg-gray-800",
      "flex",
      "flex-col",
      "font-bold",
      "text-center",
      "cursor-pointer",
      "justify-center",
      this.isDnDPossible() ? "border-dashed border-2" : "border-1",
      this.state.formHighlight
        ? "ring-4 ring-indigo-200 border-gray-800"
        : "border-white",
    ]
      .filter(Boolean)
      .join(" ");
  };

  allowedFiles = () => {
    return this.fileTypes.map((ext) => `.${ext}`);
  };
}
export default Upload;
