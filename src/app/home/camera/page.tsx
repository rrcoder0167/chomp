"use client";
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";


export default function Page() {
    const webcamRef = useRef(null);
    const [isWebcamOn, setIsWebcamOn] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [showModal, setShowModal] = useState(false); // New state for modal

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
            // @ts-expect-error
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
        });
    }, []);

    const toggleWebcam = () => {
        setIsWebcamOn(!isWebcamOn);
    };

    const captureImage = () => {
        // @ts-expect-error
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
        setShowModal(true); // Show modal after capturing image
    };


    // @ts-expect-error
    const handleDeviceChange = (event) => {
        setSelectedDeviceId(event.target.value);
    };

    const handleConfirm = () => {
        const link = document.createElement('a');
        // @ts-expect-error
        link.href = imageSrc;
        link.download = 'captured_image.png'; // or any other name you want
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowModal(false); // Hide modal
        window.location.href = '/home/scanner'; // Redirect the user to /testing
    };

    const handleCancel = () => {
        setImageSrc(null); // Discard image
        setShowModal(false); // Hide modal
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {isWebcamOn && (
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    muted={true}
                    videoConstraints={{ deviceId: selectedDeviceId }}
                    className="w-640 h-480 rounded-lg shadow-lg"
                />
            )}
            <button
                onClick={toggleWebcam}
                className="bg-ctp-blue hover:bg-ctp-mauve text-ctp-base font-bold py-2 px-4 rounded-xl mt-4 transition-all duration-300 ease-in-out hover:scale-105"
            >
                {isWebcamOn ? "Turn Off Camera" : "Turn On Camera"}
            </button>
            {isWebcamOn && (
                <button
                    onClick={captureImage}
                    className="bg-ctp-green hover:bg-ctp-teal text-ctp-base font-bold py-2 px-4 rounded-xl mt-4 transition duration-300 ease-in-out transform hover:scale-110"
                >
                    Capture Image
                </button>
            )}
            <select
                onChange={handleDeviceChange}
                className="mt-4 p-2 border bg-ctp-surface0 rounded-xl text-ctp-text cursor-pointer hover:bg-ctp-surface1"
            >
                {devices.map((device, index) => (
                    // @ts-expect-error
                    <option key={index} value={device.deviceId}>
                        {device.label || `Device ${index + 1}`}
                    </option>
                ))}
            </select>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-ctp-surface0 p-4 rounded-xl shadow-lg">
                        <h2 className="text-ctp-text mb-4">Is this the image you want?</h2>
                        // @ts-ignore
                        <img src={String(imageSrc)} alt="Captured" className="mb-4 rounded-xl" />
                        <div className="flex justify-end">
                            <button onClick={handleCancel} className="mr-2 bg-ctp-red text-ctp-surface0 font-bold py-2 px-4 rounded transition-all transform hover:scale-105">
                                No
                            </button>
                            <button onClick={handleConfirm} className="bg-ctp-green text-ctp-surface0 font-bold py-2 px-4 rounded transition-all transform hover:scale-105">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
