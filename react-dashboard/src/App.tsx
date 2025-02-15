import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Sidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconAlertTriangle,
  IconBrain,
  IconEye,
  IconUserCheck,
} from "@tabler/icons-react";
import WebcamFeed from './components/custom/WebcamFeed';
import MapComponent from './components/custom/MapComponent';
import LineChart from './components/custom/LineChart';
import ComplaintList from './components/custom/ComplaintList';
import Header from './components/custom/Header';
// import { ScrollArea } from './components/ui/scroll-area';
import { cn } from './lib/utils';
import Footer from './components/custom/Footer';

function App() {
    const [emotion, setEmotion] = useState<string>("");
    const [isCapturing, setIsCapturing] = useState<boolean>(true);
    const captureInterval = 1000; // Capture every 1 second

    const links = [
        {
          label: "Surveillance",
          href: "#",
          icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Complaints",
          href: "#",
          icon: (
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Analytics",
          href: "#",
          icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Records",
          href: "#",
          icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Predictions",
          href: "#",
          icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Emergency",
          href: "#",
          icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
      ];

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
        const apiUrl = import.meta.env.VITE_API_URL;

        try {
            const blob = await fetch(imageSrc).then((res) => res.blob());
            const formData = new FormData();
            formData.append('file', blob, 'frame.jpg');

            const response = await axios.post(`${apiUrl}/detect-emotion/`, formData, {
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
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar animate={false}>
                    <SidebarBody>
                        {links.map((link, index) => (
                            <SidebarLink key={index} link={link} />
                        ))}
                    </SidebarBody>
                </Sidebar>
                
                <div className="flex-1 bg-slate-50 overflow-auto">
                    <div className="max-w-[2000px] mx-auto p-6 space-y-8">

{/* Status Cards */}
                        <div className="grid grid-cols-4 gap-6">
                            <div className="bg-red-50 p-4 rounded-lg flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                                    <IconAlertTriangle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-red-600 font-medium">Active SOS</p>
                                    <p className="text-2xl font-bold text-red-700">12</p>
                                </div>
                            </div>
                            
                            <div className="bg-yellow-50 p-4 rounded-lg flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <IconBrain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-yellow-600 font-medium">Response Time</p>
                                    <p className="text-2xl font-bold text-yellow-700">4.2 min</p>
                                </div>
                            </div>
                            
                            <div className="bg-green-50 p-4 rounded-lg flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                    <IconUserCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-green-600 font-medium">Available Units</p>
                                    <p className="text-2xl font-bold text-green-700">28</p>
                                </div>
                            </div>
                            
                            <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                    <IconUserBolt className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-blue-600 font-medium">Active Officers</p>
                                    <p className="text-2xl font-bold text-blue-700">45</p>
                                </div>
                            </div>
                        </div>

            {/* CCTV Feed & Detected Emotion */}
                        <div className="grid grid-cols-4 gap-10">
                            <Card className='col-span-2 main-container'>
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
                                    <CardTitle className='text-red-600 text-3xl'>Suspect Detected </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-medium">
                                            {emotion || 'No suspect detected yet'}
                            </p>
                            <p className="text-sm text-gray-500">
                                            {isCapturing ? 'Actively detecting suspects...' : 'Detection paused'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

{/* Confidence Score Card */}
<div className="grid grid-cols-1 gap-6">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle className='text-3xl'>AI Prediction Confidence Score</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium text-gray-700">Overall System Confidence</h3>
                                            <p className="text-sm text-gray-600">Based on historical data accuracy and current pattern matching</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                                    96.8%
                                                </span>
                                                <p className="text-sm text-gray-500 mt-1">Last updated 5 mins ago</p>
                                            </div>
                                            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                                                <IconBrain className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6 mt-6">
                                        <div className="p-4 border rounded-lg bg-gray-50">
                                            <h4 className="text-sm font-medium text-gray-600">Pattern Recognition</h4>
                                            <p className="text-2xl font-bold text-blue-600 mt-1">98.2%</p>
                                        </div>
                                        <div className="p-4 border rounded-lg bg-gray-50">
                                            <h4 className="text-sm font-medium text-gray-600">Location Accuracy</h4>
                                            <p className="text-2xl font-bold text-cyan-600 mt-1">95.7%</p>
                                        </div>
                                        <div className="p-4 border rounded-lg bg-gray-50">
                                            <h4 className="text-sm font-medium text-gray-600">Time Prediction</h4>
                                            <p className="text-2xl font-bold text-purple-600 mt-1">96.5%</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

{/* AI Stats & Real-time Alerts */}
                        
                        <div className='grid grid-cols-5 gap-10'>
                            <Card className="main-container col-span-3">
                                <CardHeader>
                                    <CardTitle className='text-3xl'>AI Detection Stats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4 h-[120px]">
                                        <div className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                                            <IconBrain className="w-8 h-8 text-blue-600" />
                                            <div>
                                                <h3 className="font-medium text-sm">Total Detections</h3>
                                                <p className="text-2xl font-bold text-blue-600">1,234</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                                            <IconUserCheck className="w-8 h-8 text-green-600" />
                                            <div>
                                                <h3 className="font-medium text-sm">Accuracy Rate</h3>
                                                <p className="text-2xl font-bold text-green-600">98.5%</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                                            <IconEye className="w-8 h-8 text-purple-600" />
                                            <div>
                                                <h3 className="font-medium text-sm">Active Cameras</h3>
                                                <p className="text-2xl font-bold text-purple-600">24</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                                            <IconAlertTriangle className="w-8 h-8 text-red-600" />
                                            <div>
                                                <h3 className="font-medium text-sm">Alerts Today</h3>
                                                <p className="text-2xl font-bold text-red-600">15</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className='col-span-2 bottom-side-container'>
                                <CardHeader>
                                    <CardTitle className='w-full text-3xl'>Real-time Alerts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 h-[120px] overflow-auto">
                                        {[
                                            { time: "2 mins ago", type: "High Risk", location: "Delhi Central", message: "Suspicious activity detected" },
                                            { time: "5 mins ago", type: "Medium Risk", location: "Mumbai West", message: "Unusual crowd gathering" },
                                            { time: "10 mins ago", type: "Low Risk", location: "Bangalore South", message: "Camera malfunction" },
                                            { time: "15 mins ago", type: "High Risk", location: "Kolkata East", message: "Security breach detected" },
                                        ].map((alert, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                                <div className={`w-2 h-2 rounded-full ${
                                                    alert.type === "High Risk" ? "bg-red-500" :
                                                    alert.type === "Medium Risk" ? "bg-yellow-500" : "bg-blue-500"
                                                }`} />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-medium text-sm">{alert.type}</h3>
                                                        <span className="text-xs text-gray-500">{alert.time}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-600">{alert.message}</p>
                                                    <p className="text-xs text-gray-500">{alert.location}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

{/* Project Status Cards */}
<div className="grid grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Total Projects</h3>
            <span className="p-2 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none">
                    <path d="M7 13L10 16L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        </div>
        <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">24</span>
            <span className="text-sm text-green-600 mb-1">Increased from last month</span>
        </div>
    </div>

    <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Ended Projects</h3>
            <span className="p-2 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none">
                    <path d="M7 13L10 16L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        </div>
        <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">10</span>
            <span className="text-sm text-green-600 mb-1">Increased from last month</span>
        </div>
    </div>

    <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Running Projects</h3>
            <span className="p-2 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none">
                    <path d="M7 13L10 16L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </span>
        </div>
        <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">12</span>
            <span className="text-sm text-green-600 mb-1">Increased from last month</span>
        </div>
    </div>

    <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Pending Project</h3>
            <span className="p-2 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                </svg>
            </span>
        </div>
        <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">2</span>
            <span className="text-sm text-blue-600 mb-1">On Discuss</span>
        </div>
    </div>
</div>

                        

                        {/* Live Complaint Portal */}
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
                                    <CardTitle className='text-3xl'>Crime Intensity Heatmaps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MapComponent places={places} />
                    </CardContent>
                </Card>
                <Card className='bottom-side-container col-span-2'>
                    <CardHeader>
                                    <CardTitle className='text-3xl'>High Crime Areas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-4 h-[450px] overflow-y-auto pr-2'>
                            {places.map((place, index) => (
                                            <div 
                                                key={index} 
                                                className={cn(
                                                    "p-4 border rounded-lg flex items-center gap-4",
                                                    place.type === "High Risk" ? "bg-red-50 border-red-200" :
                                                    place.type === "Moderate Risk" ? "bg-yellow-50 border-yellow-200" :
                                                    "bg-green-50 border-green-200"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-3 h-3 rounded-full",
                                                    place.type === "High Risk" ? "bg-red-500" :
                                                    place.type === "Moderate Risk" ? "bg-yellow-500" :
                                                    "bg-green-500"
                                                )} />
                                                <div className="flex-1">
                                                    <h3 className={cn(
                                                        "font-semibold text-lg",
                                                        place.type === "High Risk" ? "text-red-700" :
                                                        place.type === "Moderate Risk" ? "text-yellow-700" :
                                                        "text-green-700"
                                                    )}>
                                                        {place.name}
                                                    </h3>
                                                    <p className={cn(
                                                        "text-sm font-medium",
                                                        place.type === "High Risk" ? "text-red-600" :
                                                        place.type === "Moderate Risk" ? "text-yellow-600" :
                                                        "text-green-600"
                                                    )}>
                                                        Type: {place.type}
                                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Location: {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                                    </p>
                                                </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                        </div>


                        {/* Crime Prediction Heatmap & Analysis */}
                        <div className="grid grid-cols-5 gap-10">
                            <Card className="col-span-3 main-container">
                                <CardHeader>
                                    <CardTitle className='text-3xl'>Crime Prediction Heatmap</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-4">
                                        {/* Suspect Alert */}
                                        <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
                                                <img 
                                                    src="path-to-suspect-image" 
                                                    alt="Suspect" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-red-700 font-medium">Suspect Detected</h3>
                                                    <span className="text-sm text-gray-500">2 mins ago</span>
                                                </div>
                                                <p className="text-sm text-gray-600">Camera #4 - 98% Match</p>
                                            </div>
                                        </div>

                                        {/* Map Component */}
                                        <MapComponent places={places} />
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="col-span-2 flex flex-col gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className='text-2xl'>Patrol Recommendations</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                            <h3 className="font-medium">Downtown District</h3>
                                            <p className="text-sm text-gray-600">High activity predicted between 22:00-02:00</p>
                                            <p className="text-sm text-red-600 font-medium mt-1">Recommended Units: 4</p>
                                        </div>
                                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                            <h3 className="font-medium">Central Station Area</h3>
                                            <p className="text-sm text-gray-600">Medium activity predicted between 18:00-23:00</p>
                                            <p className="text-sm text-yellow-600 font-medium mt-1">Recommended Units: 2</p>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                            <h3 className="font-medium">Residential Zone</h3>
                                            <p className="text-sm text-gray-600">Low activity predicted between 20:00-00:00</p>
                                            <p className="text-sm text-blue-600 font-medium mt-1">Recommended Units: 1</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className='text-2xl'>Crime Pattern Analysis</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg border">
                                            <h3 className="font-medium">Emerging Pattern Detected</h3>
                                            <p className="text-sm text-gray-600">Vehicle theft incidents increasing in north sector</p>
                                            <p className="text-sm text-blue-600 font-medium mt-1">Confidence: 92%</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg border">
                                            <h3 className="font-medium">Temporal Pattern</h3>
                                            <p className="text-sm text-gray-600">Peak crime hours shifting to early morning</p>
                                            <p className="text-sm text-blue-600 font-medium mt-1">Confidence: 85%</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;
