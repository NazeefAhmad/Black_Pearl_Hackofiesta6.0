
// export default WebcamFeed;
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

interface WebcamFeedProps {
    onCapture: (imageSrc: string) => void;
    captureInterval: number;
    isCapturing: boolean;
}

const WebcamFeed: React.FC<WebcamFeedProps> = ({ 
    onCapture, 
    captureInterval,
    isCapturing 
}) => {
    const webcamRef = useRef<Webcam>(null);
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    // Check for webcam permissions
    useEffect(() => {
        const checkPermission = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                setHasPermission(true);
            } catch (error) {
                console.error('Permission denied for webcam:', error);
                setHasPermission(false);
            }
        };

        checkPermission();
    }, []);

    // Handle continuous capture
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isCapturing && hasPermission) {
            interval = setInterval(() => {
                const imageSrc = webcamRef.current?.getScreenshot();
                if (imageSrc) {
                    onCapture(imageSrc);
                }
            }, captureInterval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isCapturing, onCapture, captureInterval, hasPermission]);

    if (!hasPermission) {
        return (
            <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                Please grant permission to access your webcam
            </div>
        );
    }

    return (
        <div className="relative">
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                width={640}
                height={480}
                videoConstraints={{
                    width: 890,
                    height: 580,
                    facingMode: "user"
                }}
                className="rounded-lg shadow-lg"
            />
            {isCapturing && (
                <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Live</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebcamFeed;