import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface Complaint {
    id: string;
    title: string;
    location: string;
    date: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    priority: 'High' | 'Medium' | 'Low';
    description: string;
    complainant: {
        name: string;
        contact: string;
        address: string;
    };
    details: {
        category: string;
        witnesses: string[];
        evidenceFiles: string[];
        updates: Array<{
            date: string;
            note: string;
        }>;
    };
}

const dummyComplaints: Complaint[] = [
    {
        id: "C001",
        title: "Suspicious Activity in Park",
        location: "Central Park, Delhi",
        date: "2024-03-10",
        status: "Open",
        priority: "High",
        description: "Multiple individuals gathering late night with suspicious behavior",
        complainant: {
            name: "Rahul Kumar",
            contact: "+91-9876543210",
            address: "123, ABC Colony, Delhi"
        },
        details: {
            category: "Suspicious Activity",
            witnesses: ["Local Security Guard", "Park Maintenance Staff"],
            evidenceFiles: ["CCTV_footage_001.mp4", "photo_evidence_001.jpg"],
            updates: [
                {
                    date: "2024-03-10 18:30",
                    note: "Complaint registered and assigned to local unit"
                },
                {
                    date: "2024-03-10 19:45",
                    note: "Initial investigation started"
                }
            ]
        }
    },
    {
        id: "C002",
        title: "Vehicle Theft Report",
        location: "Sector 18, Noida",
        date: "2024-03-09",
        status: "In Progress",
        priority: "High",
        description: "White Swift Dzire (UP16 AB 1234) stolen from shopping complex parking",
        complainant: {
            name: "Priya Singh",
            contact: "+91-9876543211",
            address: "456, XYZ Society, Noida"
        },
        details: {
            category: "Theft",
            witnesses: ["Parking Attendant", "Shopping Complex Security"],
            evidenceFiles: ["parking_footage.mp4", "vehicle_documents.pdf"],
            updates: [
                {
                    date: "2024-03-09 14:20",
                    note: "Complaint registered and vehicle details circulated"
                },
                {
                    date: "2024-03-09 16:30",
                    note: "CCTV footage collected from surrounding areas"
                },
                {
                    date: "2024-03-10 10:15",
                    note: "Vehicle spotted in Ghaziabad area, team dispatched"
                }
            ]
        }
    },
    {
        id: "C003",
        title: "Cybercrime Report",
        location: "Online Transaction",
        date: "2024-03-08",
        status: "In Progress",
        priority: "High",
        description: "Unauthorized bank transaction of ₹50,000 through online banking",
        complainant: {
            name: "Amit Sharma",
            contact: "+91-9876543213",
            address: "789, PQR Apartments, Mumbai"
        },
        details: {
            category: "Cybercrime",
            witnesses: ["Bank Statement", "Transaction Logs"],
            evidenceFiles: ["bank_statement.pdf", "transaction_details.pdf"],
            updates: [
                {
                    date: "2024-03-08 09:15",
                    note: "Complaint registered with Cybercrime cell"
                },
                {
                    date: "2024-03-09 11:30",
                    note: "Bank account details and transaction history collected"
                }
            ]
        }
    },
    {
        id: "C004",
        title: "Public Nuisance",
        location: "MG Road, Bangalore",
        date: "2024-03-07",
        status: "Resolved",
        priority: "Low",
        description: "Loud music from restaurant beyond permitted hours",
        complainant: {
            name: "Deepak Verma",
            contact: "+91-9876543214",
            address: "101, LMN Heights, Bangalore"
        },
        details: {
            category: "Noise Pollution",
            witnesses: ["Local Residents", "Security Guard"],
            evidenceFiles: ["noise_recording.mp3"],
            updates: [
                {
                    date: "2024-03-07 23:45",
                    note: "Complaint received and team dispatched"
                },
                {
                    date: "2024-03-08 00:30",
                    note: "Warning issued to establishment"
                },
                {
                    date: "2024-03-08 01:00",
                    note: "Issue resolved, music stopped"
                }
            ]
        }
    },
    {
        id: "C005",
        title: "Missing Person Report",
        location: "Connaught Place, Delhi",
        date: "2024-03-10",
        status: "Open",
        priority: "High",
        description: "15-year-old teenager missing since afternoon",
        complainant: {
            name: "Suresh Patel",
            contact: "+91-9876543215",
            address: "567, New Colony, Delhi"
        },
        details: {
            category: "Missing Person",
            witnesses: ["School Friends", "Shop Owner"],
            evidenceFiles: ["recent_photo.jpg", "cctv_last_seen.mp4"],
            updates: [
                {
                    date: "2024-03-10 18:00",
                    note: "Missing person report filed"
                },
                {
                    date: "2024-03-10 19:00",
                    note: "Search team deployed in last known location"
                }
            ]
        }
    }
];

const ComplaintList = () => {
    return (
        <ScrollArea className="h-[300px] pr-4">
            <div className="flex flex-col gap-3">
                {dummyComplaints.map((complaint) => (
                    <Dialog key={complaint.id}>
                        <DialogTrigger asChild>
                            <div className="p-4 bg-white border rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                <div className="flex items-start gap-4">
                                    {/* Left side - Date and Time */}
                                    <div className="flex flex-col items-start text-sm text-gray-500">
                                        <span>Tue, {complaint.date.split(' ')[0]}</span>
                                        <span>{complaint.details.updates[0].date.split(' ')[1]}</span>
                                    </div>

                                    {/* Right side - Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium text-gray-900">{complaint.title}</h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                        complaint.priority === 'High' ? 'bg-red-100 text-red-700' :
                                                        complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'
                                                    }`}>
                                                        {complaint.priority}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-500">{complaint.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    complaint.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                                                    complaint.status === 'In Progress' ? 'bg-purple-100 text-purple-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                    {complaint.status}
                                                </span>
                                                <svg 
                                                    className="w-4 h-4 text-gray-400" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M9 5l7 7-7 7" 
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[900px] min-h-[600px] p-8">
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-bold">{complaint.title}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-8 space-y-8">
                                <div>
                                    <h4 className="text-2xl font-semibold mb-3">Description</h4>
                                    <p className="text-lg">{complaint.description}</p>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-semibold mb-3">Complainant Details</h4>
                                    <div className="text-lg space-y-2">
                                        <p><span className="font-medium">Name:</span> {complaint.complainant.name}</p>
                                        <p><span className="font-medium">Contact:</span> {complaint.complainant.contact}</p>
                                        <p><span className="font-medium">Address:</span> {complaint.complainant.address}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-semibold mb-3">Case Updates</h4>
                                    <div className="space-y-4">
                                        {complaint.details.updates.map((update, index) => (
                                            <div key={index} className="border-l-4 border-blue-500 pl-6 py-3">
                                                <p className="text-lg font-medium text-gray-900">{update.date}</p>
                                                <p className="text-lg text-gray-600 mt-1">{update.note}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </ScrollArea>
    );
};

export default ComplaintList; 