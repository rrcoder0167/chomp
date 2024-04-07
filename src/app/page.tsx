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
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
        });
    }, []);

    const toggleWebcam = () => {
        setIsWebcamOn(!isWebcamOn);
    };

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
        setShowModal(true); // Show modal after capturing image
    };

    const handleDeviceChange = (event) => {
        setSelectedDeviceId(event.target.value);
    };

    const handleConfirm = () => {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = 'captured_image.png'; // or any other name you want
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowModal(false); // Hide modal
        window.location.href = '/testing'; // Redirect the user to /testing
    };

    const handleCancel = () => {
        setImageSrc(null); // Discard image
        setShowModal(false); // Hide modal
    };

    return (
        <div className="flex flex-col items-center">
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-110"
            >
                {isWebcamOn ? "Turn Off Webcam" : "Turn On Webcam"}
            </button>
            {isWebcamOn && (
                <button
                    onClick={captureImage}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-110"
                >
                    Capture Image
                </button>
            )}
            <select
                onChange={handleDeviceChange}
                className="mt-4 p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-200"
            >
                {devices.map((device, index) => (
                    <option key={index} value={device.deviceId}>
                        {device.label || `Device ${index + 1}`}
                    </option>
                ))}
            </select>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="mb-4">Is this the image you want?</h2>
                        <img src={imageSrc} alt="Captured" className="mb-4" />
                        <div className="flex justify-end">
                            <button onClick={handleCancel} className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                No
                            </button>
                            <button onClick={handleConfirm} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}