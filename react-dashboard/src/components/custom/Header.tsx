import { Bell, Menu } from "lucide-react"
import { useState } from "react"

const Header = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <header className="bg-white/80 backdrop-blur-md border-b z-50">
            <div className="max-w-[2000px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-6">
                    <button aria-label="Menu" className="lg:hidden">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        CCTV Analytics
                    </h2>
                </div>

                {/* Right side - Only notifications */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button 
                            aria-label="Notifications"
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Notification dropdown */}
                        {isNotificationOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border py-2">
                                <div className="px-4 py-2 border-b">
                                    <h3 className="font-semibold">Notifications</h3>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                            <p className="text-sm font-medium">New alert detected</p>
                                            <p className="text-xs text-gray-500">High risk zone activity detected in Delhi</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header 