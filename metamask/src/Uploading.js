import React, { useState } from "react";

export const Uploading = () => {
  const [selectedFile, setSelectedFile] = useState();

  const selectedFileHandler = (e) => {
    // setSelectedFile(document.getElementById("myFile")?.files[0]);
    setSelectedFile(e?.target?.files[0]);
  };

  return (
    <div class="w-full max-w-sm h-52 p-4 bg-white border rounded-lg shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="m-auto flex flex-col items-center">
        <div className="text-3xl font-semibold">Upload Code</div>
        <input
          type="file"
          id="myFile"
          className="hidden"
          onChange={(e) => selectedFileHandler(e)}
        />
        <input
          type="button"
          value="Select File"
          className="cursor-pointer	p-4 border-solid border-2 border-black w-64 rounded-lg mt-10 font-medium"
          onClick={() => document.getElementById("myFile")?.click()}
        />
      </div>
    </div>
  );
};
