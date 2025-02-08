import { useEffect, useRef } from 'react';

interface Place {
    name: string;
    lat: number;
    lng: number;
    type: string;
}

interface MapComponentProps {
    places: Place[];
}

const MapComponent: React.FC<MapComponentProps> = ({ places }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);

    useEffect(() => {
        if (!mapRef.current || !window.google) return;

        try {
            // Initialize the map
            const mapOptions: google.maps.MapOptions = {
                zoom: 7,
                center: { lat: 28.6139, lng: 77.2090 },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                styles: [
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{ color: "#a2daf2" }]
                    },
                    {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{ color: "#e8e8e8" }]
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#ffd05c" }]
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#ffffff" }]
                    },
                    {
                        featureType: "poi.park",
                        elementType: "geometry",
                        stylers: [{ color: "#c0e8b0" }]
                    },
                    {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{ color: "#e5e5e5" }]
                    },
                    {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{ color: "#f2f2f2" }]
                    },
                    {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{ color: "#7f8fa6" }]
                    }
                ]
            };

            mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);

            // Add markers
            places.forEach((place) => {
                const marker = new google.maps.Marker({
                    position: { lat: place.lat, lng: place.lng },
                    map: mapInstanceRef.current,
                    title: place.name,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: place.type === 'High Risk' ? '#dc2626' : place.type === 'Moderate Risk' ? '#eab308' : '#22c55e',
                        fillOpacity: 0.9,
                        strokeWeight: 2,
                        strokeColor: '#ffffff',
                        scale: 10
                    }
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<div class="p-2"><h3 class="font-bold">${place.name}</h3><p>${place.type}</p></div>`
                });

                marker.addListener('click', () => infoWindow.open(mapInstanceRef.current, marker));
                markersRef.current.push(marker);
            });
        } catch (error) {
            console.error('Error initializing map:', error);
        }

        return () => {
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];
        };
    }, [places]);

    return (
        <div 
            ref={mapRef} 
            className="w-[800px] h-[500px] rounded-lg overflow-hidden"
        />
    );
};

export default MapComponent; 