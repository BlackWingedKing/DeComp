import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<string>();

  const selectedFileHandler = (e: Event) => {
    // setSelectedFile(document.getElementById("myFile")?.files[0]);
    setSelectedFile(e?.target?.files[0]);
  };

  return (
    <div className="flex min-h-screen">
      <div className="m-auto flex flex-col items-center">
        <div className="text-3xl font-semibold text-emerald-700">
          Upload Code
        </div>
        <input
          type="file"
          id="myFile"
          className="hidden"
          onChange={(e) => selectedFileHandler(e)}
        />
        <input
          type="button"
          value="Select File"
          className="p-4 border-solid border-2 border-emerald-700 w-64 rounded-lg mt-10"
          onClick={() => document.getElementById("myFile")?.click()}
        />
      </div>
    </div>
  );
}
