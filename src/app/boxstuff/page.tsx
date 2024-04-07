"use client";
import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../../components/box";

export default function Page() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [isWebcamOn, setIsWebcamOn] = useState(false);
    const [imageSrc, setImageSrc] = useState(null); // New state for image source

    // Main function
    const runCoco = async () => {
        await tf.setBackend('webgl'); // Set the backend to WebGL
        const net = await cocossd.load();
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval(() => {
            detect(net);
        }, 10);
    };

    const detect = async (net) => {
        // Check data is available
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            const obj = await net.detect(video);
            console.log(obj);

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            drawRect(obj, ctx);  
        }
    };

    const toggleWebcam = () => {
        setIsWebcamOn(!isWebcamOn);
    };

    const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Save the image source to state
    setImageSrc(imageSrc);
    // You can now download the image or send it to a server
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'capture.png';
    link.click();
    // Turn off the webcam
    setIsWebcamOn(false);
};

    useEffect(() => {
        runCoco();
    }, []);

    return (
        <div>
            {isWebcamOn ? (
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    muted={true}
                    className="absolute mx-auto left-0 right-0 text-center z-9 w-640 h-480"
                />
            ) : null}
            <canvas
                ref={canvasRef}
                className="absolute mx-auto left-0 right-0 text-center z-9 w-640 h-480"
            />
            <button onClick={toggleWebcam} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {isWebcamOn ? "Turn Off Webcam" : "Turn On Webcam"}
            </button>
            {isWebcamOn ? (
                <button onClick={captureImage} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Capture Image
                </button>
            ) : null}
            {/* Add an img element to display the captured image */}
            {imageSrc ? (
                <img src={imageSrc} alt="Captured" />
            ) : null}
        </div>
    );
}