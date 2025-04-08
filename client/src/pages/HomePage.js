"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { FaPlus, FaSearch, FaFilter, FaDownload, FaTint, FaUserPlus, FaChartLine, FaCalendarAlt } from "react-icons/fa"
import API from "../services/API"
import Spinner from "../components/shared/Spinner"
import Layout from "../components/shared/Layout/Layout"
import Modal from "../components/shared/modal/Modal"

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth)
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalQuantity: 0,
    recentDonations: 0,
  })
  const navigate = useNavigate()

  // Get blood records function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/api/inventory/get-inventory")
      if (data?.success) {
        setData(data?.inventory)

        // Calculate stats
        const totalQuantity = data?.inventory.reduce((sum, record) => sum + record.quantity, 0)
        const recentDonations = data?.inventory.filter((record) =>
          moment(record.createdAt).isAfter(moment().subtract(7, "days")),
        ).length

        setStats({
          totalDonations: data?.inventory.length,
          totalQuantity,
          recentDonations,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBloodRecords()
  }, [])

  // Filter data based on search term
  const filteredData = data.filter(
    (record) =>
      record.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.inventoryType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Blood group distribution for stats
  const bloodGroups = {}
  data.forEach((record) => {
    if (bloodGroups[record.bloodGroup]) {
      bloodGroups[record.bloodGroup] += record.quantity
    } else {
      bloodGroups[record.bloodGroup] = record.quantity
    }
  })

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-6">
            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Blood Inventory Dashboard</h1>
              <p className="text-gray-600">Manage and monitor blood donations</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 mr-4">
                    <FaTint className="text-red-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Donations</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalDonations}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <FaChartLine className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Quantity</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalQuantity} ML</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <FaCalendarAlt className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Recent Donations</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.recentDonations}</p>
                    <p className="text-xs text-gray-500">Last 7 days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 mr-4">
                    <FaUserPlus className="text-purple-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Most Common</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {Object.entries(bloodGroups).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">Blood Group</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 flex items-center">
                  <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Search by blood group, email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <FaFilter />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    <FaDownload className="mr-2 -ml-1 h-5 w-5 text-gray-500" />
                    Export
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <FaPlus className="mr-2 -ml-1 h-5 w-5" />
                    Add Inventory
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Blood Group
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Inventory Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Donor Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Time & Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length > 0 ? (
                      filteredData.map((record) => (
                        <tr key={record._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 flex-shrink-0 mr-3">
                                <div
                                  className={`h-full w-full rounded-full flex items-center justify-center ${
                                    record.bloodGroup.includes("A")
                                      ? "bg-blue-100 text-blue-700"
                                      : record.bloodGroup.includes("B")
                                        ? "bg-green-100 text-green-700"
                                        : record.bloodGroup.includes("AB")
                                          ? "bg-purple-100 text-purple-700"
                                          : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  <FaTint className="h-4 w-4" />
                                </div>
                              </div>
                              <div className="font-medium text-gray-900">{record.bloodGroup}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                record.inventoryType === "in"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {record.inventoryType === "in" ? "Donation" : "Request"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{record.quantity} (ML)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">{record.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredData.length > 0 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">{filteredData.length}</span> of{" "}
                        <span className="font-medium">{data.length}</span> entries
                      </p>
                    </div>
                    <div>
                      <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                      >
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Previous</span>
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                        <a
                          href="#"
                          aria-current="page"
                          className="z-10 bg-red-50 border-red-500 text-red-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          1
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Next</span>
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Component */}
            <Modal />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default HomePage
