import { useEffect, useState } from 'react';
import './App.css';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
// import { database } from './lib/firebase';
// import { Loader2 } from 'lucide-react';

function App() {
    //   const [localStream, setLocalStream] = useState(null);
    //   const [pc, setPc] = useState(null);
    //   const [isConnecting, setIsConnecting] = useState(false);

    const [placeNames, setPlaceNames] = useState<string[]>([]);

    const fetchPlaceNames = async () => {
        try {
            const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=28.684910,77.487930&radius=1500&type=restaurant&key=AIzaSyDLvAWB8-znjIPZd0dBqZF0ved_JxudUZY');
            const data = await response.json();
            const places = data.results.map((place: any) => place.name);
            setPlaceNames(places);
        } catch (error) {
            console.error('Error fetching place names:', error);
        }
    };

    useEffect(() => {
        fetchPlaceNames();
    }, []);

    useEffect(() => {
    const initMap = () => {
        const mapElement = document.getElementById("map");
        if (!mapElement) return;

        const map = new google.maps.Map(mapElement, {
        center: { lat: 28.684910, lng: 77.487930 },
        zoom: 12,
        });

        const locations = placeNames.map((place, index) => ({
            lat: data.results[index].geometry.location.lat,
            lng: data.results[index].geometry.location.lng,
            color: "red",
            size: 50,
            opacity: 0.5
        }));

        locations.forEach((location) => {
        new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map,
            icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: location.color,
            fillOpacity: 1,
            strokeWeight: 1,
            },
        });
        });

        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            map.setCenter(userLocation);
            new google.maps.Marker({
                position: userLocation,
                map,
                title: "You are here!",
                icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: "blue",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
                },
            });
            },
            () => {
            alert("Unable to retrieve your location.");
            }
        );
        } else {
        alert("Geolocation is not supported by your browser.");
        }
    };

    if (typeof window !== 'undefined') {
        (window as any).initMap = initMap;

        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDLvAWB8-znjIPZd0dBqZF0ved_JxudUZY&callback=initMap";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }
    }, [placeNames]);

    return (
    <div className="package-container max-container p-5 flex flex-col gap-10">
        <h1 className='text-4xl text-center mt-12 font-bold mb-12'>Live CCTV Feed</h1>
        <div className="flex flex-row gap-10">
        <Card className='main-container'>
            <CardHeader>
            <CardTitle className='text-3xl'>Current CCTV Feed</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-9'>
            <div>
                <img  src="https://placehold.co/4000x2000" alt="" />
            </div>
            {/* {isConnecting ? (
                <Button disabled>
                <Loader2 className="animate-spin" />
                Streaming
                </Button>
            ) : ( */}
            <Button id="start-button">
                Start Connection
            </Button>
                {/* )} */}
            </CardContent>
        </Card>

        <Card className="side-container">
            <CardHeader>
            <CardTitle className='text-3xl'>Detected Suspect Match</CardTitle>
            </CardHeader>
            <CardContent>
            <img src="https://www.shutterstock.com/shutterstock/videos/28256425/thumb/1.jpg" alt="suspect" />
            <h2 className='text-xl font-bold mt-6'>Matched Suspect Details</h2>
            <h3 className='text-md font-medium mt-4'>Name: John Mat Doe</h3>
            <h3 className='text-md font-medium'>Age: 25</h3>
            <h3 className='text-md font-medium'>Emotion: Sad</h3>
            </CardContent>
        </Card>
        </div>
        <div className='flex flex-row gap-10'>
            <Card className="main-container">
                <CardHeader>
                <CardTitle className='text-3xl'>Time Chart</CardTitle>
                </CardHeader>
                <CardContent>
                    <img src="https://placehold.co/500x600" alt="suspect" />
                </CardContent>
            </Card>
            <Card className='bottom-side-container'>
                <CardHeader>
                    <CardTitle className='w-full text-3xl'>Live Complaint Portal</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex gap-x-4'>
                    <img src="https://placehold.co/1500x600" alt="suspect" />
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="flex flex-row  gap-10">
            <Card className="main-container">
                <CardHeader>
                <CardTitle className='text-3xl'>Heatmaps</CardTitle>
                </CardHeader>
                <CardContent>
                <div id="map" className='h-96 w-[1000px]'></div>
                </CardContent>
            </Card>
            <Card className='bottom-side-container w-full'>
                <CardHeader>
                    <CardTitle className='text-3xl'>Place List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex gap-x-4'>
                        {placeNames.length > 0 ? (
                            <ul>
                                {placeNames.map((place, index) => (
                                    <li key={index}>{place}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No places available</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
    );
}

export default App;
