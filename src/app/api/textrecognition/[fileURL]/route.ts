// pages/api/textrecognition/[fileURL].ts
import { exec } from 'child_process';
import { NextResponse } from 'next/server';

function runPythonScript(url: string) {
  return new Promise((resolve, reject) => {
    exec(`python3 ./ai/food_text_recognition.py ${url}`, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

export async function GET(req, { params }) {
  const { fileURL } = params;
  try {
    const totalSugars = await runPythonScript(fileURL);
    return NextResponse.json({ totalSugars });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not fetch total sugars." }, { status: 500 });
  }
}