const Footer = () => {
    return (
        <footer className="bg-white border-t mt-10">
            <div className="max-w-[2000px] mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            CCTV Analytics
                        </h3>
                        <p className="text-sm text-gray-600">
                            Advanced surveillance and crime prevention system powered by AI technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Dashboard</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Surveillance</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Reports</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Analytics</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Help Center</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Documentation</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">API Status</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-600">Email: support@cctvanalytics.com</li>
                            <li className="text-sm text-gray-600">Phone: +1 (555) 123-4567</li>
                            <li className="text-sm text-gray-600">Emergency: 911</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-600">
                        © 2024 CCTV Analytics. All rights reserved.
                    </p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-blue-600">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 