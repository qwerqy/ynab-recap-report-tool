"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Transaction } from "@types";
import Table from "./table";

const Form = () => {
  const [file, setFile] = useState<File>();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState<Transaction[]>();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
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
    setData(transactions);
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
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              // eslint-disable-next-line react/no-unescaped-entities
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          <div className="flex justify-center items-center ">
            <button
              type="submit"
              className="border-2 border-black bg-pink-500 px-8 py-2 text-white font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
