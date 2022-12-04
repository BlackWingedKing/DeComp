import React, { useEffect, useState } from "react";
import axios from "axios";
import { isReady, verify } from "snarkyjs";

const Matrix = ({ values, setValues }) => {
  const handleChange = (e, idx) => {
    setValues((prev) => {
      const newState = [...prev];
      newState[idx] = e.target.value;
      return newState;
    });
  };
  return (
    <div className="px-16 text-2xl">
      <table class="border-2 border-gray-500">
        <tbody>
          <tr>
            <td class="border border-gray-500 px-4 py-2">
              <input
                type="text"
                value={values[0]}
                onChange={(e) => handleChange(e, 0)}
                className="w-24 h-24 outline-none text-center"
              />
            </td>
            <td class="border border-gray-500 px-4 py-2">
              <input
                type="text"
                value={values[1]}
                onChange={(e) => handleChange(e, 1)}
                className="w-24 h-24 outline-none text-center"
              />
            </td>
          </tr>
          <tr>
            <td class="border border-gray-500 px-4 py-2">
              <input
                type="text"
                value={values[2]}
                onChange={(e) => handleChange(e, 2)}
                className="w-24 h-24 outline-none text-center"
              />
            </td>
            <td class="border border-gray-500 px-4 py-2">
              <input
                type="text"
                value={values[3]}
                onChange={(e) => handleChange(e, 3)}
                className="w-24 h-24 outline-none text-center"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const RunJob = () => {
  const [input, setInput] = useState([0, 0, 0, 0]);
  const [output, setOutput] = useState([0, 0, 0, 0]);
  const [proof, setProof] = useState();
  const [vk, setVk] = useState();
  const [isVerifying, setIsVerifying] = useState();
  const [isComputing, setIsComputing] = useState();
  const [isVerified, setIsVerified] = useState();

  const url = "http://192.168.173.161:3000/run-job";

  const submitInput = () => {
    const arr2d = [
      [Number(input[0]), Number(input[1])],
      [Number(input[2]), Number(input[3])],
    ];

    setIsComputing(true);
    axios
      .post(
        url,
        {
          input: arr2d,
          methodName: "matinv",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function ({ data }) {
        const output = data.output;
        const proof = data.proof;
        const vk = data.vk;

        setOutput([
          output[0][0].toString(),
          output[0][1].toString(),
          output[1][0].toString(),
          output[1][1].toString(),
        ]);

        setIsComputing(false);
        setProof(proof);
        setVk(vk);

        setIsVerifying(true);
        const url2 = "http://192.168.173.161:3001/verify";
        axios
          .post(
            url2,
            { vk, proof },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(({ data }) => {
            console.log(data.verified);
            setIsVerifying(false);
            setIsVerified(data.verified);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getButtonContent = () => {
    if (isComputing === true) return "Computing...";
    else if (isVerifying === true) return "Verifying...";
    else if (isVerified === true) return "Verification Successful";
    else if (isVerified === false) return "Verification Failed";
    else return "Compute";
  };

  const getButtonClass = () => {
    if (isComputing === true)
      return "bg-blue-400 border-transparent text-white";
    else if (isVerifying === true)
      return "bg-violet-400 border-transparent text-white";
    else if (isVerified === true)
      return "bg-green-400 border-transparent text-white";
    else if (isVerified === false)
      return "bg-red-400 border-transparent text-white";
    else return "";
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center pt-16">
      <p className="text-4xl">Inverse of a Matrix</p>
      <div className="flex flex-col m-auto justify-center items-center">
        <div className="flex m-auto">
          <Matrix values={input} setValues={setInput} />
          <Matrix values={output} setValues={setOutput} />
        </div>
        <button
          className={
            "cursor-pointer	p-4 border-solid border-black border-2 w-64 rounded-lg mt-36 font-medium text-xl " +
            getButtonClass()
          }
          onClick={submitInput}
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
};

export default RunJob;
