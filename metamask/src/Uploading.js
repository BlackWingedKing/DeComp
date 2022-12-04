import React, { useState } from "react";
import { create } from "ipfs-http-client";

async function uploadFileToIPFS(data) {
  const url = "/ip4/127.0.0.1/tcp/5002/http";
  const client = create({ url });
  const { cid } = await client.add(data);
  return cid;
}

export const Uploading = ({ addMethod }) => {
  const [fileName, setFileName] = useState();
  const [fileHash, setFileHash] = useState();

  const selectedFileHandler = async (e) => {
    const file = e?.target?.files[0];
    setFileName(file.name);
    const hash = await uploadFileToIPFS(file);
    if (hash) {
      setFileHash(hash.toString());
      addMethod(file.name, hash.toString());
    }
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
          value={fileName ? fileName : "Select File"}
          className="cursor-pointer	p-4 border-solid border-2 border-black w-64 rounded-lg mt-10 font-medium"
          onClick={() => document.getElementById("myFile")?.click()}
        />
        {fileHash && (
          <div class="flex items-center pt-4 text-base font-bold text-gray-900 rounded-lg">
            <span class="flex-1 ml-3 whitespace-nowrap">IPFS Hash</span>
            <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              {fileHash.slice(0, 10) + "..." + fileHash.slice(32, 42)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
