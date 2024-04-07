"use client";
import { redirect } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "~/components/ui/button";
const taps = ["Sprite", "Coke", "Welches Fruit Snacks", "Squirt"];

export default function Page() {
    const [tap,setTap] = useState(0);

    const webcamRef = useRef(null);
    const [isWebcamOn, setIsWebcamOn] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [showModal, setShowModal] = useState(false); // New state for modal
    const [showConclusion, setShowConclusion] = useState(false);

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
        setShowConclusion(true);
    };

    return (
        <div className="flex flex-col items-center space-x-2 space-y-2">
            {isWebcamOn && (
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    muted={true}
                    videoConstraints={{ deviceId: selectedDeviceId }}
                    className="w-640 h-480 rounded-lg shadow-lg"
                />
            )}
            <Button
                onClick={toggleWebcam}
            >
                {isWebcamOn ? "Turn Off Webcam" : "Turn On Webcam"}
            </Button>
            {isWebcamOn && (
                <Button
                    onClick={captureImage}
                >
                    Capture Image
                </Button>
            )}
            <Button onClick={() => setTap(tap+1)}></Button>
            <p>{showConclusion ? `The food is a ${taps[tap-1]}. You should try to avoid this food if possible.` : ""}</p>
        </div>
    );
}
