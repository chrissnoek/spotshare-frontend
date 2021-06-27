import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";

function AddPhoto(props) {
  if (props.currentStep && props.currentStep !== 1) {
    return null;
  }

  const {
    date,
    shutterspeed,
    iso,
    aperture,
    camera,
    focalLength,
    title,
  } = props.state.photo;
  const { photoLoading, tempFile } = props.state;

  let showInputClass =
    "relative border-2 border-dashed rounded mb-2 p-4 text-center cursor-pointer hover:border-green-500";
  showInputClass += !tempFile && !photoLoading ? " block" : " hidden";
  showInputClass +=
    props.state.onDragOver && !props.state.invalidFields.blob
      ? " border-green-400"
      : " border-gray-400";
  if (props.state.invalidFields.blob) showInputClass += " border-red-400";

  return (
    <React.Fragment>
      <div id="fileInput" className={showInputClass}>
        <input
          type="file"
          name="blob"
          ref={props.fileInput}
          onChange={props.onFileChange}
          onDrop={props.handleOnDrop}
          onDragOver={props.handleOnDragOver}
          onDragLeave={props.handleOnDragLeave}
          className="absolute m-0 p-0 w-full h-full outline-none pointer opacity-0 top-0 left-0"
        />
        <p className="text-xl text-black font-semibold">
          Drag en drop een afbeelding
        </p>
        <p className="text-base">
          {" "}
          of <a href="#">selecteer</a> een bestand{" "}
          <span className="text-sm block text-gray-300">
            {" "}
            (Hoge resolutie aangeraden, maximaal 27MB)
          </span>
        </p>
      </div>
      <div className="text-red-500">{props.state.invalidFields.blob}</div>
      {photoLoading && (
        <AiOutlineLoading3Quarters className="fill-current text-green-500" />
      )}
      {tempFile && (
        <div
          id="imagePreview"
          className="relative relative bg-gray-300 p-4 mb-2"
        >
          <div
            onClick={props.removeImage}
            className="border border-gray-600 rounded p-4 m-4 absolute top-0 right-0 cursor-pointer bg-black opacity-50 hover:opacity-100"
          >
            <FiTrash2 className="stroke-current text-gray-100" />
          </div>
          <img
            src={tempFile}
            id="output_image"
            className="max-w-full rounded mb-2"
          />
        </div>
      )}
      <input
        type="text"
        name="title"
        placeholder="Titel"
        value={title || ""}
        onChange={props.onChange}
      />

      <div className="text-red-500">{props.state.invalidFields.title}</div>
      <input
        type="date"
        name="date"
        placeholder="Datum"
        value={date || ""}
        onChange={props.onChange}
      />

      <div className="flex">
        <div className="flex flex-wrap items-stretch w-full relative mb-2 mr-2">
          <input
            type="text"
            name="shutterspeed"
            placeholder="Sluitertijd"
            value={shutterspeed || ""}
            onChange={props.onChange}
            className="special mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-r-none py-2 px-3 relative text-sm"
          />
          <div className="flex -mr-px">
            <span className="mb-2 flex items-center  bg-grey-lighter rounded rounded-l-none border border-l-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm">
              s
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-stretch w-full relative mb-2 mr-2">
          <div className="flex -mr-px">
            <span className="mb-2 flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm">
              iso
            </span>
          </div>
          <input
            type="number"
            name="iso"
            placeholder="iso"
            value={iso || ""}
            onChange={props.onChange}
            className="special mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
          />
        </div>

        <div className="flex flex-wrap items-stretch w-full relative mb-2">
          <div className="flex -mr-px">
            <span className="mb-2 flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm">
              f/
            </span>
          </div>
          <input
            type="number"
            name="aperture"
            placeholder="Diafragma"
            onChange={props.onChange}
            value={aperture || ""}
            className="special mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
          />
        </div>
      </div>
      <input
        type="text"
        name="camera"
        placeholder="camera"
        onChange={props.onChange}
        value={camera || ""}
      />
      <input
        type="text"
        name="focalLength"
        value={focalLength || ""}
        onChange={props.onChange}
        placeholder="focalLength"
      />
      <textarea
        type="text"
        name="desc"
        onChange={props.onChange}
        placeholder="Beschrijving"
      />
    </React.Fragment>
  );
}
export default AddPhoto;
