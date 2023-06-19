"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useTransaction } from "./provider";
import smoothscroll from "smoothscroll-polyfill";
import useSWR, { mutate } from "swr";
import { Transaction } from "@utils/types";

const fetcher = async (formData: FormData) =>
  fetch("/api/upload", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());

const Form = () => {
  const [file, setFile] = useState<File>();
  const { handleSubmit } = useForm();
  const { setTransactions, resultsRef } = useTransaction();

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

    try {
      const data = await mutate<{ transactions: Transaction[] }>(
        "api/upload",
        fetcher(formData)
      );

      if (data) {
        setTransactions(data.transactions);
      }

      if (resultsRef) {
        setTimeout(() => {
          resultsRef?.current.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fix smooth scroll on Safari browser
    smoothscroll.polyfill();
  }, []);

  return (
    <div className="max-w-lg w-full flex-none mb-10 relative z-10 before:absolute before:top-2 before:left-2 before:w-full before:h-full before:bg-black">
      <div className="relative z-10 w-full h-full border-2 border-black p-10 bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            {...getRootProps()}
            className="border-2 border-neutral-500 p-10 mb-6 text-center"
          >
            <input {...getInputProps()} />
            {acceptedFiles[0] ? (
              <span className="text-center">{acceptedFiles[0].name}</span>
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
