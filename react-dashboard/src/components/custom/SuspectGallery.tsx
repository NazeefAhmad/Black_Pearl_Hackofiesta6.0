import { Dialog, DialogContent } from "../ui/dialog";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const suspectImages = [
    {
        url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080",
        caption: "Front View - Recent",
        details: {
            name: "John Mat Doe",
            age: "25 years",
            status: "High Risk",
            emotion: "Anxious",
            lastSeen: "2 minutes ago",
            location: "Camera #4, North Entrance",
            match: "98% Confidence",
            notes: "Subject appears agitated, heading towards exit"
        }
    },
    {
        url: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=2080",
        caption: "Side Profile",
        details: {
            name: "John De Doe",
            age: "25 years",
            status: "High Risk",
            emotion: "Neutral",
            lastSeen: "10 minutes ago",
            location: "Camera #2, Main Hall",
            match: "95% Confidence",
            notes: "Subject observed scanning the area"
        }
    },
    {
        url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2080",
        caption: "Alternate Angle",
        details: {
            name: "John toh Doe",
            age: "25 years",
            status: "High Risk",
            emotion: "Suspicious",
            lastSeen: "15 minutes ago",
            location: "Camera #1, Entrance",
            match: "92% Confidence",
            notes: "Initial detection of subject"
        }
    },
    {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2080",
        caption: "Previous Record",
        details: {
            name: "John hug Doe",
            age: "25 years",
            status: "High Risk",
            emotion: "Neutral",
            lastSeen: "3 months ago",
            location: "Police Database",
            match: "100% Confidence",
            notes: "File photo from previous case"
        }
    }
];

const SuspectGallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % suspectImages.length);
    };

    const previousImage = () => {
        setCurrentImage((prev) => (prev - 1 + suspectImages.length) % suspectImages.length);
    };

    return (
        <div className="space-y-6 w-full">
            <div 
                onClick={() => setIsOpen(true)} 
                className="cursor-pointer hover:opacity-90 transition-opacity flex justify-center items-center w-full"
            >
                <img 
                    src={suspectImages[0].url} 
                    alt="suspect" 
                    className=" h-[300px] object-cover rounded-lg"
                />
            </div>

            <div className="bg-accent/40 rounded-lg space-y-4 w-full">
                <h2 className='text-xl font-bold'>Matched Suspect Details</h2>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold min-w-[100px]">Name:</span>
                        <span className="text-muted-foreground">John Mat Doe</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold min-w-[100px]">Age:</span>
                        <span className="text-muted-foreground">25 years</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold min-w-[100px]">Status:</span>
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">
                            High Risk
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold min-w-[100px]">Emotion:</span>
                        <span className="text-muted-foreground">Anxious</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold min-w-[100px]">Last Seen:</span>
                        <span className="text-muted-foreground">2 minutes ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold min-w-[100px]">Location:</span>
                        <span className="text-muted-foreground">Camera #4, North Entrance</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold min-w-[100px]">Match:</span>
                        <span className="text-muted-foreground">98% Confidence</span>
                    </div>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl">
                    <div className="flex flex-col gap-6">
                        <div className="relative">
                            <img 
                                src={suspectImages[currentImage].url} 
                                alt={`suspect-${currentImage}`}
                                className="w-full h-[500px] object-cover rounded-lg"
                            />
                            <button 
                                onClick={previousImage}
                                aria-label="Previous image"
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                                <ChevronLeft className="h-6 w-6 text-white" />
                            </button>
                            <button 
                                onClick={nextImage}
                                aria-label="Next image"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                                <ChevronRight className="h-6 w-6 text-white" />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white">
                                {suspectImages[currentImage].caption}
                            </div>
                        </div>

                        <div className="bg-accent/40 p-6 rounded-lg space-y-4">
                            <h2 className="text-2xl font-bold">Detection Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[100px]">Name:</span>
                                        <span className="text-muted-foreground">{suspectImages[currentImage].details.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[100px]">Age:</span>
                                        <span className="text-muted-foreground">{suspectImages[currentImage].details.age}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[100px]">Status:</span>
                                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">
                                            {suspectImages[currentImage].details.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[100px]">Emotion:</span>
                                        <span className="text-muted-foreground">{suspectImages[currentImage].details.emotion}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[100px]">Last Seen:</span>
                                        <span className="text-muted-foreground">{suspectImages[currentImage].details.lastSeen}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[100px]">Location:</span>
                                        <span className="text-muted-foreground">{suspectImages[currentImage].details.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[100px]">Match:</span>
                                        <span className="text-muted-foreground">{suspectImages[currentImage].details.match}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold min-w-[100px]">Notes:</span>
                                        <span className="text-muted-foreground">{suspectImages[currentImage].details.notes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SuspectGallery; 