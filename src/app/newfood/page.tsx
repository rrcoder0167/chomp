// pages/newfood.tsx

import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Tesseract from 'tesseract.js';

export default function NewFood() {
    // ... all your states, refs, and useEffects
    const [ocrResult, setOcrResult] = useState(null); // New state for OCR result

    const handleConfirm = () => {
        setShowModal(false); // Hide modal and keep image

        // Perform OCR on the image
        Tesseract.recognize(
            imageSrc,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            // Search for the pattern "Total Sugars {anything here}\n"
            const pattern = /Total Sugars (.*?)\n/;
            const match = pattern.exec(text);

            if (match) {
                const totalSugars = match[1];
                setOcrResult(`Food Total Sugar Quantity: ${totalSugars}`);
            } else {
                setOcrResult("Total Sugars not found.");
            }
        });
    };

    // ... your other methods

    return (
        <div className="flex flex-col items-center">
            {ocrResult ? (
                // If OCR result is available, show the result and the image
                <div className="flex">
                    <img src={imageSrc} alt="Captured" className="mb-4" />
                    <p>{ocrResult}</p>
                </div>
            ) : (
                // If OCR result is not available, show the webcam and the controls
                <>
                    {isWebcamOn && (
                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/png"
                            muted={true}
                            videoConstraints={{ deviceId: selectedDeviceId }}
                            className="w-640 h-480 rounded-lg shadow-lg"
                        />
                    )}
                    {/* ... your other controls */}
                </>
            )}
        </div>
    );
}