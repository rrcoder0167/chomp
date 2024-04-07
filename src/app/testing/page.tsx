"use client";
import { useState } from 'react';
import { UploadButton } from "~/utils/uploadthing";

export default function Home() {
  const [fileUrl, setFileUrl] = useState(null);
  const [totalSugars, setTotalSugars] = useState(null);

  const fetchTotalSugars = async (url) => {
    try {
      const res = await fetch(`/api/textrecognition/${encodeURIComponent(url)}`);
      const data = await res.json();
      setTotalSugars(data.totalSugars);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
          <p className="text-white">Uploaded file URL: {fileUrl}</p>
          <img className="rounded-lg" src={fileUrl} alt="Uploaded file" />
        </div>
      )}
      {totalSugars && (
        <div>
          <p className="text-white">Total Sugars: {totalSugars}</p>
        </div>
      )}
    </main>
  );
}