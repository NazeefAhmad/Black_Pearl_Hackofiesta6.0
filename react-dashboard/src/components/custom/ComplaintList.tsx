import { Button } from "../ui/button";

interface Complaint {
    id: string;
    type: string;
    location: string;
    status: 'In Progress' | 'Resolved';
    severity: 'High' | 'Medium' | 'Low';
    date: string;
}

const complaints: Complaint[] = [
    {
        id: "#4721",
        type: "Theft",
        location: "North Zone",
        status: "In Progress",
        severity: "High",
        date: "2023-08-15"
    },
    {
        id: "#4720",
        type: "Assault",
        location: "South Zone",
        status: "Resolved",
        severity: "Medium",
        date: "2023-08-14"
    },
    // Add more complaints as needed
];

const ComplaintList = () => {
    return (
        <div className="w-full">
            <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-gray-50 p-4 text-sm font-medium text-gray-500">
                    <div>ID</div>
                    <div>TYPE</div>
                    <div>LOCATION</div>
                    <div>STATUS</div>
                    <div>SEVERITY</div>
                    <div>DATE</div>
                    <div>ACTIONS</div>
                </div>
                
                {complaints.map((complaint) => (
                    <div 
                        key={complaint.id}
                        className="grid grid-cols-7 border-t p-4 text-sm items-center"
                    >
                        <div className="font-medium">{complaint.id}</div>
                        <div>{complaint.type}</div>
                        <div>{complaint.location}</div>
                        <div>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                                ${complaint.status === 'In Progress' 
                                    ? 'bg-yellow-50 text-yellow-800' 
                                    : 'bg-green-50 text-green-800'}`}
                            >
                                {complaint.status}
                            </span>
                        </div>
                        <div>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                                ${complaint.severity === 'High' 
                                    ? 'bg-red-50 text-red-800' 
                                    : complaint.severity === 'Medium'
                                    ? 'bg-yellow-50 text-yellow-800'
                                    : 'bg-blue-50 text-blue-800'}`}
                            >
                                {complaint.severity}
                            </span>
                        </div>
                        <div>{complaint.date}</div>
                        <div>
                            <Button 
                                variant="link" 
                                className="text-blue-600 hover:text-blue-800 p-0"
                            >
                                View
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="text-sm text-gray-500">
                    Showing 1 to 2 of 156 entries
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-blue-600 text-white">
                        1
                    </Button>
                    <Button variant="outline" size="sm">
                        2
                    </Button>
                    <Button variant="outline" size="sm">
                        3
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ComplaintList; 