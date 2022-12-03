import React, { useEffect, useState } from "react";
import axios from "axios";
import { Proof, VerificationKey } from "snarkyjs";

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

  const url = "http://192.168.173.161:3000/run-job";

  const submitInput = () => {
    const arr2d = [
      [Number(input[0]), Number(input[1])],
      [Number(input[2]), Number(input[3])],
    ];
    axios
      .post(url, {
        input: arr2d,
        methodName: "matinv",
      })
      .then(function ({ data }) {
        const output = data.output;
        const proof = data.proof;
        setOutput([
          output[0][0].toString(),
          output[0][1].toString(),
          output[1][0].toString(),
          output[1][1].toString(),
        ]);
        setProof(proof);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (proof) {
    }
  }, [proof]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center pt-16">
      <p className="text-4xl">Inverse of a Matrix</p>
      <div className="flex flex-col m-auto justify-center items-center">
        <div className="flex m-auto">
          <Matrix values={input} setValues={setInput} />
          <Matrix values={output} setValues={setOutput} />
        </div>
        <button
          className="cursor-pointer	p-4 border-solid border-black border-2 w-64 rounded-lg mt-36 font-medium text-xl"
          onClick={submitInput}
        >
          Compute
        </button>
      </div>
    </div>
  );
};

export default RunJob;
