import { Link, useLocation } from "react-router-dom"
import {
  FaTint,
  FaHome,
  FaUserFriends,
  FaCalendarAlt,
  FaChartBar,
  FaClipboardList,
  FaCog,
} from "react-icons/fa"

const Sidebar = ({ children }) => {
  const location = useLocation()

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      path: "/donors",
      name: "Donors",
      icon: <FaUserFriends className="w-5 h-5" />,
    },
    {
      path: "/donations",
      name: "Donations",
      icon: <FaTint className="w-5 h-5" />,
    },
    {
      path: "/requests",
      name: "Requests",
      icon: <FaClipboardList className="w-5 h-5" />,
    },
    {
      path: "/schedule",
      name: "Schedule",
      icon: <FaCalendarAlt className="w-5 h-5" />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <FaChartBar className="w-5 h-5" />,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <FaCog className="w-5 h-5" />,
    },
  ]

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-white border-r border-gray-200 w-64 min-h-screen shadow-sm">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <FaTint className="h-8 w-8 text-red-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-800">BloodLink</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">Blood Donation Management</p>
        </div>

        {/* Menu Items */}
        <div className="py-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm ${
                    location.pathname === item.path
                      ? "bg-red-50 text-red-600 border-r-4 border-red-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        
      </div>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default Sidebar
