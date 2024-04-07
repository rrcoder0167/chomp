"use client";
import { useState } from 'react';
import { UploadButton } from "~/utils/uploadthing";

export default function Home() {
  const [fileUrl, setFileUrl] = useState(null);
  const [totalSugars, setTotalSugars] = useState(null);

  const fetchTotalSugars = async (url: any) => {
    try {
      const res = await fetch(`/api/textrecognition/${encodeURIComponent(url)}`);
      const data = await res.json();
      setTotalSugars(data.totalSugars);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div className="flex flex-col">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            if (res && res[0] && res[0].url) {
              setFileUrl(res[0].url);
              fetchTotalSugars(res[0].url);
            }
            console.log(fileUrl);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        {fileUrl && (
          <div>
            <img className="rounded-lg" src={fileUrl} alt="Uploaded file" />
          </div>
        )}
      </div>
      <div>
        {totalSugars && (
          <div className="bg-ctp-surface0 rounded-lg p-10">
            <p className="text-ctp-text">Total Sugar Detected: {totalSugars}</p>
            <button className="mt-3 bg-ctp-blue p-2 rounded-lg text-ctp-surface0 font-semibold transitin transform duration-300 hover:scale-105">Add to Database</button>
          </div>
        )}
      </div>
    </main>
  );
}

