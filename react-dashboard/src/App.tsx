// import './App.css';
// import { useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
// import WebcamFeed from './components/custom/WebcamFeed';

// function App() {
//     const [emotion, setEmotion] = useState<string>("");
//     const [isCapturing, setIsCapturing] = useState<boolean>(true);
//     const captureInterval = 1000; // Capture every 1 second

//     const captureFrame = async (imageSrc: string) => {
//         if (!isCapturing) return;
        
//         try {
//             const blob = await fetch(imageSrc).then((res) => res.blob());
//             const formData = new FormData();
//             formData.append('file', blob, 'frame.jpg');

//             const response = await axios.post('http://127.0.0.1:8000/detect-emotion/', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });

//             // Debug logging
//             console.log('Response data:', response.data);
            
//             if (response.data && response.data.emotions && response.data.emotions.length > 0) {
//                 const detectedEmotion = response.data.emotions[0]; // Direct access to the emotion string
//                 console.log('Detected emotion:', detectedEmotion);
//                 setEmotion(detectedEmotion);
//             } else {
//                 console.log('No face detected in frame');
//                 setEmotion('No face detected');
//             }
//         } catch (error) {
//             console.error('Error detecting emotion:', error);
//             setEmotion('Error detecting emotion');
//         }
//     };

//     return (
//         <div className="package-container max-container p-5 flex flex-col gap-10">
//             <h1 className='text-4xl text-center mt-12 font-bold mb-12'>Live CCTV Feed</h1>
//             <div className="grid grid-cols-5 gap-10">
//                 <Card className='col-span-3 main-container'>
//                     <CardHeader>
//                         <CardTitle className='text-3xl'>Current CCTV Feed</CardTitle>
//                     </CardHeader>
//                     <CardContent className='flex flex-col gap-y-9'>
//                         <WebcamFeed 
//                             onCapture={captureFrame} 
//                             captureInterval={captureInterval}
//                             isCapturing={isCapturing}
//                         />
//                         <button 
//                             onClick={() => setIsCapturing(!isCapturing)}
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                         >
//                             {isCapturing ? 'Stop Capturing' : 'Start Capturing'}
//                         </button>
//                     </CardContent>
//                 </Card>
//                 <Card className="col-span-2 side-container">
//                     <CardHeader>
//                         <CardTitle className='text-3xl'>Detected Emotion</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="flex flex-col gap-2">
//                             <p className="text-lg font-medium">
//                                 {emotion || 'No emotion detected yet'}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                                 {isCapturing ? 'Actively detecting emotions...' : 'Detection paused'}
//                             </p>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }

// export default App;
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import WebcamFeed from './components/custom/WebcamFeed';
import MapComponent from './components/custom/MapComponent';
import LineChart from './components/custom/LineChart';
import ComplaintList from './components/custom/ComplaintList';
import SuspectGallery from './components/custom/SuspectGallery';

function App() {
    const [emotion, setEmotion] = useState<string>("");
    const [isCapturing, setIsCapturing] = useState<boolean>(true);
    const captureInterval = 1000; // Capture every 1 second

    const places = [
        { name: "Red Zone (Delhi)", lat: 28.6139, lng: 77.2090, type: "High Risk" },
        { name: "Yellow Zone (Lucknow)", lat: 26.8500, lng: 80.9499, type: "Moderate Risk" },
        { name: "Green Zone (Agra)", lat: 27.1767, lng: 78.0081, type: "Safe Zone" },
        { name: "Red Zone (Mumbai)", lat: 19.0760, lng: 72.8777, type: "High Risk" },
        { name: "Yellow Zone (Bangalore)", lat: 12.9716, lng: 77.5946, type: "Moderate Risk" },
        { name: "Red Zone (Kolkata)", lat: 22.5726, lng: 88.3639, type: "High Risk" },
        { name: "Green Zone (Chennai)", lat: 13.0827, lng: 80.2707, type: "Safe Zone" },
        { name: "Yellow Zone (Hyderabad)", lat: 17.3850, lng: 78.4867, type: "Moderate Risk" },
        { name: "Red Zone (Pune)", lat: 18.5204, lng: 73.8567, type: "High Risk" },
        { name: "Green Zone (Jaipur)", lat: 26.9124, lng: 75.7873, type: "Safe Zone" }
    ];

    const captureFrame = async (imageSrc: string) => {
        if (!isCapturing) return;

        try {
            const blob = await fetch(imageSrc).then((res) => res.blob());
            const formData = new FormData();
            formData.append('file', blob, 'frame.jpg');

            const response = await axios.post('http://127.0.0.1:8000/detect-emotion/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data && response.data.emotions && response.data.emotions.length > 0) {
                const detectedEmotion = response.data.emotions[0];
                setEmotion(detectedEmotion);
            } else {
                setEmotion('No face detected');
            }
        } catch (error) {
            console.error('Error detecting emotion:', error);
            setEmotion('Error detecting emotion');
        }
    };

    return (
        <div className="package-container max-container p-5 flex flex-col gap-10">
            <h1 className='text-4xl text-center mt-12 font-bold mb-12'>Live CCTV Feed</h1>

            {/* CCTV Feed & Detected Emotion */}
            <div className="grid grid-cols-5 gap-10">
                <Card className='col-span-3 main-container'>
                    <CardHeader>
                        <CardTitle className='text-3xl'>Current CCTV Feed</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-y-9'>
                        <WebcamFeed 
                            onCapture={captureFrame} 
                            captureInterval={captureInterval}
                            isCapturing={isCapturing}
                        />
                        <button 
                            onClick={() => setIsCapturing(!isCapturing)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            {isCapturing ? 'Stop Capturing' : 'Start Capturing'}
                        </button>
                    </CardContent>
                </Card>
                <Card className="col-span-2 side-container">
                    <CardHeader>
                        <CardTitle className='text-3xl'>Detected Emotion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-medium">
                                {emotion || 'No emotion detected yet'}
                            </p>
                            <p className="text-sm text-gray-500">
                                {isCapturing ? 'Actively detecting emotions...' : 'Detection paused'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Time Chart & Complaint Portal */}
            <div className='grid grid-cols-5 gap-10'>
                <Card className=" main-container col-span-2">
                    <CardHeader>
                        <CardTitle className='text-3xl'>Time Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineChart />
                    </CardContent>
                </Card>
                <Card className='col-span-3 bottom-side-container'>
                    <CardHeader>
                        <CardTitle className='w-full text-3xl'>Live Complaint Portal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ComplaintList />
                    </CardContent>
                </Card>
            </div>

            {/* Heatmaps & Place List */}
            <div className="grid grid-cols-5 gap-10">
                <Card className="col-span-3 main-container">
                    <CardHeader>
                        <CardTitle className='text-3xl'>Heatmaps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MapComponent places={places} />
                    </CardContent>
                </Card>
                <Card className='bottom-side-container col-span-2'>
                    <CardHeader>
                        <CardTitle className='text-3xl'>Place List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-4 h-[450px] overflow-y-auto pr-2'>
                            {places.map((place, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                    <h3 className="font-semibold text-lg">{place.name}</h3>
                                    <p className="text-sm text-gray-600">Type: {place.type}</p>
                                    <p className="text-sm text-gray-500">
                                        Location: {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default App;
