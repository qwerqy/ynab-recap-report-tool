"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useTransaction } from "./provider";

const Form = () => {
  const [file, setFile] = useState<File>();
  const { handleSubmit } = useForm();
  const { setTransactions } = useTransaction();

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setFile(acceptedFiles[0]);
      },
      maxFiles: 1,
      accept: {
        "text/csv": [".csv"],
        "application/vnd.ms-excel": [],
        "application/csv": [],
        "text/x-csv": [],
        "application/x-csv": [],
        "text/comma-separated-values": [],
        "text/x-comma-separated-values": [],
      },
    });

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file as File);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const { transactions } = await res.json();
    setTransactions(transactions);
  };

  return (
    <div className="flex-none mb-10 relative z-10 before:absolute before:top-2 before:left-2 before:w-full before:h-full before:bg-black">
      <div className="relative z-10 w-full h-full border-2 border-black p-10 bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            {...getRootProps()}
            className="border-2 border-neutral-500 p-10 mb-6"
          >
            <input {...getInputProps()} />
            {acceptedFiles[0] ? (
              <span>{acceptedFiles[0].name}</span>
            ) : isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              // eslint-disable-next-line react/no-unescaped-entities
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          <div className="flex justify-center items-center ">
            {
              <button
                type="submit"
                disabled={!acceptedFiles[0]}
                className="border-2 border-black bg-pink-500 px-8 py-2 text-white font-semibold disabled:bg-slate-400"
              >
                Submit
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
